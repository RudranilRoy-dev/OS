import { useState } from 'react';
import { pyqData, topicAnalysis } from '../data/examData';
import { FileQuestion, TrendingUp, BarChart3, Filter } from 'lucide-react';

export default function PYQDashboard() {
  const [filter, setFilter] = useState<'all' | 'numerical' | 'theory' | 'short' | 'long'>('all');
  const [topicFilter, setTopicFilter] = useState('all');

  const topics = [...new Set(pyqData.map(p => p.topic))];
  const filtered = pyqData.filter(p => {
    if (filter !== 'all' && p.type !== filter) return false;
    if (topicFilter !== 'all' && p.topic !== topicFilter) return false;
    return true;
  });

  const totalMarks = filtered.reduce((s, p) => s + p.marks, 0);
  const numericalCount = filtered.filter(p => p.type === 'numerical').length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2"><FileQuestion className="w-6 h-6 text-primary-500" /> Previous Year Questions</h1>
        <p className="text-sm text-slate-500 mt-1">Analyze patterns, identify high-weightage topics, prepare strategically</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="p-4 rounded-xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60">
          <p className="text-2xl font-bold text-primary-500">{pyqData.length}</p>
          <p className="text-xs text-slate-500">Total Questions</p>
        </div>
        <div className="p-4 rounded-xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60">
          <p className="text-2xl font-bold text-amber-500">{pyqData.reduce((s, p) => s + p.marks, 0)}</p>
          <p className="text-xs text-slate-500">Total Marks</p>
        </div>
        <div className="p-4 rounded-xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60">
          <p className="text-2xl font-bold text-emerald-500">{pyqData.filter(p => p.type === 'numerical').length}</p>
          <p className="text-xs text-slate-500">Numerical Problems</p>
        </div>
        <div className="p-4 rounded-xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60">
          <p className="text-2xl font-bold text-rose-500">{topicAnalysis.filter(t => t.importance === 'Critical').length}</p>
          <p className="text-xs text-slate-500">Critical Topics</p>
        </div>
      </div>

      {/* Topic Frequency Chart */}
      <div className="p-5 rounded-xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60">
        <div className="flex items-center gap-2 mb-4">
          <BarChart3 className="w-5 h-5 text-primary-500" />
          <h3 className="font-semibold">Topic Frequency & Marks Distribution</h3>
        </div>
        <div className="space-y-3">
          {topicAnalysis.map(t => (
            <div key={t.topic} className="flex items-center gap-3">
              <span className="text-xs w-40 truncate font-medium">{t.topic}</span>
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-3 bg-slate-100 dark:bg-slate-700/50 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${t.importance === 'Critical' ? 'bg-gradient-to-r from-red-500 to-rose-500' : t.importance === 'High' ? 'bg-gradient-to-r from-amber-500 to-orange-500' : 'bg-gradient-to-r from-primary-400 to-violet-400'}`}
                      style={{ width: `${(t.frequency / 20) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs text-slate-500 w-20">Freq: {t.frequency}</span>
                  <span className="text-xs text-slate-500 w-20">~{t.marks} marks</span>
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${t.importance === 'Critical' ? 'bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-400' : t.importance === 'High' ? 'bg-amber-100 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400' : 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300'}`}>
                    {t.importance}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Study Strategy */}
      <div className="p-5 rounded-xl bg-gradient-to-r from-primary-500/10 to-violet-500/10 border border-primary-200/50 dark:border-primary-500/20">
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp className="w-5 h-5 text-primary-500" />
          <h3 className="font-semibold">Recommended Study Strategy</h3>
        </div>
        <div className="space-y-2 text-sm">
          <div className="p-3 rounded-lg bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20">
            <strong className="text-red-600 dark:text-red-400">🔴 Day 1 Morning:</strong> CPU Scheduling numericals (FCFS, SJF, RR) + Banker's Algorithm
          </div>
          <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20">
            <strong className="text-amber-600 dark:text-amber-400">🟡 Day 1 Afternoon:</strong> Producer-Consumer + Readers-Writers + Dining Philosophers solutions
          </div>
          <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20">
            <strong className="text-emerald-600 dark:text-emerald-400">🟢 Day 1 Evening:</strong> Page Replacement (FIFO, LRU) + Disk Scheduling numericals
          </div>
          <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20">
            <strong className="text-blue-600 dark:text-blue-400">🔵 Day 2:</strong> Theory revision (OS types, System calls, Deadlock conditions, Virtual Memory) + Mock tests
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 items-center">
        <Filter className="w-4 h-4 text-slate-400" />
        <select value={filter} onChange={e => setFilter(e.target.value as any)} className="text-sm px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800">
          <option value="all">All Types</option>
          <option value="numerical">Numerical</option>
          <option value="long">Long Answer</option>
          <option value="short">Short Answer</option>
        </select>
        <select value={topicFilter} onChange={e => setTopicFilter(e.target.value)} className="text-sm px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800">
          <option value="all">All Topics</option>
          {topics.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
        <span className="text-xs text-slate-500">{filtered.length} questions • {totalMarks} marks • {numericalCount} numerical</span>
      </div>

      {/* Questions List */}
      <div className="space-y-3">
        {filtered.map(q => (
          <div key={q.id} className="p-4 rounded-xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${q.type === 'numerical' ? 'bg-amber-100 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400' : q.type === 'long' ? 'bg-rose-100 text-rose-600 dark:bg-rose-500/20 dark:text-rose-400' : 'bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400'}`}>
                {q.type.toUpperCase()} • {q.marks} marks
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400">{q.year}</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400">{q.topic}</span>
              {q.frequency >= 4 && <span className="text-[10px] px-2 py-0.5 rounded bg-rose-100 text-rose-600 dark:bg-rose-500/20 dark:text-rose-400 font-bold">🔥 ×{q.frequency}</span>}
            </div>
            <p className="text-sm font-medium">{q.question}</p>
            {q.keyPoints && (
              <div className="mt-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700/40">
                <p className="text-xs font-semibold mb-1">Key Points to Include in Answer:</p>
                <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-0.5">
                  {q.keyPoints.map((p, i) => <li key={i}>• {p}</li>)}
                </ul>
              </div>
            )}
            {q.commonMistakes && (
              <div className="mt-2 p-3 rounded-lg bg-rose-50 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-500/20">
                <p className="text-xs font-semibold text-rose-600 dark:text-rose-400 mb-1">⚠️ Common Mistakes:</p>
                <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-0.5">
                  {q.commonMistakes.map((m, i) => <li key={i}>• {m}</li>)}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
