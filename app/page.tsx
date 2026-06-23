import { LogoSection } from '@/components/LogoSection';
import { LoginPanel } from '@/components/LoginPanel';
import { ErrorMessage } from '@/components/ErrorMessage';
import { FooterSection } from '@/components/FooterSection';

export default function LoginPage() {
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
      <LoginPanel />
      <ErrorMessage />
      <FooterSection />
    </div>
  );
}
