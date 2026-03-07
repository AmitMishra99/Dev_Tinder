const LoaderPage = ({ text }) => {
  return (
    <>
      <div
        className="d-flex flex-column align-items-center justify-content-center"
        style={{ minHeight: "60vh" }}
      >
        <div className="spinner-border text-secondary mb-3" role="status" />
        <p className="text-muted fw-semibold fs-3">{text}</p>
      </div>
    </>
  );
};

export default LoaderPage;
