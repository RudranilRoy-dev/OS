import { useState } from 'react';
import { formulas } from '../data/examData';
import { Calculator, Copy, CheckCircle } from 'lucide-react';

export default function FormulaSheet() {
  const [copied, setCopied] = useState<string | null>(null);
  const [topic, setTopic] = useState('all');
  const topics = [...new Set(formulas.map(f => f.topic))];
  const copyFormula = (formula: string, id: string) => {
    navigator.clipboard?.writeText(formula);
    setCopied(id);
    setTimeout(() => setCopied(null), 1500);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2"><Calculator className="w-6 h-6 text-emerald-500" /> Formula Sheet</h1>
          <p className="text-sm text-slate-500 mt-1">All formulas in one place — your exam cheat sheet</p>
        </div>
        <select value={topic} onChange={e => setTopic(e.target.value)} className="text-sm px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800">
          <option value="all">All Topics</option>
          {topics.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>

      {/* Must-Memorize Formulas */}
      <div className="p-5 rounded-xl bg-gradient-to-r from-primary-500/10 to-violet-500/10 border border-primary-200/50 dark:border-primary-500/20">
        <h3 className="font-semibold text-sm mb-3 text-primary-600 dark:text-primary-400">🔥 Must-Memorize for Exam</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            { name: 'Turnaround Time', formula: 'TAT = CT − AT' },
            { name: 'Waiting Time', formula: 'WT = TAT − BT' },
            { name: 'Physical Address', formula: 'PA = (Frame# × PageSize) + Offset' },
            { name: 'Need Matrix', formula: 'Need = Max − Allocation' },
            { name: 'Total Seek', formula: 'Σ |Request[i] − Request[i−1]|' },
            { name: 'Page Fault Rate', formula: 'PFR = Faults / Total References' },
          ].map(f => (
            <div key={f.name} className="p-3 rounded-lg bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/40 flex items-center justify-between">
              <div>
                <div className="text-xs text-slate-500">{f.name}</div>
                <div className="font-mono font-bold text-sm mt-0.5">{f.formula}</div>
              </div>
              <button onClick={() => copyFormula(f.formula, f.name)} className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                {copied === f.name ? <CheckCircle className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4 text-slate-400" />}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* All Formulas by Topic */}
      {topics.filter(t => topic === 'all' || t === topic).map(topicName => (
        <div key={topicName} className="space-y-2">
          <h3 className="font-semibold text-sm flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${
              topicName === 'CPU Scheduling' ? 'bg-blue-500' :
              topicName === 'Memory Management' ? 'bg-emerald-500' :
              topicName === 'Deadlocks' ? 'bg-red-500' :
              topicName === 'Disk Scheduling' ? 'bg-amber-500' : 'bg-primary-500'
            }`} />
            {topicName}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            {formulas.filter(f => f.topic === topicName).map(f => (
              <div key={f.id} className="p-4 rounded-xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 card-hover">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-semibold text-xs">{f.name}</h4>
                  <button onClick={() => copyFormula(f.formula, f.id)} className="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                    {copied === f.id ? <CheckCircle className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
                  </button>
                </div>
                <div className="font-mono font-bold text-lg text-primary-500 dark:text-primary-400 mb-2">{f.formula}</div>
                <p className="text-xs text-slate-500">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Quick Reference Table */}
      <div className="p-5 rounded-xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60">
        <h3 className="font-semibold text-sm mb-3">📐 Address Translation Quick Reference</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="bg-slate-100 dark:bg-slate-800/70">
              <th className="px-3 py-2 text-left font-semibold">What</th>
              <th className="px-3 py-2 text-left font-semibold">Formula</th>
              <th className="px-3 py-2 text-left font-semibold">Example</th>
            </tr></thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              <tr><td className="px-3 py-2 font-medium">Number of Pages</td><td className="px-3 py-2 font-mono">⌈LA / PageSize⌉</td><td className="px-3 py-2 text-xs">32KB / 1KB = 32 pages</td></tr>
              <tr><td className="px-3 py-2 font-medium">Number of Frames</td><td className="px-3 py-2 font-mono">⌊PA / PageSize⌋</td><td className="px-3 py-2 text-xs">64KB / 1KB = 64 frames</td></tr>
              <tr><td className="px-3 py-2 font-medium">Offset Bits</td><td className="px-3 py-2 font-mono">log₂(PageSize)</td><td className="px-3 py-2 text-xs">log₂(1024) = 10 bits</td></tr>
              <tr><td className="px-3 py-2 font-medium">Page# Bits</td><td className="px-3 py-2 font-mono">LA_bits − Offset_bits</td><td className="px-3 py-2 text-xs">16 − 10 = 6 bits</td></tr>
              <tr><td className="px-3 py-2 font-medium">Physical Address</td><td className="px-3 py-2 font-mono">(Frame# × PageSize) + Offset</td><td className="px-3 py-2 text-xs">(15 × 1024) + 375 = 15735</td></tr>
              <tr><td className="px-3 py-2 font-medium">Page Table Size</td><td className="px-3 py-2 font-mono">Pages × EntrySize</td><td className="px-3 py-2 text-xs">32 × 4 bytes = 128 bytes</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
