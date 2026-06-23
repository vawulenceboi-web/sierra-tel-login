export function LogoSection() {
  return (
    <div className="logo-section">
      {/* Use existing PNG logo from public/ so it matches the screenshot */}
      <img
        src="/sierra-tel-logo.png"
        alt="Sierra Tel Logo"
        className="logo-image"
        loading="eager"
        decoding="async"
      />

      {/* Company Name with underline */}
      <div className="logo-text">
        <h1>SIERRA TEL</h1>
        <div className="logo-underline" />
      </div>
    </div>
  );
}
