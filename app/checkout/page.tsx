"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { MapPin } from "lucide-react";
import { useCart } from "@/context/CartContext";
import {
  PaymentForm,
  CreditCard,
  ApplePay,
  GooglePay,
} from "react-square-web-payments-sdk";

import { submitPayment } from "../actions/actions";

const LOCATIONS = {
  FL: {
    name: "Naples Chillers",
    address: "123 Gulf Shore Boulevard",
    city: "Naples",
    state: "FL",
    zip: "34102",
    hours: "7AM - 10PM",
    phone: "(239) 555-0123",
  },
  TX: {
    name: "Austin Chillers",
    address: "456 South Congress Avenue",
    city: "Austin",
    state: "TX",
    zip: "78704",
    hours: "7AM - 10PM",
    phone: "(512) 555-0123",
  },
};

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  pickupLocation: keyof typeof LOCATIONS | "";
  pickupTime: string;
};

const initialFormData: FormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  pickupLocation: "",
  pickupTime: "",
};

const generateTimeSlots = () => {
  const times = ["ASAP"];
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();

  let startHour = currentHour;
  let startMinute = currentMinute >= 30 ? 0 : 30;
  if (currentMinute >= 30) startHour++;

  for (let h = startHour; h < 22; h++) {
    for (let m of [0, 30]) {
      if (h === startHour && m < startMinute) continue;
      const hour = h % 12 || 12;
      const period = h < 12 ? "AM" : "PM";
      const timeString = `${hour}:${m.toString().padStart(2, "0")} ${period}`;
      times.push(timeString);
    }
  }

  return times;
};

