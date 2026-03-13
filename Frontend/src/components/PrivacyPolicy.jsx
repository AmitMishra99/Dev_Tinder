const PrivacyPolicy = () => {
  return (
    <div className="container py-5" style={{ maxWidth: "800px" }}>
      <h2 className="fw-bold mb-4">Privacy Policy</h2>
      <p className="text-muted">Last Updated: March 2026</p>
      <section className="mb-4">
        <h4>1. Data Collection</h4>
        <p>
          We collect information you provide directly to us, such as your name,
          email address, profile photos, and technical skills when you register
          for DevTinder.
        </p>
      </section>
      <section className="mb-4">
        <h4>2. Chat & Communication</h4>
        <p>
          Messages sent through our platform are stored on our secure servers to
          allow you to access your chat history. We do not sell your
          conversation data to third parties.
        </p>
      </section>
      <section className="mb-4">
        <h4>3. Payment Information</h4>
        <p>
          Payments are processed through secure third-party gateways
          (Stripe/Razorpay). We do not store your credit card or bank details on
          our servers.
        </p>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
