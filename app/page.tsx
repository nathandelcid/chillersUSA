"use client";

import React, { useState, useEffect } from 'react';
import { Coffee, Clock, MapPin, Instagram, Facebook, Twitter } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  const [text, setText] = useState<string[]>(Array(8).fill(''));
  const fullText = 'Chillers'.split('');
  
  useEffect(() => {
    const timeouts = fullText.map((_, index) => {
      return setTimeout(() => {
        setText(prev => {
          const newText = [...prev];
          newText[index] = fullText[index];
          return newText;
        });
      }, index * 150);
    });
    
    return () => timeouts.forEach(timeout => clearTimeout(timeout));
  }, []);

  return (
    <div className="min-h-screen bg-arctic-50 relative">
      {/* Slim Header */}
      <header className="bg-[#fdf3ba] py-4 shadow-lg fixed top-0 left-0 w-full z-50">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link href="/" className="flex flex-col items-center text-[#2E8B57] hover:text-[#2E8B57] transition-colors">
            <span className="text-xl md:text-2xl font-cursive">Chillers</span>
          </Link>
          <Link 
            href="/order"
            style={{
              boxShadow: '3px 6px 0 #000000',
              transform: 'translate(-1.5px, -3px)',
            }}
            className="bg-[#2E8B57] text-[#fdf3ba] px-4 md:px-6 py-2 rounded-full transition-all duration-100 font-bold text-sm md:text-base relative hover:translate-x-[-1px] hover:translate-y-[-1.5px] hover:shadow-[2px_4px_0_#000000] active:translate-x-[0px] active:translate-y-[0px] active:shadow-[0_0px_0_#000000] hover:bg-white hover:text-black"
          >
            ORDER NOW
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <div className="min-h-screen relative">
        <div className="h-[40vh] md:h-[60vh] relative overflow-hidden">
          <video
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src="/home/Chillers.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Main Content */}
        <main>
          {/* Features Section */}
          <div className="py-16 md:py-24 bg-gradient-to-b from-[#fdf3ba] to-white relative overflow-hidden">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                <div className="feature-card group border-2 border-[#2E8B57]">
                  <div className="relative z-10">
                    <Coffee className="w-10 h-10 md:w-12 md:h-12 mb-4 text-[#2E8B57] transition-transform duration-300 group-hover:scale-110" />
                    <h3 className="text-lg md:text-xl font-semibold mb-2 text-[#2E8B57]">Simple drinks, serious chill</h3>
                    <p className="text-sm md:text-base text-[#2E8B57]">Expertly crafted beverages using locally roasted beans</p>
                  </div>
                </div>
                <div className="feature-card group border-2 border-[#2E8B57]">
                  <div className="relative z-10">
                    <Clock className="w-10 h-10 md:w-12 md:h-12 mb-4 text-[#2E8B57] transition-transform duration-300 group-hover:scale-110" />
                    <h3 className="text-lg md:text-xl font-semibold mb-2 text-[#2E8B57]">Here today, here tomorrow</h3>
                    <p className="text-sm md:text-base text-[#2E8B57]">Open 7AM - 10PM<br />Monday through Sunday</p>
                  </div>
                </div>
                <div className="feature-card group border-2 border-[#2E8B57]">
                  <div className="relative z-10">
                    <MapPin className="w-10 h-10 md:w-12 md:h-12 mb-4 text-[#2E8B57] transition-transform duration-300 group-hover:scale-110" />
                    <h3 className="text-lg md:text-xl font-semibold mb-2 text-[#2E8B57]">Find us where the chill hits</h3>
                    <p className="text-sm md:text-base text-[#2E8B57]">123 Chillers Street<br />Naples, FL 34104</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Menu Preview */}
          <div className="py-16 md:py-20 bg-gradient-to-b from-white to-[#2E8B57] relative overflow-hidden">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12 font-cursive text-[#2E8B57]">Our Specialties</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                <div className="specialty-card group border-2 border-[#2E8B57]">
                  <div className="overflow-hidden">
                    <div className="relative w-full h-48">
                      <Image 
                        src="/home/corn-green-bg.jpg"
                        alt="Coffee" 
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                  </div>
                  <div className="specialty-content bg-white p-4 rounded-b-lg">
                    <h3 className="text-lg md:text-xl font-semibold mb-2 text-[#2E8B57] group-hover:text-[#2E8B57] transition-colors duration-300">
                    Street Corn In A Cup
                    </h3>
                    <p className="text-sm md:text-base text-[#2E8B57]">Fresh corn kernels topped with mayo, cotija cheese, lime, and spices. A delicious Mexican street food favorite served in a convenient cup.</p>
                  </div>
                </div>
                <div className="specialty-card group border-2 border-[#2E8B57]">
                  <div className="overflow-hidden">
                    <div className="relative w-full h-48">
                      <Image 
                        src="/home/mangonada.jpg"
                        alt="Smoothies" 
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                  </div>
                  <div className="specialty-content bg-white p-4 rounded-b-lg">
                    <h3 className="text-lg md:text-xl font-semibold mb-2 text-[#2E8B57] group-hover:text-[#2E8B57] transition-colors duration-300">
                    Chamoyadas
                    </h3>
                    <p className="text-sm md:text-base text-[#2E8B57]">Mexican-style frozen mango treat topped with chamoy, tajín, and tamarind candy for the perfect sweet, spicy, and tangy blend</p>
                  </div>
                </div>
                <div className="specialty-card group border-2 border-[#2E8B57]">
                  <div className="overflow-hidden">
                    <div className="relative w-full h-48">
                      <Image 
                        src="/home/cookie-monster.jpg"
                        alt="Food" 
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                  </div>
                  <div className="specialty-content bg-white p-4 rounded-b-lg">
                    <h3 className="text-lg md:text-xl font-semibold mb-2 text-[#2E8B57] group-hover:text-[#2E8B57] transition-colors duration-300">
                      Frappes
                    </h3>
                    <p className="text-sm md:text-base text-[#2E8B57]">Perfectly blended ice-cold coffee drinks customized with your choice of flavors, topped with fresh whipped cream and premium drizzles</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-[#fdf3ba] text-black py-8 md:py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <h4 className="text-xl md:text-2xl font-semibold mb-4 font-cursive text-[#2E8B57]">Chillers</h4>
              </div>
              <div>
                <h4 className="text-lg md:text-xl font-semibold mb-4 text-black">Hours</h4>
                <p className="text-black">Monday - Sunday<br />7AM - 10PM</p>
              </div>
              <div>
                <h4 className="text-lg md:text-xl font-semibold mb-4 text-black">Contact</h4>
                <p className="text-black">
                  123 Chillers Street<br />
                  Naples, FL 34104<br />
                  (555) 123-4567
                </p>
              </div>
              <div>
                <h4 className="text-lg md:text-xl font-semibold mb-4 text-black">Follow Us</h4>
                <div className="flex space-x-4">
                  <Instagram className="w-6 h-6 text-black hover:text-black cursor-pointer transition-colors" />
                  <Facebook className="w-6 h-6 text-black hover:text-black cursor-pointer transition-colors" />
                  <Twitter className="w-6 h-6 text-black hover:text-black cursor-pointer transition-colors" />
                </div>
              </div>
            </div>
            <div className="text-center mt-8 pt-8 border-t border-black">
              <p className="text-black">&copy; 2024 Chillers. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}