function Checkout() {
  const { state, dispatch } = useCart();
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const timeSlots = generateTimeSlots();

  const isFormValid = () => {
    return (
      formData.firstName.trim() !== "" &&
      formData.lastName.trim() !== "" &&
      formData.email.trim() !== "" &&
      formData.phone.trim() !== "" &&
      formData.pickupLocation !== "" &&
      formData.pickupTime !== ""
    );
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    dispatch({ type: "CLEAR_CART" });
    setIsSuccess(true);
    setIsSubmitting(false);
  };

  const handlePaymentSuccess = async (token: any) => {
    try {
      // Call your backend API to process the payment
      const response = await fetch("/api/pay", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          sourceId: token.token,
          amount: state.total * 100, // Convert to cents
        }),
      });

      if (!response.ok) {
        throw new Error("Payment failed");
      }

      // If payment successful, clear cart and show success
      dispatch({ type: "CLEAR_CART" });
      setIsSuccess(true);
    } catch (error) {
      console.error("Payment error:", error);
      // Handle payment error (show error message to user)
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-[#2E8B57] flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
          <h2 className="text-2xl font-bold text-black mb-4">
            Order Confirmed!
          </h2>
          <p className="text-black mb-2">
            Thank you for your order. We'll have it ready for pickup at:
          </p>
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <p className="font-semibold">
              {
                LOCATIONS[formData.pickupLocation as keyof typeof LOCATIONS]
                  .name
              }
            </p>
            <p>
              {
                LOCATIONS[formData.pickupLocation as keyof typeof LOCATIONS]
                  .address
              }
            </p>
            <p>
              {
                LOCATIONS[formData.pickupLocation as keyof typeof LOCATIONS]
                  .city
              }
              ,{" "}
              {
                LOCATIONS[formData.pickupLocation as keyof typeof LOCATIONS]
                  .state
              }{" "}
              {LOCATIONS[formData.pickupLocation as keyof typeof LOCATIONS].zip}
            </p>
            <p className="mt-2">Pickup time: {formData.pickupTime}</p>
          </div>
          <Link
            href="/"
            className="inline-block bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-black/80 transition-colors"
          >
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#2E8B57]">
      <header className="bg-[#fdf3ba] py-4">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <Link
            href="/"
            className="text-[#2E8B57] hover:text-[#2E8B57] transition-colors"
          >
            <span className="text-2xl font-cursive">Chillers</span>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-cursive text-[#fdf3ba] mb-8 text-center">
            Checkout
          </h1>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              <div className="space-y-4">
                {state.items.map((item) => (
                  <div key={item.id} className="flex items-center gap-4">
                    <div className="relative w-16 h-16 overflow-hidden rounded">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-gray-600">
                        {item.quantity} x ${item.price.toFixed(2)}
                      </p>
                    </div>
                    <p className="font-semibold">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
                <div className="border-t pt-4 mt-4">
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span>${state.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Pickup Information</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      required
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-arctic-500 focus:ring focus:ring-arctic-200 focus:ring-opacity-50 p-2 border"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      required
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-arctic-500 focus:ring focus:ring-arctic-200 focus:ring-opacity-50 p-2 border"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-arctic-500 focus:ring focus:ring-arctic-200 focus:ring-opacity-50 p-2 border"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-arctic-500 focus:ring focus:ring-arctic-200 focus:ring-opacity-50 p-2 border"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Pickup Location
                  </label>
                  <select
                    name="pickupLocation"
                    required
                    value={formData.pickupLocation}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-arctic-500 focus:ring focus:ring-arctic-200 focus:ring-opacity-50 p-2 border"
                  >
                    <option value="">Select a location</option>
                    {Object.entries(LOCATIONS).map(([key, location]) => (
                      <option key={key} value={key}>
                        {location.name} - {location.address}, {location.city}
                      </option>
                    ))}
                  </select>
                </div>

                {formData.pickupLocation && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-5 h-5 mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-semibold">
                          {
                            LOCATIONS[
                              formData.pickupLocation as keyof typeof LOCATIONS
                            ].name
                          }
                        </p>
                        <p>
                          {
                            LOCATIONS[
                              formData.pickupLocation as keyof typeof LOCATIONS
                            ].address
                          }
                        </p>
                        <p>
                          {
                            LOCATIONS[
                              formData.pickupLocation as keyof typeof LOCATIONS
                            ].city
                          }
                          ,{" "}
                          {
                            LOCATIONS[
                              formData.pickupLocation as keyof typeof LOCATIONS
                            ].state
                          }{" "}
                          {
                            LOCATIONS[
                              formData.pickupLocation as keyof typeof LOCATIONS
                            ].zip
                          }
                        </p>
                        <p className="mt-1">
                          Hours:{" "}
                          {
                            LOCATIONS[
                              formData.pickupLocation as keyof typeof LOCATIONS
                            ].hours
                          }
                        </p>
                        <p>
                          Phone:{" "}
                          {
                            LOCATIONS[
                              formData.pickupLocation as keyof typeof LOCATIONS
                            ].phone
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Pickup Time
                  </label>
                  <select
                    name="pickupTime"
                    required
                    value={formData.pickupTime}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-arctic-500 focus:ring focus:ring-arctic-200 focus:ring-opacity-50 p-2 border"
                  >
                    <option value="">Select a pickup time</option>
                    {timeSlots.map((time) => (
                      <option key={time} value={time}>
                        {time === "ASAP"
                          ? "As soon as possible"
                          : `Today at ${time}`}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-4">
                    Payment Information
                  </h3>
                  {!isFormValid() ? (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <p className="text-yellow-700">
                        Please fill out all required information above to
                        proceed with payment.
                      </p>
                    </div>
                  ) : (
                    <PaymentForm
                      applicationId="sandbox-sq0idb-9L3G8zobRKK9hVfvW-wXwA"
                      locationId="main"
                      cardTokenizeResponseReceived={async (token) => {
                        const result = await submitPayment(
                          token.token,
                          state.total
                        );
                        console.log(result);
                      }}
                      createPaymentRequest={() => ({
                        countryCode: "US",
                        currencyCode: "USD",
                        total: {
                          amount: state.total.toString(),
                          label: "Total",
                        },
                      })}
                    >
                      <div className="space-y-4">
                        <ApplePay />
                        <GooglePay />
                        <CreditCard
                          buttonProps={{
                            css: {
                              backgroundColor: "#2E8B57",
                              fontSize: "16px",
                              color: "#fff",
                              "&:hover": {
                                backgroundColor: "#2E8B57",
                              },
                            },
                          }}
                        />
                      </div>
                    </PaymentForm>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
