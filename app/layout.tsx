import './globals.css';
import type { Metadata } from 'next';
import { Inter, Pacifico } from 'next/font/google';
import { CartProvider } from '@/context/CartContext';

const inter = Inter({ subsets: ['latin'] });
const pacifico = Pacifico({ 
  weight: '400',
  subsets: ['latin'],
  variable: '--font-pacifico'
});

export const metadata: Metadata = {
  title: 'Chillers',
  description: 'Expertly crafted beverages in Naples, FL',
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${pacifico.variable}`}>
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}