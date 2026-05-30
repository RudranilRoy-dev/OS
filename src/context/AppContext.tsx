import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

type Page = 'dashboard' | 'process-management' | 'synchronization' | 'deadlocks' | 'memory-management' | 'file-io' | 'system-calls' | 'pyq-dashboard' | 'revision' | 'formulas' | 'flashcards' | 'quiz' | 'exam-mode';

interface TopicProgress {
  [key: string]: number;
}

interface Bookmark {
  id: string;
  page: Page;
  label: string;
}

interface AppState {
  theme: 'dark' | 'light';
  currentPage: Page;
  sidebarOpen: boolean;
  progress: TopicProgress;
  bookmarks: Bookmark[];
  examMode: boolean;
  searchQuery: string;
}

interface AppContextType extends AppState {
  setTheme: (theme: 'dark' | 'light') => void;
  toggleTheme: () => void;
  navigate: (page: Page) => void;
  setSidebarOpen: (open: boolean) => void;
  updateProgress: (topic: string, progress: number) => void;
  addBookmark: (bookmark: Bookmark) => void;
  removeBookmark: (id: string) => void;
  setExamMode: (on: boolean) => void;
  setSearchQuery: (q: string) => void;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AppState>(() => {
    try {
      const saved = localStorage.getItem('os-exam-prep-state');
      if (saved) {
        const parsed = JSON.parse(saved);
        return { ...parsed, sidebarOpen: false, examMode: false, searchQuery: '' };
      }
    } catch {}
    return {
      theme: 'dark',
      currentPage: 'dashboard' as Page,
      sidebarOpen: false,
      progress: {},
      bookmarks: [],
      examMode: false,
      searchQuery: '',
    };
  });

  useEffect(() => {
    try {
      localStorage.setItem('os-exam-prep-state', JSON.stringify({
        theme: state.theme,
        currentPage: state.currentPage,
        progress: state.progress,
        bookmarks: state.bookmarks,
      }));
    } catch {}
  }, [state.theme, state.currentPage, state.progress, state.bookmarks]);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', state.theme === 'dark');
  }, [state.theme]);

  const setTheme = useCallback((theme: 'dark' | 'light') => setState(s => ({ ...s, theme })), []);
  const toggleTheme = useCallback(() => setState(s => ({ ...s, theme: s.theme === 'dark' ? 'light' : 'dark' })), []);
  const navigate = useCallback((page: Page) => setState(s => ({ ...s, currentPage: page, sidebarOpen: false })), []);
  const setSidebarOpen = useCallback((open: boolean) => setState(s => ({ ...s, sidebarOpen: open })), []);
  const updateProgress = useCallback((topic: string, progress: number) => setState(s => ({ ...s, progress: { ...s.progress, [topic]: progress } })), []);
  const addBookmark = useCallback((bookmark: Bookmark) => setState(s => ({ ...s, bookmarks: [...s.bookmarks.filter(b => b.id !== bookmark.id), bookmark] })), []);
  const removeBookmark = useCallback((id: string) => setState(s => ({ ...s, bookmarks: s.bookmarks.filter(b => b.id !== id) })), []);
  const setExamMode = useCallback((on: boolean) => setState(s => ({ ...s, examMode: on })), []);
  const setSearchQuery = useCallback((q: string) => setState(s => ({ ...s, searchQuery: q })), []);

  return (
    <AppContext.Provider value={{
      ...state, setTheme, toggleTheme, navigate, setSidebarOpen,
      updateProgress, addBookmark, removeBookmark, setExamMode, setSearchQuery,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}

export type { Page, Bookmark };
