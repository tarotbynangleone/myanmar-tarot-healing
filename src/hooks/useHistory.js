import { useState, useEffect, useCallback } from 'react'

const STORAGE_KEY = 'mth_reading_history'

// Hook for managing the personal reading history log in localStorage.
// Each entry: { id, date (ISO), cardId, cardName, cardMyanmarName, theme, meaning, note }

export function useHistory() {
  const [history, setHistory] = useState([])

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        setHistory(JSON.parse(raw))
      }
    } catch (e) {
      console.error('Failed to load reading history:', e)
    }
  }, [])

  const persist = useCallback((entries) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(entries))
    } catch (e) {
      console.error('Failed to save reading history:', e)
    }
  }, [])

  const addEntry = useCallback(
    (entry) => {
      const newEntry = {
        id: Date.now().toString(),
        date: new Date().toISOString(),
        ...entry,
      }
      setHistory((prev) => {
        const updated = [newEntry, ...prev]
        persist(updated)
        return updated
      })
      return newEntry
    },
    [persist],
  )

  const deleteEntry = useCallback(
    (id) => {
      setHistory((prev) => {
        const updated = prev.filter((e) => e.id !== id)
        persist(updated)
        return updated
      })
    },
    [persist],
  )

  const clearHistory = useCallback(() => {
    setHistory([])
    persist([])
  }, [persist])

  return { history, addEntry, deleteEntry, clearHistory }
}
