"use client";

import { Fragment } from 'react';
import { XCircle, Trash2, Plus, Minus } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';
import Image from 'next/image';

type CartDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const CartDrawer = ({ isOpen, onClose }: CartDrawerProps) => {
  const { state, dispatch } = useCart();

  const removeItem = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { id } });
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  if (!isOpen) {
    return null;
  }

  return (
    <Fragment>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 max-w-xs w-full bg-white shadow-xl z-50 flex flex-col transition-transform transform">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Your Cart</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 transition-colors"
          >
            <XCircle className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {state.items.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">Your cart is empty</p>
              <button
                onClick={onClose}
                className="bg-[#2E8B57] text-white px-4 py-2 rounded-full hover:bg-[#2E8B57]/80 transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {state.items.map((item) => (
                <div key={item.id} className="flex gap-3 border-b pb-4">
                  <div className="relative w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                    <Image 
                      src={item.image} 
                      alt={item.name} 
                      fill
                      className="object-cover" 
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-800">{item.name}</h3>
                    <p className="text-[#2E8B57] font-semibold">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                    <div className="flex items-center mt-2 justify-between">
                      <div className="flex items-center border rounded">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="px-2 py-1 hover:bg-gray-100"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2">{item.quantity}</span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="px-2 py-1 hover:bg-gray-100"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {state.items.length > 0 && (
          <div className="p-4 border-t">
            <div className="flex justify-between mb-4">
              <span className="font-semibold">Total:</span>
              <span className="font-semibold">${state.total.toFixed(2)}</span>
            </div>
            <Link
              href="/checkout"
              className="block bg-[#2E8B57] text-white text-center py-3 rounded-full hover:bg-[#2E8B57]/80 transition-colors w-full font-semibold"
            >
              Checkout
            </Link>
          </div>
        )}
      </div>
    </Fragment>
  );
};