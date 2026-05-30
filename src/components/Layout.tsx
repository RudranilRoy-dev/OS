import React, { useState } from 'react';
import { useApp, type Page } from '../context/AppContext';
import {
  LayoutDashboard, Cpu, Lock, AlertTriangle, MemoryStick, HardDrive,
  Terminal, FileQuestion, Clock, Calculator, Layers, HelpCircle,
  BookOpen, Sun, Moon, Menu, X, Search, ChevronDown, ChevronRight,
  GraduationCap, Sparkles, Target
} from 'lucide-react';

const navGroups: { label: string; items: { page: Page; label: string; icon: React.ElementType; badge?: string }[] }[] = [
  {
    label: 'Overview',
    items: [
      { page: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    ],
  },
  {
    label: 'Topics',
    items: [
      { page: 'process-management', label: 'Process Management', icon: Cpu, badge: 'HIGH' },
      { page: 'synchronization', label: 'Synchronization', icon: Lock, badge: 'HIGH' },
      { page: 'deadlocks', label: 'Deadlocks', icon: AlertTriangle, badge: 'HIGH' },
      { page: 'memory-management', label: 'Memory Management', icon: MemoryStick, badge: 'HIGH' },
      { page: 'file-io', label: 'File & I/O', icon: HardDrive },
      { page: 'system-calls', label: 'OS & System Calls', icon: Terminal },
    ],
  },
  {
    label: 'Exam Tools',
    items: [
      { page: 'pyq-dashboard', label: 'PYQ Analysis', icon: FileQuestion, badge: 'PYQ' },
      { page: 'revision', label: 'Revision Mode', icon: Clock },
      { page: 'formulas', label: 'Formula Sheet', icon: Calculator },
    ],
  },
  {
    label: 'Practice',
    items: [
      { page: 'flashcards', label: 'Flashcards', icon: Layers },
      { page: 'quiz', label: 'Quiz Mode', icon: HelpCircle },
      { page: 'exam-mode', label: 'Exam Mode', icon: BookOpen },
    ],
  },
];

const pageTitles: Record<Page, string> = {
  'dashboard': 'Dashboard',
  'process-management': 'Process Management',
  'synchronization': 'Synchronization',
  'deadlocks': 'Deadlocks',
  'memory-management': 'Memory Management',
  'file-io': 'File & I/O Management',
  'system-calls': 'OS Basics & System Calls',
  'pyq-dashboard': 'Previous Year Questions',
  'revision': 'Revision Mode',
  'formulas': 'Formula Sheet',
  'flashcards': 'Flashcards',
  'quiz': 'Quiz Mode',
  'exam-mode': 'Exam Mode',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const { theme, toggleTheme, currentPage, navigate, sidebarOpen, setSidebarOpen, searchQuery, setSearchQuery, examMode, setExamMode } = useApp();
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

  const toggleGroup = (label: string) => setCollapsed(p => ({ ...p, [label]: !p[label] }));

  if (examMode) {
    return (
      <div className="min-h-screen bg-white dark:bg-[#06080f] text-slate-900 dark:text-slate-100">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-6 border-b border-slate-200 dark:border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <GraduationCap className="w-6 h-6 text-primary-500" />
              <span className="font-semibold text-lg">Exam Mode</span>
            </div>
            <button
              onClick={() => setExamMode(false)}
              className="text-sm px-4 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
              Exit Exam Mode
            </button>
          </div>
          {children}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#06080f] text-slate-900 dark:text-slate-100 flex">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed lg:sticky top-0 left-0 z-50 h-screen w-72 bg-white dark:bg-[#0c1017] border-r border-slate-200 dark:border-slate-800/80 flex flex-col transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        {/* Logo */}
        <div className="p-5 border-b border-slate-200 dark:border-slate-800/80">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => navigate('dashboard')}>
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-lg shadow-primary-500/20">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-sm leading-tight">OS Exam Prep</h1>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">Semester IV</p>
              </div>
            </div>
            <button className="lg:hidden p-1 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800" onClick={() => setSidebarOpen(false)}>
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-3 px-3 space-y-1">
          {navGroups.map(group => (
            <div key={group.label} className="mb-2">
              <button
                onClick={() => toggleGroup(group.label)}
                className="flex items-center justify-between w-full px-2 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
              >
                {group.label}
                {collapsed[group.label] ? <ChevronRight className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
              </button>
              {!collapsed[group.label] && (
                <div className="space-y-0.5 mt-1">
                  {group.items.map(item => {
                    const Icon = item.icon;
                    const isActive = currentPage === item.page;
                    return (
                      <button
                        key={item.page}
                        onClick={() => navigate(item.page)}
                        className={`sidebar-link w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all ${isActive ? 'active' : 'text-slate-600 dark:text-slate-400'}`}
                      >
                        <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-primary-500' : ''}`} />
                        <span className="truncate flex-1 text-left">{item.label}</span>
                        {item.badge && (
                          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${
                            item.badge === 'HIGH' ? 'bg-rose-100 text-rose-600 dark:bg-rose-500/15 dark:text-rose-400' :
                            item.badge === 'PYQ' ? 'bg-amber-100 text-amber-600 dark:bg-amber-500/15 dark:text-amber-400' :
                            'bg-primary-100 text-primary-600 dark:bg-primary-500/15 dark:text-primary-400'
                          }`}>
                            {item.badge}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Bottom section */}
        <div className="p-3 border-t border-slate-200 dark:border-slate-800/80 space-y-2">
          <button
            onClick={toggleTheme}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 min-h-screen flex flex-col">
        {/* Header */}
        <header className="sticky top-0 z-30 bg-white/80 dark:bg-[#06080f]/80 glass border-b border-slate-200 dark:border-slate-800/60">
          <div className="flex items-center justify-between px-4 lg:px-6 h-14">
            <div className="flex items-center gap-3">
              <button
                className="lg:hidden p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="w-5 h-5" />
              </button>
              <div className="hidden sm:flex items-center gap-1.5 text-sm text-slate-500">
                <Sparkles className="w-3.5 h-3.5 text-primary-500" />
                <span>OS Exam Prep</span>
                <span className="text-slate-300 dark:text-slate-600">/</span>
                <span className="text-slate-900 dark:text-slate-100 font-medium">{pageTitles[currentPage]}</span>
              </div>
              <span className="sm:hidden font-semibold text-sm">{pageTitles[currentPage]}</span>
            </div>

            <div className="flex items-center gap-2">
              {/* Search */}
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search topics..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-64 pl-9 pr-4 py-1.5 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500 transition-all placeholder:text-slate-400"
                />
              </div>
              {/* Quick revision indicator */}
              <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-medium">
                <Target className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Exam in 2 days</span>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1">
          <div className="max-w-6xl mx-auto px-4 lg:px-6 py-6 animate-fade-in" key={currentPage}>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
