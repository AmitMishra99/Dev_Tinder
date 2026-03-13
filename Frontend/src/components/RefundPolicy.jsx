import React from "react";
import { useNavigate } from "react-router-dom";

const RefundPolicy = () => {
  const navigate = useNavigate();
  const brandColor = "#FF4B2B";

  return (
    <div className="bg-light min-vh-100 py-5">
      <div
        className="container bg-white shadow-sm p-5"
        style={{
          maxWidth: "850px",
          borderRadius: "24px",
          border: "1px solid rgba(0,0,0,0.05)",
        }}
      >
        {/* Header */}
        <div className="d-flex align-items-center mb-4">
          <button
            onClick={() => navigate(-1)}
            className="btn btn-light rounded-circle me-3"
            style={{ width: "40px", height: "40px" }}
          >
            <i className="fa-solid fa-arrow-left"></i>
          </button>
          <h2 className="fw-bold m-0">Refund & Cancellation Policy</h2>
        </div>

        <p className="text-muted mb-4">Last Updated: March 13, 2026</p>
        <hr className="opacity-10 mb-5" />

        {/* Section 1 */}
        <div className="mb-5">
          <h5 className="fw-bold d-flex align-items-center">
            <i
              className="fa-solid fa-circle-info me-2"
              style={{ color: brandColor }}
            ></i>
            1. Overview
          </h5>
          <p className="text-secondary leading-relaxed">
            DevTinder provides digital subscription services for developers.
            Because our "Premium" features are granted immediately upon
            successful payment, we have a strict refund policy to prevent abuse
            of our digital assets.
          </p>
        </div>

        {/* Section 2 */}
        <div className="mb-5">
          <h5 className="fw-bold d-flex align-items-center">
            <i
              className="fa-solid fa-ban me-2"
              style={{ color: brandColor }}
            ></i>
            2. Cancellation Policy
          </h5>
          <p className="text-secondary">
            You may cancel your subscription at any time. Once cancelled:
          </p>
          <ul className="text-secondary">
            <li>
              Your account will remain "Premium" until the current billing cycle
              ends.
            </li>
            <li>You will not be charged for the next billing cycle.</li>
            <li>
              No partial refunds are provided for the remaining days of a month.
            </li>
          </ul>
        </div>

        {/* Section 3 */}
        <div
          className="mb-5 p-4 rounded-4"
          style={{
            backgroundColor: `${brandColor}08`,
            border: `1px dashed ${brandColor}`,
          }}
        >
          <h5 className="fw-bold d-flex align-items-center">
            <i
              className="fa-solid fa-hand-holding-dollar me-2"
              style={{ color: brandColor }}
            ></i>
            3. Refund Eligibility
          </h5>
          <p className="text-secondary">
            Refunds are generally <strong>not issued</strong> for digital goods.
            However, we may consider a refund request within 48 hours of
            purchase if:
          </p>
          <ul className="text-secondary">
            <li>
              There was a documented technical failure that prevented you from
              using the service.
            </li>
            <li>
              You were charged twice due to a technical error on our part.
            </li>
            <li>
              Your account was charged after you had already successfully
              cancelled your subscription.
            </li>
          </ul>
        </div>

        {/* Section 4 */}
        <div className="mb-5">
          <h5 className="fw-bold d-flex align-items-center">
            <i
              className="fa-solid fa-clock me-2"
              style={{ color: brandColor }}
            ></i>
            4. Processing Time
          </h5>
          <p className="text-secondary">
            If approved, your refund will be processed and automatically applied
            to your original method of payment within{" "}
            <strong>5 to 10 business days</strong>.
          </p>
        </div>

        {/* Support Box */}
        <div className="bg-dark text-white p-4 rounded-4 d-flex align-items-center justify-content-between">
          <div>
            <h6 className="mb-1 fw-bold">Need help with billing?</h6>
            <p className="small mb-0 opacity-75">
              Our support team is available 24/7 for payment issues.
            </p>
          </div>
          <a
            href="mailto:billing@devtinder.com"
            className="btn btn-light fw-bold px-4 rounded-pill"
          >
            Contact Billing
          </a>
        </div>
      </div>
    </div>
  );
};

export default RefundPolicy;
