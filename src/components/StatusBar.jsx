// Format date from ISO timestamp to "30 Oct 2025" format
function formatDate(isoTimestamp) {
  if (!isoTimestamp) return 'Unknown';

  const date = new Date(isoTimestamp);
  const day = date.getDate();
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
}

export default function StatusBar({ lastUpdated, dataSource }) {
  if (!lastUpdated || !dataSource) return null;

  const formattedDate = formatDate(lastUpdated);
  const isLive = dataSource === 'live';
  const statusClass = isLive ? 'status-live' : 'status-cached';
  const indicatorClass = isLive ? 'live' : 'cached';
  const statusText = isLive ? '(Live Data)' : '(Offline - Cached Data)';

  return (
    <div className="status-bar">
      <span className={statusClass}>
        <span className={`status-indicator ${indicatorClass}`}></span>
        Last updated: {formattedDate} {statusText}
      </span>
    </div>
  );
}
