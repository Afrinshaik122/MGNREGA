// Format numbers with Indian comma system
function formatIndianNumber(num) {
  if (!num && num !== 0) return '0';

  const numStr = num.toString();
  const [intPart, decPart] = numStr.split('.');

  // For Indian numbering system
  let formatted = '';
  let count = 0;

  for (let i = intPart.length - 1; i >= 0; i--) {
    if (count === 3 || (count > 3 && (count - 3) % 2 === 0)) {
      formatted = ',' + formatted;
    }
    formatted = intPart[i] + formatted;
    count++;
  }

  return decPart ? `${formatted}.${decPart}` : formatted;
}

// Format currency in lakhs or crores
function formatCurrency(amount) {
  if (!amount && amount !== 0) return '₹0';

  const numAmount = Number(amount);

  // 1 crore = 10,000,000
  if (numAmount >= 10000000) {
    const crores = (numAmount / 10000000).toFixed(1);
    return `₹${crores} Cr`;
  }

  // 1 lakh = 100,000
  if (numAmount >= 100000) {
    const lakhs = (numAmount / 100000).toFixed(1);
    return `₹${lakhs} L`;
  }

  return `₹${formatIndianNumber(numAmount)}`;
}

export default function Dashboard({ performanceData, dataSource }) {
  if (!performanceData) return null;

  const {
    householdsEmployed,
    totalWorkdays,
    paymentsCompleted,
    pendingPayments
  } = performanceData;

  return (
    <div className="dashboard">
      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-icon">👷</div>
          <div className="metric-value">{formatIndianNumber(householdsEmployed)}</div>
          <div className="metric-label">Households Employed</div>
        </div>

        <div className="metric-card">
          <div className="metric-icon">📅</div>
          <div className="metric-value">{formatIndianNumber(totalWorkdays)}</div>
          <div className="metric-label">Total Workdays</div>
        </div>

        <div className="metric-card">
          <div className="metric-icon">✅</div>
          <div className="metric-value">{formatCurrency(paymentsCompleted)}</div>
          <div className="metric-label">Payments Completed</div>
        </div>

        <div className="metric-card">
          <div className="metric-icon">⏳</div>
          <div className="metric-value">{formatCurrency(pendingPayments)}</div>
          <div className="metric-label">Pending Payments</div>
        </div>
      </div>
    </div>
  );
}
