import { useState } from 'react'
import CardDraw from './components/CardDraw.jsx'
import HistoryLog from './components/HistoryLog.jsx'
import { useHistory } from './hooks/useHistory.js'

export default function App() {
  const [view, setView] = useState('draw')
  const { history, addEntry, deleteEntry, clearHistory } = useHistory()

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <h1 className="app-title">
            <span className="title-symbol">☸</span>
            Myanmar Tarot Healing
          </h1>
          <p className="app-tagline">Daily guidance for your healing journey</p>
        </div>
      </header>

      <nav className="tab-nav">
        <button
          className={`tab ${view === 'draw' ? 'active' : ''}`}
          onClick={() => setView('draw')}
        >
          Daily Reading
        </button>
        <button
          className={`tab ${view === 'history' ? 'active' : ''}`}
          onClick={() => setView('history')}
        >
          History Log
          {history.length > 0 && <span className="tab-badge">{history.length}</span>}
        </button>
      </nav>

      <main className="app-main">
        {view === 'draw' && <CardDraw onSaveReading={addEntry} />}
        {view === 'history' && (
          <HistoryLog
            history={history}
            onDeleteEntry={deleteEntry}
            onClearHistory={clearHistory}
          />
        )}
      </main>

      <footer className="app-footer">
        <p>Myanmar Tarot Healing · For reflection and spiritual growth</p>
      </footer>
    </div>
  )
}
