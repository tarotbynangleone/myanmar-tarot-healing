import { useState, useEffect, useCallback } from 'react'

const STORAGE_KEY = 'myanmar-tarot-history'

function loadHistory() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function saveHistory(entries) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries))
  } catch {
    // storage may be full or unavailable
  }
}

export function useHistory() {
  const [entries, setEntries] = useState(loadHistory)

  useEffect(() => {
    saveHistory(entries)
  }, [entries])

  const addEntry = useCallback((entry) => {
    const newEntry = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      cardId: entry.cardId,
      cardName: entry.cardName,
      cardEmoji: entry.cardEmoji,
      healing: entry.healing,
      keywords: entry.keywords,
      reflection: entry.reflection || '',
    }
    setEntries((prev) => [newEntry, ...prev])
    return newEntry
  }, [])

  const deleteEntry = useCallback((id) => {
    setEntries((prev) => prev.filter((e) => e.id !== id))
  }, [])

  const clearAll = useCallback(() => {
    setEntries([])
  }, [])

  return { entries, addEntry, deleteEntry, clearAll }
}
