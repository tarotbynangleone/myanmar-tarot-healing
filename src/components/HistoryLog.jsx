import { useState } from 'react'

export default function HistoryLog({ history, onDeleteEntry, onClearHistory }) {
  const [expandedId, setExpandedId] = useState(null)
  const [confirmClear, setConfirmClear] = useState(false)

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id)
  }

  const formatDate = (iso) => {
    const d = new Date(iso)
    return d.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  const formatTime = (iso) => {
    const d = new Date(iso)
    return d.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  // Progress stats
  const totalReadings = history.length
  const uniqueCards = new Set(history.map((e) => e.cardName)).size
  const cardFrequency = {}
  history.forEach((e) => {
    cardFrequency[e.cardName] = (cardFrequency[e.cardName] || 0) + 1
  })
  const mostDrawn = Object.entries(cardFrequency).sort((a, b) => b[1] - a[1])[0]

  // Streak calculation (consecutive days with at least one reading)
  const datesWithReadings = new Set(history.map((e) => new Date(e.date).toDateString()))
  let streak = 0
  const today = new Date()
  for (let i = 0; i < 365; i++) {
    const checkDate = new Date(today)
    checkDate.setDate(checkDate.getDate() - i)
    if (datesWithReadings.has(checkDate.toDateString())) {
      streak++
    } else if (i > 0) {
      break
    }
  }

  if (totalReadings === 0) {
    return (
      <div className="history-log">
        <div className="draw-header">
          <h2>Reading History</h2>
        </div>
        <div className="empty-history">
          <span className="empty-icon">☸</span>
          <p>No readings saved yet.</p>
          <p className="empty-subtitle">Draw a card and save it to start tracking your healing journey.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="history-log">
      <div className="draw-header">
        <h2>Reading History</h2>
        <p className="subtitle">Track your healing journey over time.</p>
      </div>

      <div className="progress-stats">
        <div className="stat-card">
          <span className="stat-value">{totalReadings}</span>
          <span className="stat-label">Total Readings</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{streak}</span>
          <span className="stat-label">Day Streak</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{uniqueCards}</span>
          <span className="stat-label">Unique Cards</span>
        </div>
        {mostDrawn && (
          <div className="stat-card stat-card-wide">
            <span className="stat-value-small">{mostDrawn[0]}</span>
            <span className="stat-label">Most Drawn ({mostDrawn[1]}×)</span>
          </div>
        )}
      </div>

      <div className="history-list">
        {history.map((entry) => (
          <div key={entry.id} className="history-entry">
            <div className="history-entry-header" onClick={() => toggleExpand(entry.id)}>
              <div className="history-entry-left">
                <span className="history-card-number">
                  {entry.theme}
                </span>
                <span className="history-card-name">
                  {entry.cardName} · {entry.cardMyanmarName}
                </span>
              </div>
              <div className="history-entry-right">
                <span className="history-date">{formatDate(entry.date)}</span>
                <span className="history-time">{formatTime(entry.date)}</span>
                <span className="expand-icon">{expandedId === entry.id ? '−' : '+'}</span>
              </div>
            </div>
            {expandedId === entry.id && (
              <div className="history-entry-detail">
                <p className="history-meaning">{entry.meaning}</p>
                {entry.note && (
                  <div className="history-note">
                    <span className="reflection-label">Your Note</span>
                    <p>{entry.note}</p>
                  </div>
                )}
                <button
                  className="btn btn-danger btn-small"
                  onClick={() => onDeleteEntry(entry.id)}
                >
                  Delete Entry
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="clear-section">
        {!confirmClear ? (
          <button className="btn btn-danger btn-small" onClick={() => setConfirmClear(true)}>
            Clear All History
          </button>
        ) : (
          <div className="confirm-clear">
            <span>Are you sure? This cannot be undone.</span>
            <button
              className="btn btn-danger btn-small"
              onClick={() => {
                onClearHistory()
                setConfirmClear(false)
              }}
            >
              Yes, Clear All
            </button>
            <button className="btn btn-secondary btn-small" onClick={() => setConfirmClear(false)}>
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
