import { useState } from 'react';
import { BankersAlgorithm } from '../components/InteractiveWidgets';
import { useApp } from '../context/AppContext';
import { pyqData } from '../data/examData';
import { ChevronDown, ChevronRight, Zap, CheckCircle, Lightbulb, AlertCircle, PenTool } from 'lucide-react';

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

function InfoBox({ type, children }: { type: 'tip' | 'warning' | 'important' | 'exam'; children: React.ReactNode }) {
  const styles = { tip: 'bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/20 text-emerald-700 dark:text-emerald-300', warning: 'bg-amber-50 dark:bg-amber-500/10 border-amber-200 dark:border-amber-500/20 text-amber-700 dark:text-amber-300', important: 'bg-rose-50 dark:bg-rose-500/10 border-rose-200 dark:border-rose-500/20 text-rose-700 dark:text-rose-300', exam: 'bg-primary-50 dark:bg-primary-500/10 border-primary-200 dark:border-primary-500/20 text-primary-700 dark:text-primary-300' };
  const icons = { tip: Lightbulb, warning: AlertCircle, important: AlertCircle, exam: PenTool };
  const Icon = icons[type];
  return <div className={`p-4 rounded-xl border ${styles[type]} text-sm`}><div className="flex items-start gap-2"><Icon className="w-4 h-4 mt-0.5 flex-shrink-0" /><div>{children}</div></div></div>;
}

