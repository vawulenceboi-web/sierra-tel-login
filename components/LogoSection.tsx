export function LogoSection() {
  return (
    <div
      style={{
        marginTop: '80px',
        marginBottom: '6px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '20px',
      }}
    >
      {/* Logo Image */}
      <img
        src="/sierra-tel-logo.png"
        alt="Sierra Tel Logo"
        style={{
          height: '90px',
          width: 'auto',
          flexShrink: 0,
        }}
      />

      {/* Company Name with underline */}
      <div>
        <h1
          style={{
            fontFamily: '"Times New Roman", serif',
            fontSize: '44px',
            fontWeight: 'normal',
            color: '#111111',
            letterSpacing: '2px',
            margin: '0 0 6px 0',
            WebkitFontSmoothing: 'antialiased',
            lineHeight: '1',
          }}
        >
          SIERRA TEL
        </h1>
        <div
          style={{
            height: '3px',
            background: '#0099DD',
            width: '220px',
          }}
        />
      </div>
    </div>
  );
}
