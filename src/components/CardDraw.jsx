import { useState } from 'react'
import { drawRandomCard } from '../data/cards.js'

export default function CardDraw({ onSaveReading }) {
  const [card, setCard] = useState(null)
  const [isFlipped, setIsFlipped] = useState(false)
  const [note, setNote] = useState('')
  const [saved, setSaved] = useState(false)
  const [drawing, setDrawing] = useState(false)

  const handleDraw = () => {
    setDrawing(true)
    setIsFlipped(false)
    setSaved(false)
    setNote('')
    setTimeout(() => {
      setCard(drawRandomCard())
      setDrawing(false)
      setTimeout(() => setIsFlipped(true), 100)
    }, 600)
  }

  const handleSave = () => {
    if (!card) return
    onSaveReading({
      cardId: card.id,
      cardName: card.name,
      cardMyanmarName: card.myanmarName,
      theme: card.theme,
      meaning: card.upright,
      note: note.trim(),
    })
    setSaved(true)
  }

  return (
    <div className="card-draw">
      <div className="draw-header">
        <h2>Daily Reading</h2>
        <p className="subtitle">Center yourself, breathe deeply, and draw a card to receive today's guidance.</p>
      </div>

      {!card && !drawing && (
        <div className="draw-prompt">
          <div className="card-back-placeholder" onClick={handleDraw}>
            <div className="card-back-design">
              <span className="card-back-symbol">☸</span>
              <span className="card-back-text">Tap to Draw</span>
            </div>
          </div>
        </div>
      )}

      {drawing && (
        <div className="draw-prompt">
          <div className="card-back-placeholder shuffling">
            <div className="card-back-design">
              <span className="card-back-symbol">☸</span>
            </div>
          </div>
          <p className="shuffling-text">Shuffling the deck…</p>
        </div>
      )}

      {card && !drawing && (
        <div className="card-result">
          <div className={`tarot-card ${isFlipped ? 'flipped' : ''}`}>
            <div className="card-face card-back">
              <span className="card-back-symbol">☸</span>
            </div>
            <div className="card-face card-front">
              <span className="card-number">{card.number}</span>
              <h3 className="card-name">{card.name}</h3>
              <span className="card-myanmar">{card.myanmarName}</span>
              <span className="card-element">{card.element}</span>
              <div className="card-keywords">
                {card.keywords.map((kw) => (
                  <span key={kw} className="keyword-tag">
                    {kw}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="card-interpretation">
            <span className="card-theme-badge">{card.theme}</span>
            <p className="card-meaning">{card.upright}</p>
            <div className="reflection-prompt">
              <span className="reflection-label">Reflect</span>
              <p>{card.reflection}</p>
            </div>
          </div>

          {!saved ? (
            <div className="save-section">
              <textarea
                className="note-input"
                placeholder="Write your reflection or journal entry for this reading…"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={4}
              />
              <div className="save-buttons">
                <button className="btn btn-secondary" onClick={handleDraw}>
                  Draw Again
                </button>
                <button className="btn btn-primary" onClick={handleSave}>
                  Save to History
                </button>
              </div>
            </div>
          ) : (
            <div className="saved-confirmation">
              <span className="check-icon">✓</span>
              <p>Reading saved to your history log.</p>
              <button className="btn btn-secondary" onClick={handleDraw}>
                Draw Another Card
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
