'use client';
import './globals.css';
import { AuthProvider } from '@/hooks/use-auth';

export const metadata = {
  title: 'FMEA Dashboard',
  description: 'Failure Mode and Effects Analysis Dashboard',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}