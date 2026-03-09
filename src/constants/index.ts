export const STORAGE_KEY = 'gestor-tareas-ice-tasks'
export const MAX_DESCRIPTION_LENGTH = 200
export const ICE_MIN = 1
export const ICE_MAX = 10
export const SCORE_MIN = 0
export const SCORE_MAX = 100

export const SCORE_COLORS = {
  high: '#d32f2f',
  mid: '#f57c00',
  low: '#388e3c',
} as const

export const GEMINI_API_ENDPOINT =
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent'
export const GEMINI_TIMEOUT_MS = 4000
