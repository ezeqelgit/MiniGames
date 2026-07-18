

const API_BASE_URL = process.env.VUE_APP_API_URL || 'http://localhost:3000/api';

interface ScorePayload {
  game: string;
  score: number;
  details?: Record<string, any>;
}

interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}


export const sendScore = async (payload: ScorePayload): Promise<ApiResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/score`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('✅ Score sent to backend:', data);
    return { success: true, data };
  } catch (error) {
    console.error('❌ Error sending score:', error);
    return { success: false, error: String(error) };
  }
};

export const getLeaderboard = async (): Promise<ApiResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/leaderboard`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('✅ Leaderboard fetched:', data);
    return { success: true, data };
  } catch (error) {
    console.error('❌ Error fetching leaderboard:', error);
    return { success: false, error: String(error) };
  }
};

export const getGames = async (): Promise<ApiResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/games`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('✅ Games list fetched:', data);
    return { success: true, data };
  } catch (error) {
    console.error('❌ Error fetching games:', error);
    return { success: false, error: String(error) };
  }
};

export const healthCheck = async (): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE_URL}/health`);
    return response.ok;
  } catch (error) {
    console.error('❌ Backend health check failed:', error);
    return false;
  }
};
