export default function CardDraw({ currentCard, reflection, setReflection, saved, onDraw, onSave }) {
  return (
    <div className="card-draw">
      {!currentCard ? (
        <div className="draw-prompt">
          <div className="card-back" onClick={onDraw}>
            <div className="card-back-pattern">🪷</div>
          </div>
          <p className="draw-hint">Tap the card to draw your daily reading</p>
          <button className="btn-primary" onClick={onDraw}>
            Draw a Card
          </button>
        </div>
      ) : (
        <div className="card-reveal">
          <div className="tarot-card">
            <div className="card-emoji">{currentCard.emoji}</div>
            <h2 className="card-name">{currentCard.name}</h2>
            <div className="card-keywords">
              {currentCard.keywords.map((kw) => (
                <span key={kw} className="keyword-chip">{kw}</span>
              ))}
            </div>
            <p className="card-healing">{currentCard.healing}</p>
          </div>

          <div className="reflection-section">
            <label htmlFor="reflection" className="reflection-label">
              Your reflection (optional)
            </label>
            <textarea
              id="reflection"
              className="reflection-input"
              placeholder="How does this card speak to your healing today?"
              value={reflection}
              onChange={(e) => setReflection(e.target.value)}
              rows={3}
              disabled={saved}
            />
          </div>

          <div className="save-section">
            {saved ? (
              <p className="saved-msg">✅ Saved to your history log</p>
            ) : (
              <button className="btn-primary" onClick={onSave}>
                Save to History
              </button>
            )}
            <button className="btn-secondary" onClick={onDraw}>
              Draw Another
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
