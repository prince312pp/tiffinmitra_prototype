import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import { CartProvider } from '@/context/CartContext';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CartDrawer } from '@/components/layout/CartDrawer';
import { SingleCookModal } from '@/components/ui/SingleCookModal';
import { QuickDemoSwitcher } from '@/components/shared/QuickDemoSwitcher';

export const metadata: Metadata = {
  title: 'TiffinMitra — Homemade Food. Heartfelt Care.',
  description:
    'Hyperlocal homemade food marketplace connecting students and working professionals with local home cooks serving fresh, comforting everyday meals.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-brand-cream text-brand-charcoal antialiased flex flex-col min-h-screen">
        <AuthProvider>
          <CartProvider>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
            <CartDrawer />
            <SingleCookModal />
            <QuickDemoSwitcher />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
