import React, { useState } from 'react';

/* ─────────── CPU SCHEDULING CALCULATOR ─────────── */
interface Process {
  id: number;
  at: number;
  bt: number;
  priority: number;
  ct?: number;
  tat?: number;
  wt?: number;
}

function calcFCFS(procs: Process[]): { scheduled: Process[]; gantt: { id: number; start: number; end: number }[] } {
  const sorted = [...procs].sort((a, b) => a.at - b.at || a.id - b.id);
  const gantt: { id: number; start: number; end: number }[] = [];
  let time = 0;
  const scheduled = sorted.map(p => {
    const start = Math.max(time, p.at);
    const end = start + p.bt;
    time = end;
    gantt.push({ id: p.id, start, end });
    return { ...p, ct: end, tat: end - p.at, wt: start - p.at };
  });
  return { scheduled, gantt };
}

function calcSJF(procs: Process[]): { scheduled: Process[]; gantt: { id: number; start: number; end: number }[] } {
  const n = procs.length;
  const remaining = procs.map(p => ({ ...p, remaining: p.bt }));
  const completed: Process[] = [];
  const gantt: { id: number; start: number; end: number }[] = [];
  let time = 0;
  while (completed.length < n) {
    const available = remaining.filter(p => p.remaining > 0 && p.at <= time);
    if (available.length === 0) { time++; continue; }
    available.sort((a, b) => a.remaining - b.remaining || a.at - b.at);
    const p = available[0];
    const start = time;
    const end = time + p.remaining;
    gantt.push({ id: p.id, start, end });
    p.remaining = 0;
    completed.push({ ...p, ct: end, tat: end - p.at, wt: (start) - p.at });
    time = end;
  }
  return { scheduled: completed.sort((a, b) => a.id - b.id), gantt };
}

function calcRR(procs: Process[], quantum: number): { scheduled: Process[]; gantt: { id: number; start: number; end: number }[] } {
  const sorted = [...procs].sort((a, b) => a.at - b.at || a.id - b.id);
  const remaining = sorted.map(p => ({ ...p, rem: p.bt }));
  const gantt: { id: number; start: number; end: number }[] = [];
  const queue: number[] = [];
  const visited = new Set<number>();
  let time = 0;
  let idx = 0;
  while (idx < sorted.length && sorted[idx].at <= time) { queue.push(idx); visited.add(idx); idx++; }
  if (queue.length === 0 && idx < sorted.length) { time = sorted[idx].at; queue.push(idx); visited.add(idx); idx++; }
  while (queue.length > 0) {
    const ci = queue.shift()!;
    const p = remaining[ci];
    const exec = Math.min(quantum, p.rem);
    gantt.push({ id: p.id, start: time, end: time + exec });
    p.rem -= exec;
    time += exec;
    while (idx < sorted.length && sorted[idx].at <= time) { if (!visited.has(idx)) { queue.push(idx); visited.add(idx); } idx++; }
    if (p.rem > 0) queue.push(ci);
    if (queue.length === 0 && idx < sorted.length) {
      time = sorted[idx].at;
      while (idx < sorted.length && sorted[idx].at <= time) { if (!visited.has(idx)) { queue.push(idx); visited.add(idx); } idx++; }
    }
  }
  const scheduled = remaining.map((p, i) => {
    const last = gantt.filter(g => g.id === p.id).pop()!;
    return { ...sorted[i], ct: last.end, tat: last.end - sorted[i].at, wt: last.end - sorted[i].at - sorted[i].bt };
  });
  return { scheduled, gantt };
}

function calcPriority(procs: Process[]): { scheduled: Process[]; gantt: { id: number; start: number; end: number }[] } {
  const n = procs.length;
  const remaining = procs.map(p => ({ ...p, remaining: p.bt }));
  const completed: Process[] = [];
  const gantt: { id: number; start: number; end: number }[] = [];
  let time = 0;
  while (completed.length < n) {
    const available = remaining.filter(p => p.remaining > 0 && p.at <= time);
    if (available.length === 0) { time++; continue; }
    available.sort((a, b) => a.priority - b.priority || a.at - b.at);
    const p = available[0];
    const start = time;
    const end = time + p.remaining;
    gantt.push({ id: p.id, start, end });
    p.remaining = 0;
    completed.push({ ...p, ct: end, tat: end - p.at, wt: start - p.at });
    time = end;
  }
  return { scheduled: completed.sort((a, b) => a.id - b.id), gantt };
}

