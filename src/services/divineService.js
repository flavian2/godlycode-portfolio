// Divine service — handles all communication with the GodlyCode divine backend

const API_BASE = '/api';

// Session management via localStorage
export const getSessionId = () => {
  let sessionId = localStorage.getItem('godlycode_session_id');
  if (!sessionId) {
    sessionId = 'gc_' + Date.now() + '_' + Math.random().toString(36).slice(2, 9);
    localStorage.setItem('godlycode_session_id', sessionId);
  }
  return sessionId;
};

export const clearSession = () => {
  localStorage.removeItem('godlycode_session_id');
};

/**
 * Stream a message to a god and process the SSE response
 * @param {string} god - 'ikuku' | 'oshun' | 'ogun' | 'eshu'
 * @param {string} message - User message
 * @param {string} sessionId - Session ID
 * @param {function} onToken - Called with each text token
 * @param {function} onDone - Called when streaming is complete with { blueprint, fullText }
 * @param {function} onError - Called on error
 * @param {string} preloadedContext - Optional context for Start Project flow
 */
export const streamMessage = async (god, message, sessionId, onToken, onDone, onError, preloadedContext = null) => {
  try {
    const response = await fetch(`${API_BASE}/chat/${god}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, sessionId, preloadedContext })
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: Failed to reach the divine realm.`);
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop(); // keep incomplete line in buffer

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const dataStr = line.slice(6).trim();
          if (!dataStr) continue;

          try {
            const data = JSON.parse(dataStr);

            if (data.type === 'token' && data.text) {
              onToken(data.text);
            } else if (data.type === 'done') {
              onDone({ blueprint: data.blueprint, fullText: data.fullText });
            } else if (data.type === 'error') {
              onError(new Error(data.message));
            }
          } catch {
            // Skip malformed JSON
          }
        }
      }
    }
  } catch (err) {
    onError(err);
  }
};

/**
 * Get conversation history for a god
 */
export const getHistory = async (god, sessionId) => {
  try {
    const res = await fetch(`${API_BASE}/chat/${god}/history?sessionId=${sessionId}`);
    const data = await res.json();
    return data.messages || [];
  } catch {
    return [];
  }
};

/**
 * Get the divine blueprint for the current session
 */
export const getBlueprint = async (sessionId) => {
  try {
    const res = await fetch(`${API_BASE}/blueprint/${sessionId}`);
    const data = await res.json();
    return data.blueprint;
  } catch {
    return null;
  }
};

/**
 * Save project intake form data before sending to Ikuku
 */
export const saveIntakeForm = async (sessionId, formData) => {
  try {
    const res = await fetch(`${API_BASE}/blueprint/save`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessionId, ...formData })
    });
    return await res.json();
  } catch {
    return { success: false };
  }
};

/**
 * Admin: Login
 */
export const adminLogin = async (password) => {
  try {
    const res = await fetch(`${API_BASE}/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password })
    });
    return await res.json();
  } catch {
    return { error: 'Connection failed.' };
  }
};

/**
 * Admin: Get all sessions
 */
export const adminGetSessions = async (adminPassword, filters = {}) => {
  try {
    const params = new URLSearchParams(filters).toString();
    const res = await fetch(`${API_BASE}/admin/sessions?${params}`, {
      headers: { 'x-admin-password': adminPassword }
    });
    return await res.json();
  } catch {
    return { sessions: [], total: 0 };
  }
};

/**
 * Admin: Get session details
 */
export const adminGetSession = async (adminPassword, sessionId) => {
  try {
    const res = await fetch(`${API_BASE}/admin/sessions/${sessionId}`, {
      headers: { 'x-admin-password': adminPassword }
    });
    return await res.json();
  } catch {
    return {};
  }
};

/**
 * Admin: Update session status
 */
export const adminUpdateStatus = async (adminPassword, sessionId, status) => {
  try {
    const res = await fetch(`${API_BASE}/admin/sessions/${sessionId}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'x-admin-password': adminPassword
      },
      body: JSON.stringify({ status })
    });
    return await res.json();
  } catch {
    return { error: 'Update failed.' };
  }
};

/**
 * Admin: Get stats
 */
export const adminGetStats = async (adminPassword) => {
  try {
    const res = await fetch(`${API_BASE}/admin/stats`, {
      headers: { 'x-admin-password': adminPassword }
    });
    return await res.json();
  } catch {
    return {};
  }
};

/**
 * Admin: Export session
 */
export const adminExportSession = async (adminPassword, sessionId) => {
  const url = `${API_BASE}/admin/export/${sessionId}?password=${adminPassword}`;
  window.open(url, '_blank');
};

// God metadata for UI
export const GOD_META = {
  ikuku: {
    name: 'Ikuku',
    title: 'God of Wind',
    subtitle: 'The All-Knowing Orchestrator',
    emoji: '💨',
    color: '#D4AF37',
    gradientFrom: 'from-celestial-gold',
    gradientTo: 'to-yellow-600',
    domain: 'Project Discovery & Divine Orchestration',
    description: 'The wind that moves through all things. Ikuku senses your project before you speak. He analyzes, blueprints and commands the divine team.',
    igboTitle: 'Onyenwe-ọchịchọ',
    phrase: '"I felt your presence before you arrived."'
  },
  oshun: {
    name: 'Oshun',
    title: 'Goddess of Beauty',
    subtitle: 'Frontend & UI Divine Creator',
    emoji: '🌊',
    color: '#FF9F43',
    gradientFrom: 'from-orange-400',
    gradientTo: 'to-pink-500',
    domain: 'Frontend, UI/UX & Design',
    description: 'The river goddess who transforms code into sacred art. Every pixel she touches becomes beauty. Your digital presence will stop hearts.',
    yorubaTitle: 'Ẹ wa ẹwa',
    phrase: '"The wind has already told me everything about you."'
  },
  ogun: {
    name: 'Ogun',
    title: 'God of Iron',
    subtitle: 'Backend & DevOps Divine Forge',
    emoji: '⚒️',
    color: '#576574',
    gradientFrom: 'from-slate-500',
    gradientTo: 'to-gray-800',
    domain: 'Backend, APIs, Databases & DevOps',
    description: 'The god who forges digital empires in iron. What Ogun builds never breaks, never bends, never fails. Your system will stand for generations.',
    yorubaTitle: 'Irin Gbígbé',
    phrase: '"Ikuku\'s wind reached my forge before you did."'
  },
  eshu: {
    name: 'Eshu',
    title: 'God of Crossroads',
    subtitle: 'Project Manager & Divine Guide',
    emoji: '🛤️',
    color: '#00B4D8',
    gradientFrom: 'from-electric-blue',
    gradientTo: 'to-teal-600',
    domain: 'Project Management & Timelines',
    description: 'He sees every path, every shortcut, every crossroads. Eshu has already mapped your entire project journey from day one to launch day.',
    yorubaTitle: 'Ọ̀nà Tó Tọ̀',
    phrase: '"Ikuku sent the wind to tell me all about you!"'
  }
};
