import { createContext, useContext } from 'react'
import { create } from 'zustand'

interface JournalEntry {
  id: string
  title: string
  content: string
  createdAt: string
  mood?: 'happy' | 'neutral' | 'sad'
}

interface JournalState {
  entries: JournalEntry[]
  addEntry: (entry: JournalEntry) => void
  removeEntry: (id: string) => void
}

const useJournalStore = create<JournalState>((set) => ({
  entries: [],
  addEntry: (entry) => set((state) => ({ entries: [...state.entries, entry] })),
  removeEntry: (id) => set((state) => ({
    entries: state.entries.filter((entry) => entry.id !== id)
  })),
}))

const JournalContext = createContext<ReturnType<typeof useJournalStore> | null>(null)

interface JournalProviderProps {
  children: React.ReactNode
}

export function JournalProvider({ children }: JournalProviderProps) {
  return (
    <JournalContext.Provider value={useJournalStore()}>
      {children}
    </JournalContext.Provider>
  )
}

export function useJournal() {
  const store = useContext(JournalContext)
  if (!store) throw new Error('useJournal must be used within JournalProvider')
  return store
}