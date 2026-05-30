import { AppProvider, useApp } from './context/AppContext';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import ProcessManagement from './pages/ProcessManagement';
import Synchronization from './pages/Synchronization';
import Deadlocks from './pages/Deadlocks';
import MemoryManagement from './pages/MemoryManagement';
import FileIOManagement from './pages/FileIOManagement';
import SystemCalls from './pages/SystemCalls';
import PYQDashboard from './pages/PYQDashboard';
import RevisionMode from './pages/RevisionMode';
import FormulaSheet from './pages/FormulaSheet';
import Flashcards from './pages/Flashcards';
import QuizMode from './pages/QuizMode';
import { useEffect, useState } from 'react';
import { GraduationCap, Clock, BookOpen, Zap, Target, Play, X } from 'lucide-react';

function ExamModePage() {
  const { setExamMode, navigate } = useApp();
  const [started, setStarted] = useState(false);
  const [timer, setTimer] = useState(180 * 60); // 3 hours
  const [timerActive, setTimerActive] = useState(false);

  useEffect(() => {
    if (!timerActive || timer <= 0) return;
    const interval = setInterval(() => {
      setTimer(prev => {
        if (prev <= 1) { setTimerActive(false); return 0; }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [timerActive, timer]);

  const formatTime = (s: number) => {
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };

  if (!started) {
    return (
      <div className="max-w-2xl mx-auto py-12 text-center space-y-6">
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary-500 to-violet-600 flex items-center justify-center mx-auto shadow-xl shadow-primary-500/30">
          <GraduationCap className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-2xl font-bold">Exam Simulation Mode</h2>
        <p className="text-slate-500 text-sm">Simulate real exam conditions. Set your timer, hide distractions, and practice under pressure.</p>

        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="p-4 rounded-xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60">
            <Clock className="w-5 h-5 text-primary-500 mx-auto mb-2" />
            <p className="text-xs font-semibold">Timed</p>
            <p className="text-[10px] text-slate-500">3-hour exam timer</p>
          </div>
          <div className="p-4 rounded-xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60">
            <BookOpen className="w-5 h-5 text-emerald-500 mx-auto mb-2" />
            <p className="text-xs font-semibold">Focused</p>
            <p className="text-[10px] text-slate-500">No distractions</p>
          </div>
          <div className="p-4 rounded-xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60">
            <Target className="w-5 h-5 text-amber-500 mx-auto mb-2" />
            <p className="text-xs font-semibold">Score Max</p>
            <p className="text-[10px] text-slate-500">PYQ-based practice</p>
          </div>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => { setStarted(true); setTimerActive(true); setExamMode(true); }}
            className="px-8 py-3 bg-gradient-to-r from-primary-500 to-violet-600 text-white rounded-xl font-semibold shadow-xl shadow-primary-500/30 hover:shadow-2xl transition-all flex items-center gap-2 mx-auto"
          >
            <Play className="w-4 h-4" /> Start 3-Hour Exam
          </button>
          <div className="flex gap-3 justify-center">
            <button onClick={() => { setTimer(60 * 60); setStarted(true); setTimerActive(true); setExamMode(true); }} className="text-xs px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">1 Hour</button>
            <button onClick={() => { setTimer(90 * 60); setStarted(true); setTimerActive(true); setExamMode(true); }} className="text-xs px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">1.5 Hours</button>
            <button onClick={() => { setTimer(120 * 60); setStarted(true); setTimerActive(true); setExamMode(true); }} className="text-xs px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">2 Hours</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Timer Bar */}
      <div className="sticky top-0 z-50 -mx-4 lg:-mx-6 -mt-6 p-4 bg-white/90 dark:bg-[#06080f]/90 glass border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <GraduationCap className="w-5 h-5 text-primary-500" />
            <span className="font-semibold text-sm">Exam Mode</span>
          </div>
          <div className={`text-2xl font-bold font-mono ${timer < 600 ? 'text-rose-500 animate-pulse' : 'text-primary-500'}`}>
            {formatTime(timer)}
          </div>
          <button
            onClick={() => { setExamMode(false); setStarted(false); setTimerActive(false); navigate('dashboard'); }}
            className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg bg-rose-100 dark:bg-rose-500/20 text-rose-600 dark:text-rose-400 font-medium hover:bg-rose-200 dark:hover:bg-rose-500/30 transition-colors"
          >
            <X className="w-3.5 h-3.5" /> End Exam
          </button>
        </div>
        <div className="mt-2 h-1 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
          <div className={`h-full rounded-full transition-all duration-1000 ${timer < 600 ? 'bg-rose-500' : 'bg-gradient-to-r from-primary-500 to-violet-500'}`} style={{ width: `${(timer / (180 * 60)) * 100}%` }} />
        </div>
      </div>

      {/* Exam Content */}
      <div className="space-y-8">
        <div>
          <h2 className="text-xl font-bold mb-4">📝 Write answers for these questions:</h2>
          <div className="space-y-4">
            {[
              { q: 'Explain CPU scheduling algorithms (FCFS, SJF, Round Robin, Priority) with Gantt charts for the given processes.', marks: 10 },
              { q: "Using Banker's Algorithm, find if the system is in a safe state. Given: 5 processes, 3 resources, Available=[3,3,2]. Show Need matrix and safe sequence.", marks: 10 },
              { q: 'Explain the Producer-Consumer problem with a complete semaphore solution. Show the code for both Producer and Consumer.', marks: 10 },
              { q: 'Given the reference string 7,0,1,2,0,3,0,4,2,3,0,3,2,1,2,0,1,7,0,1 and 3 frames, calculate page faults using FIFO and LRU algorithms.', marks: 10 },
              { q: 'Calculate total head movement for disk scheduling: Queue=98,183,37,122,14,124,65,67, Head=53 using FCFS, SSTF, and SCAN.', marks: 10 },
              { q: 'Explain the four necessary conditions for deadlock (Coffman Conditions). How can deadlocks be prevented?', marks: 5 },
              { q: 'Differentiate between Process and Thread. Explain user-level and kernel-level threads.', marks: 5 },
              { q: 'What are System Calls? Explain five categories with examples.', marks: 5 },
              { q: 'Explain Virtual Memory, Demand Paging, and Thrashing.', marks: 5 },
              { q: 'What are the different types of Operating Systems? Explain each.', marks: 5 },
            ].map((item, i) => (
              <div key={i} className="p-4 rounded-xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60">
                <div className="flex items-start gap-3">
                  <span className="w-8 h-8 rounded-lg bg-primary-100 dark:bg-primary-500/20 text-primary-500 font-bold text-sm flex items-center justify-center flex-shrink-0">Q{i + 1}</span>
                  <div>
                    <p className="text-sm font-medium">{item.q}</p>
                    <span className="text-[10px] text-slate-400 mt-1 inline-block">{item.marks} marks</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 p-3 rounded-lg bg-primary-50 dark:bg-primary-500/10 border border-primary-200 dark:border-primary-500/20 text-sm">
            <strong>Total: 75 marks</strong> • Time: 3 hours • Attempt all questions
          </div>
        </div>

        {/* Quick Reference */}
        <div className="p-5 rounded-xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20">
          <h3 className="font-semibold text-sm mb-3 flex items-center gap-2"><Zap className="w-4 h-4 text-amber-500" /> Quick Formula Reference</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs font-mono">
            <div className="p-2 rounded bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">TAT = CT − AT</div>
            <div className="p-2 rounded bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">WT = TAT − BT</div>
            <div className="p-2 rounded bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">PA = Frame×Size + Off</div>
            <div className="p-2 rounded bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">Need = Max − Alloc</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AppContent() {
  const { currentPage } = useApp();

  const pages: Record<string, React.ReactNode> = {
    'dashboard': <Dashboard />,
    'process-management': <ProcessManagement />,
    'synchronization': <Synchronization />,
    'deadlocks': <Deadlocks />,
    'memory-management': <MemoryManagement />,
    'file-io': <FileIOManagement />,
    'system-calls': <SystemCalls />,
    'pyq-dashboard': <PYQDashboard />,
    'revision': <RevisionMode />,
    'formulas': <FormulaSheet />,
    'flashcards': <Flashcards />,
    'quiz': <QuizMode />,
    'exam-mode': <ExamModePage />,
  };

  return (
    <Layout>
      {pages[currentPage] || <Dashboard />}
    </Layout>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
