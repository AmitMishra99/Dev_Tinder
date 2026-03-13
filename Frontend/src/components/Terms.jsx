const Terms = () => {
  return (
    <div className="container py-5" style={{ maxWidth: "800px" }}>
      <h2 className="fw-bold mb-4">Terms of Service</h2>
      <section className="mb-4">
        <h4>1. Acceptance of Terms</h4>
        <p>
          By accessing DevTinder, you agree to be bound by these terms. If you
          disagree with any part, you may not use our services.
        </p>
      </section>
      <section className="mb-4">
        <h4>2. User Conduct</h4>
        <p>
          You agree not to use DevTinder for spamming, harassment, or sharing
          illegal content. We reserve the right to terminate accounts that
          violate these rules.
        </p>
      </section>
      <section className="mb-4">
        <h4>3. Subscription & Payments</h4>
        <p>
          Subscription fees are non-refundable unless otherwise stated in our
          Refund Policy. Premium features are active immediately upon successful
          payment.
        </p>
      </section>
    </div>
  );
};

export default Terms;
