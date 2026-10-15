import { useState } from 'react'
import { useHistory } from './hooks/useHistory.js'
import { drawRandomCard } from './data/tarotCards.js'
import CardDraw from './components/CardDraw.jsx'
import HistoryLog from './components/HistoryLog.jsx'
import './styles/app.css'

export default function App() {
  const [view, setView] = useState('draw')
  const { entries, addEntry, deleteEntry, clearAll } = useHistory()
  const [currentCard, setCurrentCard] = useState(null)
  const [reflection, setReflection] = useState('')
  const [saved, setSaved] = useState(false)

  function handleDraw() {
    setCurrentCard(drawRandomCard())
    setReflection('')
    setSaved(false)
  }

  function handleSave() {
    if (!currentCard || saved) return
    addEntry({
      cardId: currentCard.id,
      cardName: currentCard.name,
      cardEmoji: currentCard.emoji,
      healing: currentCard.healing,
      keywords: currentCard.keywords,
      reflection,
    })
    setSaved(true)
  }

  return (
    <div className="app">
      <header className="app-header">
        <div className="lotus">🪷</div>
        <h1>Myanmar Tarot Healing</h1>
        <p className="subtitle">Daily guidance for your healing journey</p>
      </header>

      <nav className="tab-nav">
        <button
          className={view === 'draw' ? 'tab active' : 'tab'}
          onClick={() => setView('draw')}
        >
          Daily Card
        </button>
        <button
          className={view === 'history' ? 'tab active' : 'tab'}
          onClick={() => setView('history')}
        >
          History {entries.length > 0 && <span className="badge">{entries.length}</span>}
        </button>
      </nav>

      <main className="content">
        {view === 'draw' ? (
          <CardDraw
            currentCard={currentCard}
            reflection={reflection}
            setReflection={setReflection}
            saved={saved}
            onDraw={handleDraw}
            onSave={handleSave}
          />
        ) : (
          <HistoryLog
            entries={entries}
            onDelete={deleteEntry}
            onClearAll={clearAll}
          />
        )}
      </main>

      <footer className="app-footer">
        <p>🪷 May your path be filled with healing and light 🪷</p>
      </footer>
    </div>
  )
}
