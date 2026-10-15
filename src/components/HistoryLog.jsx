import { useState } from 'react'

function formatDate(isoStr) {
  const d = new Date(isoStr)
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export default function HistoryLog({ entries, onDelete, onClearAll }) {
  const [confirmClear, setConfirmClear] = useState(false)

  if (entries.length === 0) {
    return (
      <div className="history-empty">
        <div className="empty-icon">🪷</div>
        <p className="empty-title">No readings yet</p>
        <p className="empty-hint">
          Draw a card and save it to start tracking your healing journey.
        </p>
      </div>
    )
  }

  // Stats
  const totalReadings = entries.length
  const uniqueCards = new Set(entries.map((e) => e.cardName)).size
  const reflectionsCount = entries.filter((e) => e.reflection.trim()).length

  return (
    <div className="history-log">
      <div className="history-stats">
        <div className="stat">
          <span className="stat-value">{totalReadings}</span>
          <span className="stat-label">Readings</span>
        </div>
        <div className="stat">
          <span className="stat-value">{uniqueCards}</span>
          <span className="stat-label">Unique Cards</span>
        </div>
        <div className="stat">
          <span className="stat-value">{reflectionsCount}</span>
          <span className="stat-label">Reflections</span>
        </div>
      </div>

      <div className="history-list">
        {entries.map((entry) => (
          <div key={entry.id} className="history-entry">
            <div className="entry-header">
              <span className="entry-emoji">{entry.cardEmoji}</span>
              <div className="entry-meta">
                <h3 className="entry-card-name">{entry.cardName}</h3>
                <span className="entry-date">{formatDate(entry.date)}</span>
              </div>
              <button
                className="btn-delete"
                onClick={() => onDelete(entry.id)}
                aria-label="Delete entry"
              >
                ✕
              </button>
            </div>
            <div className="entry-keywords">
              {entry.keywords.map((kw) => (
                <span key={kw} className="keyword-chip sm">{kw}</span>
              ))}
            </div>
            <p className="entry-healing">{entry.healing}</p>
            {entry.reflection && (
              <div className="entry-reflection">
                <span className="reflection-tag">Reflection</span>
                <p>{entry.reflection}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="history-actions">
        {confirmClear ? (
          <div className="confirm-clear">
            <span>Clear all history?</span>
            <button className="btn-danger" onClick={onClearAll}>
              Yes, clear all
            </button>
            <button className="btn-secondary" onClick={() => setConfirmClear(false)}>
              Cancel
            </button>
          </div>
        ) : (
          <button className="btn-clear" onClick={() => setConfirmClear(true)}>
            Clear All History
          </button>
        )}
      </div>
    </div>
  )
}
