import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { revisionNotes, formulas } from '../data/examData';
import { Clock, ChevronDown, ChevronRight, Zap, Timer, Coffee, Moon } from 'lucide-react';

function Section({ title, children, defaultOpen = true }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border border-slate-200 dark:border-slate-700/60 rounded-xl overflow-hidden">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between p-4 bg-white dark:bg-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
        <h3 className="font-semibold text-sm">{title}</h3>
        {open ? <ChevronDown className="w-4 h-4 text-slate-400" /> : <ChevronRight className="w-4 h-4 text-slate-400" />}
      </button>
      {open && <div className="p-4 border-t border-slate-200 dark:border-slate-700/60 space-y-4">{children}</div>}
    </div>
  );
}

export default function RevisionMode() {
  const { setExamMode } = useApp();
  const [mode, setMode] = useState<'5min' | '15min' | '30min' | 'nightBefore'>('5min');
  const [timerRunning, setTimerRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300);

  const timeLimits: Record<string, number> = { '5min': 300, '15min': 900, '30min': 1800, 'nightBefore': 3600 };
  const formatTime = (s: number) => `${Math.floor(s / 60).toString().padStart(2, '0')}:${(s % 60).toString().padStart(2, '0')}`;

  const startTimer = () => {
    setTimeLeft(timeLimits[mode]);
    setTimerRunning(true);
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) { clearInterval(interval); setTimerRunning(false); return 0; }
        return prev - 1;
      });
    }, 1000);
  };

  const data5 = revisionNotes['5min'];
  const data15 = revisionNotes['15min'];
  const data30 = revisionNotes['30min'];
  const dataNight = revisionNotes['nightBefore'];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2"><Clock className="w-6 h-6 text-violet-500" /> Revision Mode</h1>
          <p className="text-sm text-slate-500 mt-1">Focused revision sessions with timer</p>
        </div>
        <button onClick={() => setExamMode(true)} className="text-xs px-4 py-2 rounded-lg bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold shadow-lg shadow-primary-500/25 hover:shadow-xl transition-all">
          Enter Exam Mode
        </button>
      </div>

      {/* Mode Selector */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { id: '5min' as const, label: '5 Minutes', icon: Zap, color: 'from-emerald-500 to-green-600', desc: 'Quick formulas & key facts' },
          { id: '15min' as const, label: '15 Minutes', icon: Timer, color: 'from-amber-500 to-orange-600', desc: 'Topic summaries' },
          { id: '30min' as const, label: '30 Minutes', icon: Coffee, color: 'from-violet-500 to-purple-600', desc: 'Detailed revision' },
          { id: 'nightBefore' as const, label: 'Night Before', icon: Moon, color: 'from-blue-500 to-indigo-600', desc: 'Priority-based' },
        ].map(m => (
          <button
            key={m.id}
            onClick={() => setMode(m.id)}
            className={`text-left p-4 rounded-xl border transition-all ${mode === m.id ? 'border-primary-300 dark:border-primary-500 bg-primary-50 dark:bg-primary-500/10 ring-2 ring-primary-200 dark:ring-primary-500/30' : 'border-slate-200 dark:border-slate-700/60 bg-white dark:bg-slate-800/50 hover:border-primary-200'}`}
          >
            <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${m.color} flex items-center justify-center mb-2`}>
              <m.icon className="w-4 h-4 text-white" />
            </div>
            <h4 className="font-semibold text-sm">{m.label}</h4>
            <p className="text-[10px] text-slate-500">{m.desc}</p>
          </button>
        ))}
      </div>

      {/* Timer */}
      <div className="flex items-center gap-4 p-4 rounded-xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60">
        <div className="text-3xl font-bold font-mono text-primary-500">{formatTime(timeLeft)}</div>
        <button
          onClick={startTimer}
          disabled={timerRunning}
          className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${timerRunning ? 'bg-slate-100 dark:bg-slate-700 text-slate-400 cursor-not-allowed' : 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/25 hover:shadow-xl'}`}
        >
          {timerRunning ? 'Running...' : 'Start Timer'}
        </button>
        {timeLeft === 0 && timerRunning === false && timeLeft !== timeLimits[mode] && (
          <span className="text-sm font-semibold text-emerald-500">⏰ Time's up! Take a break.</span>
        )}
      </div>

      {/* 5-Minute Mode */}
      {mode === '5min' && (
        <div className="space-y-4 animate-fade-in">
          <h2 className="text-lg font-bold">{data5.title}</h2>
          {data5.items.map(item => (
            <Section key={item.heading} title={item.heading}>
              <ul className="space-y-2">
                {item.points.map((p, i) => (
                  <li key={i} className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700/40 text-sm font-mono">{p}</li>
                ))}
              </ul>
            </Section>
          ))}

          {/* Quick Formulas */}
          <Section title="All Key Formulas">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {formulas.filter(f => ['CPU Scheduling', 'Memory Management', 'Deadlocks'].includes(f.topic)).map(f => (
                <div key={f.id} className="p-3 rounded-lg bg-primary-50 dark:bg-primary-500/10 border border-primary-200 dark:border-primary-500/20">
                  <div className="text-xs text-slate-500 mb-1">{f.name}</div>
                  <div className="font-mono font-bold text-sm">{f.formula}</div>
                  <div className="text-[10px] text-slate-500 mt-1">{f.description}</div>
                </div>
              ))}
            </div>
          </Section>
        </div>
      )}

      {/* 15-Minute Mode */}
      {mode === '15min' && (
        <div className="space-y-4 animate-fade-in">
          <h2 className="text-lg font-bold">{data15.title}</h2>
          {data15.sections.map(sec => (
            <Section key={sec.title} title={sec.title}>
              <ul className="space-y-2">
                {sec.points.map((p, i) => (
                  <li key={i} className="text-sm text-slate-600 dark:text-slate-400 flex gap-2">
                    <span className="text-primary-500 flex-shrink-0">•</span>{p}
                  </li>
                ))}
              </ul>
            </Section>
          ))}
        </div>
      )}

      {/* 30-Minute Mode */}
      {mode === '30min' && (
        <div className="space-y-4 animate-fade-in">
          <h2 className="text-lg font-bold">{data30.title}</h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">{data30.note}</p>

          <Section title="Step 1: Review All Formulas">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {formulas.map(f => (
                <div key={f.id} className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700/40">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-primary-500 font-semibold">{f.topic}</span>
                    <span className="text-xs text-slate-500">{f.name}</span>
                  </div>
                  <div className="font-mono font-bold mt-1">{f.formula}</div>
                  <div className="text-[10px] text-slate-500 mt-1">{f.description}</div>
                </div>
              ))}
            </div>
          </Section>

          <Section title="Step 2: Practice Key Numericals" defaultOpen={false}>
            <div className="space-y-3 text-sm">
              <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700/40">
                <strong>CPU Scheduling:</strong> P1(AT=0,BT=6), P2(AT=2,BT=4), P3(AT=4,BT=1), P4(AT=6,BT=3). Solve using FCFS and SJF.
              </div>
              <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700/40">
                <strong>Round Robin:</strong> Same processes, TQ=2. Draw Gantt chart, calculate Avg WT.
              </div>
              <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700/40">
                <strong>Banker's:</strong> 5 processes, 3 resources. Find safe sequence for given Available, Allocation, Max.
              </div>
              <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700/40">
                <strong>Page Replacement:</strong> Ref: 7,0,1,2,0,3,0,4,2,3 with 3 frames. Solve FIFO and LRU.
              </div>
              <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700/40">
                <strong>Disk Scheduling:</strong> Queue: 98,183,37,122,14,124,65,67, Head=53. Calculate total seek for FCFS, SSTF, SCAN.
              </div>
            </div>
          </Section>

          <Section title="Step 3: Review Theory Answers" defaultOpen={false}>
            <div className="space-y-2 text-sm">
              {[
                'Process vs Thread (comparison table)',
                '5 Process States with diagram',
                'Critical Section Problem: 3 requirements',
                'Peterson\'s Solution with code',
                'Producer-Consumer semaphore solution',
                '4 Coffman Conditions for Deadlock',
                'Deadlock Prevention vs Avoidance',
                'Paging and Address Translation',
                'Virtual Memory and Thrashing',
                '5 Types of Operating Systems',
                '5 Categories of System Calls with examples',
              ].map((q, i) => (
                <div key={i} className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700/40 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-primary-100 dark:bg-primary-500/20 text-primary-500 text-xs font-bold flex items-center justify-center flex-shrink-0">{i + 1}</span>
                  <span>{q}</span>
                </div>
              ))}
            </div>
          </Section>
        </div>
      )}

      {/* Night Before Mode */}
      {mode === 'nightBefore' && (
        <div className="space-y-4 animate-fade-in">
          <h2 className="text-lg font-bold">{dataNight.title}</h2>
          <div className="p-4 rounded-xl bg-gradient-to-r from-violet-500/10 to-indigo-500/10 border border-violet-200/50 dark:border-violet-500/20">
            <p className="text-sm text-slate-600 dark:text-slate-300 mb-3">Focus on these topics in order of priority. Each topic shows expected marks:</p>
            <div className="space-y-2">
              {dataNight.priorities.map((p, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/40">
                  <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold ${i < 3 ? 'bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-400' : i < 6 ? 'bg-amber-100 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400' : 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300'}`}>
                    {i + 1}
                  </span>
                  <span className="text-sm flex-1">{p}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
