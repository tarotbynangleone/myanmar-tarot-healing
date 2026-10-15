# Myanmar Tarot Healing — Setup Notes

## Stack
- Vite 6 + React 18 (frontend only, no backend)
- Readings history persisted in browser `localStorage` (key: `mth_reading_history`)

## Running in the sandbox
```sh
docker compose -f docker-compose.base44.yml up -d
```
- Node 22 slim image, source bind-mounted at `/workspace`
- `npm install` runs on container startup, then `npx vite --host 0.0.0.0 --port 5173`
- Host port 3000 → container 5173
- Vite live reload picks up source edits automatically

## Structure
- `src/data/cards.js` — Major Arcana deck with healing-focused meanings & Myanmar names
- `src/hooks/useHistory.js` — localStorage-backed history CRUD hook
- `src/components/CardDraw.jsx` — daily card draw + save-to-history flow
- `src/components/HistoryLog.jsx` — history list, progress stats, delete/clear
- `src/App.jsx` — tab navigation between Daily Reading and History Log
