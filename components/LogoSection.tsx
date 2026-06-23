export function LogoSection() {
  return (
    <div
      style={{
        marginTop: '40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '16px',
      }}
    >
      {/* Logo Image */}
      <img
        src="/sierra-tel-logo.png"
        alt="Sierra Tel Logo"
        style={{
          height: '50px',
          width: 'auto',
          flexShrink: 0,
        }}
      />

      {/* Company Name with underline */}
      <div>
        <h1
          style={{
            fontFamily: '"Times New Roman", serif',
            fontSize: '28px',
            fontWeight: 'normal',
            color: '#111111',
            letterSpacing: '0',
            margin: '0 0 4px 0',
            WebkitFontSmoothing: 'antialiased',
          }}
        >
          SIERRA TEL
        </h1>
        <div
          style={{
            height: '2px',
            background: '#2C89D9',
            width: '170px',
          }}
        />
      </div>
    </div>
  );
}
