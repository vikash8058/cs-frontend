// Returns "2h ago", "just now", etc.
export function timeAgo(dateStr) {
  if (!dateStr) return '';
  
  // Ensure date string is treated as UTC if it doesn't have a timezone indicator
  // Backend LocalDateTime usually looks like "2026-05-15T14:13:00"
  let formattedStr = dateStr;
  if (!dateStr.includes('Z') && !dateStr.includes('+')) {
    formattedStr = dateStr + 'Z';
  }

  const date = new Date(formattedStr);
  const now  = new Date();
  const secs = Math.floor((now - date) / 1000);

  if (secs < 30)   return 'just now';
  if (secs < 60)   return `${secs}s ago`;
  if (secs < 3600) return `${Math.floor(secs / 60)}m ago`;
  if (secs < 86400) return `${Math.floor(secs / 3600)}h ago`;
  if (secs < 604800) return `${Math.floor(secs / 86400)}d ago`;

  return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

export function fullDate(dateStr) {
  if (!dateStr) return '';
  let formattedStr = dateStr;
  if (!dateStr.includes('Z') && !dateStr.includes('+')) {
    formattedStr = dateStr + 'Z';
  }
  return new Date(formattedStr).toLocaleDateString('en-IN', {
    day: 'numeric', month: 'long', year: 'numeric',
  });
}
