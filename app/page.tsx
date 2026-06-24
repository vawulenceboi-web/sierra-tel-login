'use client';

import { useState } from 'react';
import { LogoSection } from '@/components/LogoSection';
import { LoginPanel } from '@/components/LoginPanel';
import { ErrorMessage } from '@/components/ErrorMessage';
import { FooterSection } from '@/components/FooterSection';



export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [showError, setShowError] = useState(false);

  const handleLoginError = (errorMessage: string) => {
    setError(errorMessage);
    setShowError(true);
  };

  const handleLoginSuccess = () => {
    setShowError(false);
    setError(null);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F5F5F5',
        fontFamily: 'Arial, Helvetica, sans-serif',
        WebkitFontSmoothing: 'antialiased',
      }}
    >
      <LogoSection />
      <LoginPanel 
        onLoginError={handleLoginError}
        onLoginSuccess={handleLoginSuccess}
      />
      <ErrorMessage 
        show={showError} 
        message={error || undefined}
      />
      <FooterSection />
    </div>
  );
}