export default function Deadlocks() {
  const { updateProgress } = useApp();
  const relatedPYQs = pyqData.filter(p => ['Deadlock Conditions', "Banker's Algorithm", 'Deadlock Handling', 'RAG'].includes(p.topic));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs text-rose-500 font-semibold mb-1">
            <span className="px-1.5 py-0.5 rounded bg-rose-100 dark:bg-rose-500/20">HIGH WEIGHTAGE</span>
            <span>~30 marks</span>
          </div>
          <h1 className="text-2xl font-bold">Deadlocks</h1>
          <p className="text-sm text-slate-500 mt-1">Coffman Conditions, Banker's Algorithm, Prevention & Avoidance</p>
        </div>
        <button onClick={() => updateProgress('deadlocks', 100)} className="text-xs px-3 py-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-medium">
          <CheckCircle className="w-3.5 h-3.5 inline mr-1" />Mark Complete
        </button>
      </div>

      <div className="p-4 rounded-xl bg-gradient-to-r from-red-500/10 to-rose-500/10 border border-red-200/50 dark:border-red-500/20">
        <div className="flex items-center gap-2 text-sm font-semibold text-red-600 dark:text-red-400 mb-2"><Zap className="w-4 h-4" /> Quick Revision</div>
        <ul className="text-sm text-slate-600 dark:text-slate-300 space-y-1">
          <li>• <strong>4 Coffman Conditions:</strong> Mutual Exclusion + Hold & Wait + No Preemption + Circular Wait</li>
          <li>• ALL 4 must hold simultaneously for deadlock to occur</li>
          <li>• <strong>Need = Max − Allocation</strong>. Safe if Need[i] ≤ Available for some process</li>
          <li>• Prevention negates conditions. Avoidance uses Banker's (safe state check)</li>
        </ul>
      </div>

      {/* Coffman Conditions */}
      <Section title="⚠️ Four Necessary Conditions (Coffman Conditions)">
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">All four conditions must hold <strong>simultaneously</strong> for deadlock. Breaking ANY one prevents deadlock.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            { num: '1', title: 'Mutual Exclusion', desc: 'At least one resource must be held in a non-sharable mode. Only one process can use the resource at a time.', prevent: 'Use sharable resources where possible (e.g., read-only files). Use spooling for printers.', color: 'bg-red-50 dark:bg-red-500/10 border-red-200 dark:border-red-500/20', icon: '🔒' },
            { num: '2', title: 'Hold and Wait', desc: 'A process holds at least one resource AND is waiting for additional resources held by other processes.', prevent: 'Require process to request ALL resources before execution. Or release all held resources before requesting new ones.', color: 'bg-amber-50 dark:bg-amber-500/10 border-amber-200 dark:border-amber-500/20', icon: '✊' },
            { num: '3', title: 'No Preemption', desc: 'Resources cannot be forcibly taken away from a process. The process must release them voluntarily.', prevent: 'If process can\'t get resource, preempt (take back) all its held resources. Or preempt from blocking processes.', color: 'bg-violet-50 dark:bg-violet-500/10 border-violet-200 dark:border-violet-500/20', icon: '🚫' },
            { num: '4', title: 'Circular Wait', desc: 'There exists a circular chain of processes: P1 waits for P2, P2 waits for P3, ..., Pn waits for P1.', prevent: 'Impose total ordering on resource types. Process must request resources in increasing order only.', color: 'bg-blue-50 dark:bg-blue-500/10 border-blue-200 dark:border-blue-500/20', icon: '🔄' },
          ].map(c => (
            <div key={c.num} className={`p-4 rounded-xl border ${c.color}`}>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">{c.icon}</span>
                <h4 className="font-bold text-sm">{c.num}. {c.title}</h4>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">{c.desc}</p>
              <div className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                Prevention: {c.prevent}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Prevention vs Avoidance */}
      <Section title="🛡️ Deadlock Prevention vs Avoidance">
        <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-100 dark:bg-slate-800/70">
                <th className="px-4 py-2.5 text-left font-semibold">Aspect</th>
                <th className="px-4 py-2.5 text-center font-semibold">Prevention</th>
                <th className="px-4 py-2.5 text-center font-semibold">Avoidance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {[
                ['Strategy', 'Ensure conditions never hold', 'Check if request leads to safe state'],
                ['Runtime cost', 'None (static rules)', 'High (safety algorithm each request)'],
                ['Resource utilization', 'Low (restrictive)', 'High (more flexible)'],
                ['Throughput', 'Lower', 'Higher'],
                ['Example', 'Resource ordering, request all at once', "Banker's Algorithm"],
                ['Knowledge needed', 'None', 'Max need of each process'],
                ['Implementation', 'Simple', 'Complex'],
              ].map(([a, p, av]) => (
                <tr key={a}>
                  <td className="px-4 py-2 font-medium">{a}</td>
                  <td className="px-4 py-2 text-center text-slate-600 dark:text-slate-400">{p}</td>
                  <td className="px-4 py-2 text-center text-slate-600 dark:text-slate-400">{av}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* Banker's Algorithm */}
      <Section title="🏦 Banker's Algorithm">
        <InfoBox type="exam">
          <strong>Guaranteed 10-mark question!</strong> Practice the step-by-step solution. Always show: (1) Need matrix calculation (2) Safety algorithm with Work vector (3) Safe sequence.
        </InfoBox>

        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700/40 space-y-3">
          <h4 className="font-semibold text-sm">Banker's Algorithm — Step by Step</h4>

          <div className="space-y-2 text-sm">
            <div className="p-3 rounded-lg bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/40">
              <strong className="text-primary-500">Step 1:</strong> Calculate Need Matrix
              <div className="mt-1 font-mono text-xs bg-slate-50 dark:bg-slate-900/50 p-2 rounded">Need[i][j] = Max[i][j] − Allocation[i][j]</div>
            </div>

            <div className="p-3 rounded-lg bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/40">
              <strong className="text-primary-500">Step 2:</strong> Initialize Safety Algorithm
              <div className="mt-1 font-mono text-xs bg-slate-50 dark:bg-slate-900/50 p-2 rounded">Work = Available (copy)<br/>Finish[i] = false for all i</div>
            </div>

            <div className="p-3 rounded-lg bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/40">
              <strong className="text-primary-500">Step 3:</strong> Find eligible process
              <div className="mt-1 font-mono text-xs bg-slate-50 dark:bg-slate-900/50 p-2 rounded">Find i where Finish[i] = false AND Need[i] ≤ Work<br/>// All elements of Need[i] must be ≤ corresponding Work</div>
            </div>

            <div className="p-3 rounded-lg bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/40">
              <strong className="text-primary-500">Step 4:</strong> If found, "execute" process
              <div className="mt-1 font-mono text-xs bg-slate-50 dark:bg-slate-900/50 p-2 rounded">Work = Work + Allocation[i]<br/>Finish[i] = true<br/>Add P[i] to safe sequence<br/>Go to Step 3</div>
            </div>

            <div className="p-3 rounded-lg bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/40">
              <strong className="text-primary-500">Step 5:</strong> Check result
              <div className="mt-1 font-mono text-xs bg-slate-50 dark:bg-slate-900/50 p-2 rounded">If all Finish[i] = true → SAFE STATE ✓<br/>If some Finish[i] = false → UNSAFE STATE ✗</div>
            </div>
          </div>
        </div>

        {/* Solved Example */}
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700/40">
          <h4 className="font-semibold text-sm mb-3">📝 Solved Example</h4>
          <p className="text-xs text-slate-500 mb-2">5 processes, 3 resources (A, B, C). Available = [3, 3, 2]</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
            <div className="text-xs">
              <strong>Allocation:</strong>
              <div className="font-mono mt-1 space-y-0.5">
                <div>P0: [0, 1, 0]</div><div>P1: [2, 0, 0]</div><div>P2: [3, 0, 2]</div><div>P3: [2, 1, 1]</div><div>P4: [0, 0, 2]</div>
              </div>
            </div>
            <div className="text-xs">
              <strong>Max:</strong>
              <div className="font-mono mt-1 space-y-0.5">
                <div>P0: [7, 5, 3]</div><div>P1: [3, 2, 2]</div><div>P2: [9, 0, 2]</div><div>P3: [2, 2, 2]</div><div>P4: [4, 3, 3]</div>
              </div>
            </div>
            <div className="text-xs">
              <strong>Need (= Max − Alloc):</strong>
              <div className="font-mono mt-1 space-y-0.5">
                <div>P0: [7, 4, 3]</div><div>P1: [1, 2, 2]</div><div>P2: [6, 0, 0]</div><div>P3: [0, 1, 1]</div><div>P4: [4, 3, 1]</div>
              </div>
            </div>
          </div>
          <div className="text-xs space-y-1">
            <p><strong>Safety Algorithm Execution:</strong></p>
            <div className="font-mono bg-white dark:bg-slate-900/50 p-2 rounded space-y-1">
              <div>Work = [3,3,2]. P1 needs [1,2,2] ≤ [3,3,2]? ✓ → Work = [3,3,2]+[2,0,0] = [5,3,2]</div>
              <div>P3 needs [0,1,1] ≤ [5,3,2]? ✓ → Work = [5,3,2]+[2,1,1] = [7,4,3]</div>
              <div>P4 needs [4,3,1] ≤ [7,4,3]? ✓ → Work = [7,4,3]+[0,0,2] = [7,4,5]</div>
              <div>P0 needs [7,4,3] ≤ [7,4,5]? ✓ → Work = [7,4,5]+[0,1,0] = [7,5,5]</div>
              <div>P2 needs [6,0,0] ≤ [7,5,5]? ✓ → Work = [7,5,5]+[3,0,2] = [10,5,7]</div>
              <div className="text-emerald-500 font-bold">SAFE! Sequence: P1 → P3 → P4 → P0 → P2</div>
            </div>
          </div>
        </div>
      </Section>

      {/* Interactive Solver */}
      <Section title="🔢 Interactive Banker's Algorithm Solver" defaultOpen={false}>
        <InfoBox type="tip">Enter your own data and see the safe sequence calculated step by step!</InfoBox>
        <BankersAlgorithm />
      </Section>

      {/* Resource Allocation Graph */}
      <Section title="📊 Resource Allocation Graph" defaultOpen={false}>
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">A visual representation of the system state. Processes are circles, resources are rectangles (with dots for instances). An edge from process to resource = request. Edge from resource to process = held by.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20">
            <h4 className="font-semibold text-sm text-emerald-600 dark:text-emerald-400 mb-1">No Deadlock</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400">If the graph has <strong>NO cycle</strong>, deadlock is impossible. If single-instance resources and cycle exists → deadlock.</p>
          </div>
          <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-500/20">
            <h4 className="font-semibold text-sm text-rose-600 dark:text-rose-400 mb-1">Deadlock!</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400">If graph has a cycle AND each resource has only one instance → <strong>deadlock exists</strong>. For multi-instance: cycle is necessary but not sufficient.</p>
          </div>
        </div>
      </Section>

      {/* PYQ */}
      <Section title="📝 PYQ Questions" defaultOpen={false}>
        <div className="space-y-3">
          {relatedPYQs.map(q => (
            <div key={q.id} className="p-3 rounded-lg bg-white dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/40">
              <div className="flex items-center gap-2 mb-1">
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${q.type === 'numerical' ? 'bg-amber-100 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400' : q.type === 'long' ? 'bg-rose-100 text-rose-600 dark:bg-rose-500/20 dark:text-rose-400' : 'bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400'}`}>{q.type.toUpperCase()} • {q.marks}m</span>
                <span className="text-[10px] text-slate-400">{q.year} • ×{q.frequency}</span>
              </div>
              <p className="text-sm">{q.question}</p>
              {q.keyPoints && <div className="mt-2 text-xs text-slate-500 space-y-0.5"><strong>Key Points:</strong>{q.keyPoints.map((p, i) => <div key={i}>• {p}</div>)}</div>}
            </div>
          ))}
        </div>
      </Section>

      {/* Practice */}
      <Section title="🏋️ Practice Questions" defaultOpen={false}>
        <div className="space-y-3 text-sm">
          <div className="p-3 rounded-lg bg-white dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/40">
            <strong className="text-primary-500">Q1.</strong> 5 processes, 3 resources. Available=[2,1,0]. Allocation: P0[0,1,0] P1[2,0,0] P2[3,0,2] P3[2,1,1] P4[0,0,2]. Max: P0[7,5,3] P1[3,2,2] P2[9,0,2] P3[2,2,2] P4[4,3,3]. Is the system safe?
          </div>
          <div className="p-3 rounded-lg bg-white dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/40">
            <strong className="text-primary-500">Q2.</strong> Can a system detect deadlock without knowing the maximum resource needs of all processes? Explain.
          </div>
          <div className="p-3 rounded-lg bg-white dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/40">
            <strong className="text-primary-500">Q3.</strong> Explain the Ostrich Algorithm. When is it practical?
          </div>
        </div>
      </Section>
    </div>
  );
}
