export default function ErrorMessage({ error }) {
  return (
    <div className="error-container">
      <div className="error-icon">❌</div>
      <div className="error-text">
        {error || 'Unable to fetch data. Please try again later.'}
      </div>
    </div>
  );
}
