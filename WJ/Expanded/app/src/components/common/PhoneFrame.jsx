export default function PhoneFrame({ children }) {
  return (
    <div className="phone-mockup-wrapper">
      <div className="phone-frame">
        <div className="phone-notch" aria-hidden />
        <div className="phone-screen">
          {children}
        </div>
        <div className="phone-home-indicator" aria-hidden />
      </div>
    </div>
  )
}