const COLORS = ['bg-indigo-500', 'bg-violet-500', 'bg-emerald-500', 'bg-amber-500', 'bg-rose-500', 'bg-cyan-500', 'bg-orange-500', 'bg-pink-500', 'bg-teal-500', 'bg-blue-500'];
export function CPUScheduler() {
  const [numProcs, setNumProcs] = useState(4);
  const [algorithm, setAlgorithm] = useState<'fcfs' | 'sjf' | 'rr' | 'priority'>('fcfs');
  const [quantum, setQuantum] = useState(2);
  const [processes, setProcesses] = useState<Process[]>([
    { id: 1, at: 0, bt: 6, priority: 3 },
    { id: 2, at: 1, bt: 4, priority: 1 },
    { id: 3, at: 2, bt: 2, priority: 4 },
    { id: 4, at: 3, bt: 3, priority: 2 },
  ]);
  const [result, setResult] = useState<{ scheduled: Process[]; gantt: { id: number; start: number; end: number }[] } | null>(null);

  const updateProc = (idx: number, field: keyof Process, val: number) => {
    setProcesses(prev => { const n = [...prev]; (n[idx] as any)[field] = val; return n; });
  };

  const solve = () => {
    const p = processes.slice(0, numProcs);
    let r;
    switch (algorithm) {
      case 'fcfs': r = calcFCFS(p); break;
      case 'sjf': r = calcSJF(p); break;
      case 'rr': r = calcRR(p, quantum); break;
      case 'priority': r = calcPriority(p); break;
    }
    setResult(r);
  };

  const avgTAT = result ? result.scheduled.reduce((s, p) => s + (p.tat || 0), 0) / result.scheduled.length : 0;
  const avgWT = result ? result.scheduled.reduce((s, p) => s + (p.wt || 0), 0) / result.scheduled.length : 0;
  const totalTime = result ? result.gantt[result.gantt.length - 1]?.end || 0 : 0;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-3">
          <div className="flex gap-3">
            <label className="text-sm font-medium text-slate-600 dark:text-slate-300">Processes:</label>
            <select value={numProcs} onChange={e => { const n = +e.target.value; setNumProcs(n); setProcesses(prev => { while (prev.length < n) prev.push({ id: prev.length + 1, at: 0, bt: 1, priority: 1 }); return prev.slice(0, n); }); }} className="px-2 py-1 rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-sm">
              {[1,2,3,4,5,6,7,8].map(n => <option key={n} value={n}>{n}</option>)}
            </select>
            <label className="text-sm font-medium text-slate-600 dark:text-slate-300 ml-4">Algorithm:</label>
            <select value={algorithm} onChange={e => setAlgorithm(e.target.value as any)} className="px-2 py-1 rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-sm">
              <option value="fcfs">FCFS</option>
              <option value="sjf">SJF (Non-Preemptive)</option>
              <option value="rr">Round Robin</option>
              <option value="priority">Priority</option>
            </select>
          </div>
          {algorithm === 'rr' && (
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-slate-600 dark:text-slate-300">Time Quantum:</label>
              <input type="number" min={1} value={quantum} onChange={e => setQuantum(+e.target.value)} className="w-16 px-2 py-1 rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-sm" />
            </div>
          )}
        </div>
      </div>

      {/* Process input table */}
      <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700">
        <table className="w-full text-sm">
          <thead className="bg-slate-100 dark:bg-slate-800/50">
            <tr>
              <th className="px-4 py-2 text-left font-semibold">Process</th>
              <th className="px-4 py-2 text-center font-semibold">Arrival Time</th>
              <th className="px-4 py-2 text-center font-semibold">Burst Time</th>
              {algorithm === 'priority' && <th className="px-4 py-2 text-center font-semibold">Priority (lower=higher)</th>}
            </tr>
          </thead>
          <tbody>
            {processes.slice(0, numProcs).map((p, i) => (
              <tr key={p.id} className="border-t border-slate-100 dark:border-slate-800">
                <td className="px-4 py-2 font-medium">P{p.id}</td>
                <td className="px-4 py-2"><input type="number" min={0} value={p.at} onChange={e => updateProc(i, 'at', +e.target.value)} className="w-16 text-center px-2 py-1 rounded border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-sm" /></td>
                <td className="px-4 py-2"><input type="number" min={1} value={p.bt} onChange={e => updateProc(i, 'bt', +e.target.value)} className="w-16 text-center px-2 py-1 rounded border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-sm" /></td>
                {algorithm === 'priority' && <td className="px-4 py-2"><input type="number" min={1} value={p.priority} onChange={e => updateProc(i, 'priority', +e.target.value)} className="w-16 text-center px-2 py-1 rounded border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-sm" /></td>}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button onClick={solve} className="px-6 py-2.5 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white rounded-xl font-semibold text-sm shadow-lg shadow-primary-500/25 transition-all hover:shadow-xl hover:shadow-primary-500/30 active:scale-[0.98]">
        Solve & Generate Gantt Chart
      </button>

      {result && (
        <div className="space-y-6 animate-fade-in">
          {/* Gantt Chart */}
          <div className="p-4 rounded-xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
            <h4 className="text-sm font-semibold mb-3 text-slate-600 dark:text-slate-300">Gantt Chart</h4>
            <div className="flex items-end gap-0.5 overflow-x-auto pb-6">
              {/* Time markers on top */}
              <div className="flex flex-col">
                <div className="flex h-10">
                  {result.gantt.map((g, i) => (
                    <div key={i} className={`gantt-bar relative flex items-center justify-center text-white text-xs font-bold rounded-md ${COLORS[g.id % COLORS.length]}`} style={{ width: `${Math.max(g.end - g.start, 1) * 48}px`, minWidth: '32px' }}>
                      P{g.id}
                    </div>
                  ))}
                </div>
                <div className="flex text-[10px] text-slate-500 dark:text-slate-400 mt-1">
                  {result.gantt.map((g, i) => (
                    <React.Fragment key={i}>
                      <span style={{ width: `${Math.max(g.end - g.start, 1) * 48}px`, minWidth: '32px' }} className="text-left pl-1">{g.start}</span>
                    </React.Fragment>
                  ))}
                  <span className="pl-1">{totalTime}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Results table */}
          <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700">
            <table className="w-full text-sm">
              <thead className="bg-slate-100 dark:bg-slate-800/50">
                <tr>
                  <th className="px-4 py-2 text-left font-semibold">Process</th>
                  <th className="px-4 py-2 text-center font-semibold">AT</th>
                  <th className="px-4 py-2 text-center font-semibold">BT</th>
                  <th className="px-4 py-2 text-center font-semibold">CT</th>
                  <th className="px-4 py-2 text-center font-semibold">TAT</th>
                  <th className="px-4 py-2 text-center font-semibold">WT</th>
                </tr>
              </thead>
              <tbody>
                {result.scheduled.map(p => (
                  <tr key={p.id} className="border-t border-slate-100 dark:border-slate-800">
                    <td className="px-4 py-2 font-medium">P{p.id}</td>
                    <td className="px-4 py-2 text-center">{p.at}</td>
                    <td className="px-4 py-2 text-center">{p.bt}</td>
                    <td className="px-4 py-2 text-center">{p.ct}</td>
                    <td className="px-4 py-2 text-center">{p.tat}</td>
                    <td className="px-4 py-2 text-center">{p.wt}</td>
                  </tr>
                ))}
                <tr className="border-t-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/30 font-semibold">
                  <td className="px-4 py-2" colSpan={4}>Average</td>
                  <td className="px-4 py-2 text-center">{avgTAT.toFixed(2)}</td>
                  <td className="px-4 py-2 text-center">{avgWT.toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="p-4 rounded-xl bg-primary-50 dark:bg-primary-500/10 border border-primary-200 dark:border-primary-500/20">
            <p className="text-sm"><strong>Formulas:</strong> TAT = CT − AT &nbsp;|&nbsp; WT = TAT − BT</p>
            <p className="text-sm mt-1">Average TAT = {avgTAT.toFixed(2)} &nbsp;|&nbsp; Average WT = {avgWT.toFixed(2)}</p>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─────────── BANKER'S ALGORITHM SOLVER ─────────── */
export function BankersAlgorithm() {
  const [nP, setNP] = useState(5);
  const [nR, setNR] = useState(3);
  const [available, setAvailable] = useState([3, 3, 2]);
  const [allocation, setAllocation] = useState([[0,1,0],[2,0,0],[3,0,2],[2,1,1],[0,0,2]]);
  const [max, setMax] = useState([[7,5,3],[3,2,2],[9,0,2],[2,2,2],[4,3,3]]);
  const [result, setResult] = useState<{ need: number[][]; safeSeq: number[]; steps: string[][]; isSafe: boolean } | null>(null);

  const solve = () => {
    const need = max.map((row, i) => row.map((m, j) => m - allocation[i][j]));
    const work = [...available];
    const finish = new Array(nP).fill(false);
    const safeSeq: number[] = [];
    const steps: string[][] = [];

    let count = 0;
    while (count < nP) {
      let found = false;
      for (let i = 0; i < nP; i++) {
        if (finish[i]) continue;
        const canAllocate = need[i].every((n, j) => n <= work[j]);
        if (canAllocate) {
          const stepWork = [...work];
          for (let j = 0; j < nR; j++) work[j] += allocation[i][j];
          finish[i] = true;
          safeSeq.push(i);
          count++;
          found = true;
          steps.push([`P${i}`, `Work was: [${stepWork}]`, `Need[${i}] ≤ Available? ✓`, `Work = [${stepWork}] + Alloc[${i}] = [${work}]`, `Safe so far: ${safeSeq.map(p => `P${p}`).join(' → ')}`]);
        }
      }
      if (!found) break;
    }

    setResult({ need, safeSeq, steps, isSafe: count === nP });
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-4">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-slate-600 dark:text-slate-300">Processes:</label>
          <select value={nP} onChange={e => { const n = +e.target.value; setNP(n); setAllocation(Array.from({length:n},() => Array(nR).fill(0))); setMax(Array.from({length:n},() => Array(nR).fill(0))); }} className="px-2 py-1 rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-sm">
            {[2,3,4,5,6,7,8].map(n => <option key={n} value={n}>{n}</option>)}
          </select>
        </div>
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-slate-600 dark:text-slate-300">Resources:</label>
          <select value={nR} onChange={e => { const n = +e.target.value; setNR(n); setAvailable(Array(n).fill(0)); setAllocation(Array.from({length:nP},() => Array(n).fill(0))); setMax(Array.from({length:nP},() => Array(n).fill(0))); }} className="px-2 py-1 rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-sm">
            {[2,3,4,5].map(n => <option key={n} value={n}>{n}</option>)}
          </select>
        </div>
      </div>

      {/* Available */}
      <div>
        <h4 className="text-sm font-semibold mb-2 text-slate-600 dark:text-slate-300">Available Resources</h4>
        <div className="flex gap-2">
          {available.map((v, j) => (
            <input key={j} type="number" min={0} value={v} onChange={e => { const na = [...available]; na[j] = +e.target.value; setAvailable(na); }} className="w-16 text-center px-2 py-1.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-sm" />
          ))}
        </div>
      </div>

      {/* Allocation and Max */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h4 className="text-sm font-semibold mb-2 text-slate-600 dark:text-slate-300">Allocation Matrix</h4>
          <div className="space-y-1">
            {allocation.map((row, i) => (
              <div key={i} className="flex gap-1 items-center">
                <span className="text-xs font-medium w-8 text-slate-500">P{i}</span>
                {row.map((v, j) => (
                  <input key={j} type="number" min={0} value={v} onChange={e => { const na = [...allocation]; na[i] = [...na[i]]; na[i][j] = +e.target.value; setAllocation(na); }} className="w-14 text-center px-1 py-1 rounded border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-sm" />
                ))}
              </div>
            ))}
          </div>
        </div>
        <div>
          <h4 className="text-sm font-semibold mb-2 text-slate-600 dark:text-slate-300">Max Matrix</h4>
          <div className="space-y-1">
            {max.map((row, i) => (
              <div key={i} className="flex gap-1 items-center">
                <span className="text-xs font-medium w-8 text-slate-500">P{i}</span>
                {row.map((v, j) => (
                  <input key={j} type="number" min={0} value={v} onChange={e => { const nm = [...max]; nm[i] = [...nm[i]]; nm[i][j] = +e.target.value; setMax(nm); }} className="w-14 text-center px-1 py-1 rounded border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-sm" />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <button onClick={solve} className="px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white rounded-xl font-semibold text-sm shadow-lg shadow-emerald-500/25 transition-all hover:shadow-xl active:scale-[0.98]">
        Find Safe Sequence
      </button>

      {result && (
        <div className="space-y-4 animate-fade-in">
          {/* Need Matrix */}
          <div className="p-4 rounded-xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
            <h4 className="text-sm font-semibold mb-2">Need Matrix (Max − Allocation)</h4>
            <div className="space-y-1">
              {result.need.map((row, i) => (
                <div key={i} className="flex gap-1 items-center">
                  <span className="text-xs font-medium w-8 text-slate-500">P{i}</span>
                  <div className="flex gap-1">
                    {row.map((v, j) => (
                      <span key={j} className="w-14 text-center px-1 py-1 rounded bg-slate-100 dark:bg-slate-700 text-sm font-mono">{v}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Result */}
          <div className={`p-4 rounded-xl border ${result.isSafe ? 'bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/20' : 'bg-rose-50 dark:bg-rose-500/10 border-rose-200 dark:border-rose-500/20'}`}>
            <h4 className={`text-lg font-bold ${result.isSafe ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
              {result.isSafe ? '✓ System is in SAFE STATE' : '✗ System is in UNSAFE STATE'}
            </h4>
            {result.isSafe && (
              <p className="mt-2 text-sm font-semibold">
                Safe Sequence: {result.safeSeq.map(p => `P${p}`).join(' → ')}
              </p>
            )}
          </div>

          {/* Steps */}
          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-slate-600 dark:text-slate-300">Step-by-Step Execution</h4>
            {result.steps.map((step, i) => (
              <div key={i} className="p-3 rounded-lg bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-sm space-y-1">
                <p className="font-semibold text-primary-500">Step {i + 1}: Execute {step[0]}</p>
                {step.slice(1).map((s, j) => (
                  <p key={j} className="text-slate-600 dark:text-slate-400 pl-4">{s}</p>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ─────────── PAGE REPLACEMENT SIMULATOR ─────────── */
export function PageReplacement() {
  const [refStr, setRefStr] = useState('7,0,1,2,0,3,0,4,2,3,0,3,2,1,2,0,1,7,0,1');
  const [frames, setFrames] = useState(3);
  const [algo, setAlgo] = useState<'fifo' | 'lru' | 'optimal'>('fifo');
  const [result, setResult] = useState<{ steps: { ref: number; frames: (number | null)[]; fault: boolean; replaced?: number }[]; faults: number; hits: number } | null>(null);

  const solve = () => {
    const refs = refStr.split(',').map(s => parseInt(s.trim())).filter(n => !isNaN(n));
    const f: (number | null)[] = Array(frames).fill(null);
    const steps: typeof result extends null ? never : NonNullable<typeof result>['steps'] = [];
    let faults = 0;

    if (algo === 'fifo') {
      let pointer = 0;
      const present = new Map<number, number>();
      for (const ref of refs) {
        const fault = !present.has(ref);
        let replaced: number | undefined;
        if (fault) {
          if (f[pointer] !== null) {
            replaced = f[pointer]!;
            present.delete(replaced);
          }
          present.set(ref, pointer);
          f[pointer] = ref;
          pointer = (pointer + 1) % frames;
          faults++;
        }
        steps.push({ ref, frames: [...f], fault, replaced });
      }
    } else if (algo === 'lru') {
      const lastUsed = new Map<number, number>();
      for (let t = 0; t < refs.length; t++) {
        const ref = refs[t];
        lastUsed.set(ref, t);
        const fault = !f.includes(ref);
        let replaced: number | undefined;
        if (fault) {
          let lruIdx = 0;
          let lruTime = Infinity;
          for (let i = 0; i < frames; i++) {
            if (f[i] === null) { lruIdx = i; break; }
            const lu = lastUsed.get(f[i]!) ?? -1;
            if (lu < lruTime) { lruTime = lu; lruIdx = i; }
          }
          replaced = f[lruIdx] ?? undefined;
          f[lruIdx] = ref;
          faults++;
        }
        steps.push({ ref, frames: [...f], fault, replaced });
      }
    } else {
      for (let t = 0; t < refs.length; t++) {
        const ref = refs[t];
        const fault = !f.includes(ref);
        let replaced: number | undefined;
        if (fault) {
          let optIdx = 0;
          let farthest = -1;
          for (let i = 0; i < frames; i++) {
            if (f[i] === null) { optIdx = i; break; }
            const nextUse = refs.slice(t + 1).indexOf(f[i]!);
            if (nextUse === -1) { optIdx = i; break; }
            if (nextUse > farthest) { farthest = nextUse; optIdx = i; }
          }
          replaced = f[optIdx] ?? undefined;
          f[optIdx] = ref;
          faults++;
        }
        steps.push({ ref, frames: [...f], fault, replaced });
      }
    }

    setResult({ steps, faults, hits: refs.length - faults });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-4 items-end">
        <div>
          <label className="text-sm font-medium text-slate-600 dark:text-slate-300 block mb-1">Reference String (comma-separated)</label>
          <input type="text" value={refStr} onChange={e => setRefStr(e.target.value)} className="w-80 px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-sm font-mono" />
        </div>
        <div>
          <label className="text-sm font-medium text-slate-600 dark:text-slate-300 block mb-1">Frames</label>
          <input type="number" min={1} max={10} value={frames} onChange={e => setFrames(+e.target.value)} className="w-20 px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-sm text-center" />
        </div>
        <div>
          <label className="text-sm font-medium text-slate-600 dark:text-slate-300 block mb-1">Algorithm</label>
          <select value={algo} onChange={e => setAlgo(e.target.value as any)} className="px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-sm">
            <option value="fifo">FIFO</option>
            <option value="lru">LRU</option>
            <option value="optimal">Optimal</option>
          </select>
        </div>
        <button onClick={solve} className="px-5 py-2 bg-gradient-to-r from-violet-500 to-violet-600 text-white rounded-xl font-semibold text-sm shadow-lg shadow-violet-500/25 transition-all hover:shadow-xl active:scale-[0.98]">
          Simulate
        </button>
      </div>

      {result && (
        <div className="space-y-4 animate-fade-in">
          <div className="flex gap-4">
            <div className="px-4 py-2 rounded-lg bg-rose-50 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-500/20">
              <span className="text-sm font-semibold text-rose-600 dark:text-rose-400">Page Faults: {result.faults}</span>
            </div>
            <div className="px-4 py-2 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20">
              <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">Hits: {result.hits}</span>
            </div>
            <div className="px-4 py-2 rounded-lg bg-primary-50 dark:bg-primary-500/10 border border-primary-200 dark:border-primary-500/20">
              <span className="text-sm font-semibold text-primary-600 dark:text-primary-400">Hit Ratio: {(result.hits / result.steps.length * 100).toFixed(1)}%</span>
            </div>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700">
            <table className="w-full text-sm">
              <thead className="bg-slate-100 dark:bg-slate-800/50">
                <tr>
                  <th className="px-3 py-2 text-center font-semibold">Step</th>
                  <th className="px-3 py-2 text-center font-semibold">Reference</th>
                  {Array.from({ length: frames }).map((_, i) => (
                    <th key={i} className="px-3 py-2 text-center font-semibold">Frame {i}</th>
                  ))}
                  <th className="px-3 py-2 text-center font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {result.steps.map((step, i) => (
                  <tr key={i} className={`border-t ${step.fault ? 'bg-rose-50/50 dark:bg-rose-500/5' : 'bg-emerald-50/50 dark:bg-emerald-500/5'}`}>
                    <td className="px-3 py-1.5 text-center text-slate-500">{i + 1}</td>
                    <td className="px-3 py-1.5 text-center font-bold font-mono">{step.ref}</td>
                    {step.frames.map((f, j) => (
                      <td key={j} className="px-3 py-1.5 text-center font-mono">
                        {f !== null ? (
                          <span className={step.fault && f === step.ref ? 'text-primary-500 font-bold' : ''}>{f}</span>
                        ) : (
                          <span className="text-slate-300 dark:text-slate-600">—</span>
                        )}
                      </td>
                    ))}
                    <td className="px-3 py-1.5 text-center">
                      <span className={`text-xs font-bold px-2 py-0.5 rounded ${step.fault ? 'bg-rose-100 text-rose-600 dark:bg-rose-500/20 dark:text-rose-400' : 'bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400'}`}>
                        {step.fault ? 'FAULT' : 'HIT'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─────────── DISK SCHEDULING VISUALIZER ─────────── */
export function DiskScheduling() {
  const [reqStr, setReqStr] = useState('98,183,37,122,14,124,65,67');
  const [initial, setInitial] = useState(53);
  const [algo, setAlgo] = useState<'fcfs' | 'sstf' | 'scan' | 'cscan'>('fcfs');
  const [direction, setDirection] = useState<'right' | 'left'>('right');
  const diskSize = 199;
  const [result, setResult] = useState<{ order: number[]; movements: number[]; total: number } | null>(null);

  const solve = () => {
    const reqs = reqStr.split(',').map(s => parseInt(s.trim())).filter(n => !isNaN(n));
    let order: number[] = [];
    let movements: number[] = [];

    if (algo === 'fcfs') {
      order = [initial, ...reqs];
    } else if (algo === 'sstf') {
      const remaining = [...reqs];
      let current = initial;
      order = [initial];
      while (remaining.length > 0) {
        let minDist = Infinity;
        let minIdx = 0;
        for (let i = 0; i < remaining.length; i++) {
          const dist = Math.abs(remaining[i] - current);
          if (dist < minDist) { minDist = dist; minIdx = i; }
        }
        current = remaining[minIdx];
        order.push(current);
        remaining.splice(minIdx, 1);
      }
    } else if (algo === 'scan') {
      const sorted = [...reqs].sort((a, b) => a - b);
      const left = sorted.filter(r => r < initial).reverse();
      const right = sorted.filter(r => r >= initial);
      if (direction === 'right') {
        order = [initial, ...right, diskSize, ...left];
      } else {
        order = [initial, ...left, 0, ...right];
      }
    } else {
      const sorted = [...reqs].sort((a, b) => a - b);
      const left = sorted.filter(r => r < initial).reverse();
      const right = sorted.filter(r => r >= initial);
      if (direction === 'right') {
        order = [initial, ...right, diskSize, 0, ...left];
      } else {
        order = [initial, ...left, 0, diskSize, ...right];
      }
    }

    for (let i = 1; i < order.length; i++) {
      movements.push(Math.abs(order[i] - order[i - 1]));
    }
    const total = movements.reduce((s, m) => s + m, 0);
    setResult({ order, movements, total });
  };

  const maxPos = result ? Math.max(...result.order, diskSize) : diskSize;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-4 items-end">
        <div>
          <label className="text-sm font-medium text-slate-600 dark:text-slate-300 block mb-1">Request Queue</label>
          <input type="text" value={reqStr} onChange={e => setReqStr(e.target.value)} className="w-72 px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-sm font-mono" />
        </div>
        <div>
          <label className="text-sm font-medium text-slate-600 dark:text-slate-300 block mb-1">Initial Head</label>
          <input type="number" value={initial} onChange={e => setInitial(+e.target.value)} className="w-20 px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-sm text-center" />
        </div>
        <div>
          <label className="text-sm font-medium text-slate-600 dark:text-slate-300 block mb-1">Algorithm</label>
          <select value={algo} onChange={e => setAlgo(e.target.value as any)} className="px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-sm">
            <option value="fcfs">FCFS</option>
            <option value="sstf">SSTF</option>
            <option value="scan">SCAN</option>
            <option value="cscan">C-SCAN</option>
          </select>
        </div>
        {(algo === 'scan' || algo === 'cscan') && (
          <div>
            <label className="text-sm font-medium text-slate-600 dark:text-slate-300 block mb-1">Direction</label>
            <select value={direction} onChange={e => setDirection(e.target.value as any)} className="px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-sm">
              <option value="right">Right</option>
              <option value="left">Left</option>
            </select>
          </div>
        )}
        <button onClick={solve} className="px-5 py-2 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white rounded-xl font-semibold text-sm shadow-lg shadow-cyan-500/25 transition-all hover:shadow-xl active:scale-[0.98]">
          Visualize
        </button>
      </div>

      {result && (
        <div className="space-y-4 animate-fade-in">
          <div className="px-4 py-3 rounded-xl bg-cyan-50 dark:bg-cyan-500/10 border border-cyan-200 dark:border-cyan-500/20">
            <p className="text-sm font-semibold text-cyan-600 dark:text-cyan-400">
              Total Head Movement: {result.total} cylinders
            </p>
            <p className="text-xs text-cyan-500 dark:text-cyan-400/70 mt-1">
              Order: {result.order.join(' → ')}
            </p>
          </div>

          {/* Visualization */}
          <div className="p-4 rounded-xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 overflow-x-auto">
            <svg viewBox={`0 0 ${maxPos + 40} ${result.order.length * 40 + 30}`} className="w-full min-w-[600px]" style={{ maxHeight: `${Math.min(result.order.length * 40 + 30, 500)}px` }}>
              {/* Cylinder line */}
              <line x1={20} y1={15} x2={maxPos + 20} y2={15} stroke="currentColor" strokeWidth="1" opacity="0.3" />
              {/* Position markers */}
              {[0, Math.floor(maxPos / 4), Math.floor(maxPos / 2), Math.floor(3 * maxPos / 4), maxPos].map(pos => (
                <g key={pos}>
                  <line x1={pos + 20} y1={10} x2={pos + 20} y2={20} stroke="currentColor" strokeWidth="1" opacity="0.4" />
                  <text x={pos + 20} y={8} textAnchor="middle" className="text-[10px] fill-current opacity-50">{pos}</text>
                </g>
              ))}
              {/* Head movement lines */}
              {result.order.map((pos, i) => (
                <g key={i}>
                  {i > 0 && (
                    <line
                      x1={result.order[i - 1] + 20}
                      y1={(i - 1) * 40 + 25}
                      x2={pos + 20}
                      y2={i * 40 + 25}
                      stroke="#06b6d4"
                      strokeWidth="2"
                      opacity="0.7"
                    />
                  )}
                  <circle cx={pos + 20} cy={i * 40 + 25} r={i === 0 ? 6 : 5} fill={i === 0 ? '#6366f1' : '#06b6d4'} />
                  <text x={pos + 20} y={i * 40 + 45} textAnchor="middle" className="text-[10px] fill-current opacity-70 font-mono">{pos}{i === 0 ? ' (start)' : ''}</text>
                </g>
              ))}
            </svg>
          </div>

          {/* Movement table */}
          <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700">
            <table className="w-full text-sm">
              <thead className="bg-slate-100 dark:bg-slate-800/50">
                <tr>
                  <th className="px-3 py-2 text-center font-semibold">#</th>
                  <th className="px-3 py-2 text-center font-semibold">From</th>
                  <th className="px-3 py-2 text-center font-semibold">To</th>
                  <th className="px-3 py-2 text-center font-semibold">Movement</th>
                </tr>
              </thead>
              <tbody>
                {result.movements.map((m, i) => (
                  <tr key={i} className="border-t border-slate-100 dark:border-slate-800">
                    <td className="px-3 py-1.5 text-center text-slate-500">{i + 1}</td>
                    <td className="px-3 py-1.5 text-center font-mono">{result.order[i]}</td>
                    <td className="px-3 py-1.5 text-center font-mono">{result.order[i + 1]}</td>
                    <td className="px-3 py-1.5 text-center font-mono font-semibold">{m}</td>
                  </tr>
                ))}
                <tr className="border-t-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/30 font-semibold">
                  <td className="px-3 py-2" colSpan={3}>Total</td>
                  <td className="px-3 py-2 text-center">{result.total}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
