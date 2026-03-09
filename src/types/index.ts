export type TaskStatus = 'pending' | 'in_progress' | 'done'

export interface Task {
  readonly id: string
  description: string
  impact: number
  confidence: number
  ease: number
  status: TaskStatus
  explanation: string
}

export interface GeminiAnalysis {
  readonly impact: number
  readonly confidence: number
  readonly ease: number
  readonly explanation: string
}

export interface ModalState {
  readonly open: boolean
  readonly selectedTask: Task | null
}
