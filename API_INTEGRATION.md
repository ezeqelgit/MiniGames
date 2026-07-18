# API Integration Guide

## What's been integrated

Both games (Hacking and Signaling) now send game results to the backend API automatically when a game finishes.

## How it works

### 1. **Hacking Game**
When the game completes, it calculates:
- **Score**: `(successful_paths * 100) + (remaining_seconds * 10)`
- Sends data to backend: game name, score, and detailed info about paths

### 2. **Signaling Game**
When the game completes, it calculates:
- **Score**: Win bonus (500) + time bonus (max 300)
- Sends data to backend: game name, score, and wire cutting details

## Running Frontend + Backend Together

### Terminal 1: Start Backend
```powershell
cd c:\Workspace\MiniGames-Backend
npm install  # if not done yet
npm run dev
```

Backend will run on: `http://localhost:3000`

### Terminal 2: Start Frontend
```powershell
cd c:\Workspace\MiniGames
npm install  # if not done yet
npm run serve
```

Frontend will run on: `http://localhost:8080` (or similar)

## Testing the API Integration

1. Open frontend in browser
2. Play either game (Hacking or Signaling) to completion
3. Check backend terminal — you should see logs like:
   ```
   ✅ Score sent to backend: { success: true, data: { ... } }
   ```
4. Check browser console (F12) — should also show the score data

## API Endpoints Used

### Send Score
```
POST /api/score
```

Request:
```json
{
  "game": "Hacking",
  "score": 1500,
  "details": {
    "successfulPaths": 3,
    "totalTime": 60,
    "remainingTime": 45,
    "pathsStatus": [...]
  }
}
```

Response:
```json
{
  "success": true,
  "message": "Score 1500 saved for game Hacking",
  "data": {
    "game": "Hacking",
    "score": 1500,
    "timestamp": "2026-07-18T..."
  }
}
```

## Environment Configuration

If you want to change the backend URL, create a `.env.local` file in the frontend folder:

```
VUE_APP_API_URL=http://your-backend-url:3000/api
```

Default is `http://localhost:3000/api`

## Debugging

### If scores aren't being sent:

1. **Check backend is running**: `curl http://localhost:3000/api/health`
   - Should return: `{ "status": "OK", "message": "Server is running" }`

2. **Check browser console** (F12 → Console tab):
   - Look for error messages from `ApiService.ts`
   - Check Network tab → look for POST requests to `/api/score`

3. **Check backend logs**:
   - Backend terminal should show request logs

### Common issues:

- **CORS Error**: Make sure backend is running and CORS is enabled
- **Connection Refused**: Check that backend is on port 3000
- **404 Not Found**: Check that API endpoint is correct

## Next Steps

- Add database to store scores permanently
- Add user authentication
- Create leaderboard display
- Add more detailed game analytics
