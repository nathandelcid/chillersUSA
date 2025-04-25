"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Coffee, IceCream2, Coffee as HotDrink, UtensilsCrossed, Waves, ShoppingCart } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { CartDrawer } from '@/components/CartDrawer';
import { menuSections } from '@/lib/data';

function Order() {
  const [activeSection, setActiveSection] = useState('frescas');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { state, dispatch } = useCart();

  const addToCart = (item: any) => {
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: 1,
        image: item.image,
      },
    });
    setIsCartOpen(true);
  };

  return (
    <div className="min-h-screen bg-arctic-50 relative">
      {/* Header */}
      <header className="bg-[#fdf3ba] py-4 shadow-lg">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link href="/" className="text-[#2E8B57] hover:text-[#2E8B57] transition-colors">
            <span className="text-xl md:text-2xl font-cursive">Chillers</span>
          </Link>
          <div className="flex items-center space-x-4">
            <Link href="/" className="text-[#2E8B57] hover:text-[#2E8B57] transition-colors text-sm md:text-base">
              Home
            </Link>
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative text-[#2E8B57] hover:text-[#2E8B57] transition-colors"
            >
              <ShoppingCart className="w-6 h-6" />
              {state.items.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {state.items.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Menu Navigation */}
      <div className="sticky top-0 bg-[#2E8B57] shadow-md z-20">
        <div className="container mx-auto">
          <nav className="flex overflow-x-auto py-2 px-4 md:px-0 md:py-0 scrollbar-hide">
            {menuSections.map(({ id, name, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveSection(id)}
                className={`flex-none md:flex-1 py-3 md:py-4 px-4 md:px-6 flex flex-col items-center space-y-1 md:space-y-2 transition-colors whitespace-nowrap ${
                  activeSection === id
                    ? 'text-white border-b-2 border-white'
                    : 'text-white hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5 md:w-6 md:h-6" />
                <span className="text-sm md:text-base">{name}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Menu Content */}
      <div className="bg-[#fdf3ba]">
        <div className="container mx-auto px-4 py-6 md:py-8">
          <div className="grid gap-6 md:gap-8">
            {menuSections.map(section => (
              <div
                key={section.id}
                className={activeSection === section.id ? 'block' : 'hidden'}
              >
                <h2 className="text-2xl md:text-3xl font-cursive text-[#2E8B57] mb-4 md:mb-6">{section.name}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                  {section.items.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden flex flex-col"
                    >
                      <div className="h-40 md:h-48 overflow-hidden relative">
                        <Image 
                          src={item.image} 
                          alt={item.name}
                          fill
                          className="object-cover transition-transform duration-300 hover:scale-105"
                        />
                      </div>
                      <div className="p-4 md:p-6 flex-1 flex flex-col">
                        <h3 className="text-lg md:text-xl font-semibold text-black mb-2">{item.name}</h3>
                        <p className="text-sm md:text-base text-black mb-4 flex-1">{item.description}</p>
                        <div className="flex justify-between items-center mt-auto">
                          <span className="text-base md:text-lg font-bold text-black">${item.price.toFixed(2)}</span>
                          <button
                            onClick={() => addToCart(item)}
                            className="text-black px-4 md:px-6 py-2 rounded-full border-2 border-black hover:bg-black hover:text-white transition-colors font-semibold text-xs md:text-sm uppercase tracking-wide"
                          >
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Cart Drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      {/* Footer */}
      <footer className="bg-[#fdf3ba] py-4 md:py-6 mt-auto">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm md:text-base text-black">&copy; 2024 Chillers. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default Order;