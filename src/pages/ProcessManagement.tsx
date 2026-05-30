import { useState } from 'react';
import { CPUScheduler } from '../components/InteractiveWidgets';
import { useApp } from '../context/AppContext';
import { pyqData } from '../data/examData';
import { ChevronDown, ChevronRight, Zap, AlertCircle, CheckCircle, Lightbulb, PenTool } from 'lucide-react';

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
  const styles = {
    tip: 'bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/20 text-emerald-700 dark:text-emerald-300',
    warning: 'bg-amber-50 dark:bg-amber-500/10 border-amber-200 dark:border-amber-500/20 text-amber-700 dark:text-amber-300',
    important: 'bg-rose-50 dark:bg-rose-500/10 border-rose-200 dark:border-rose-500/20 text-rose-700 dark:text-rose-300',
    exam: 'bg-primary-50 dark:bg-primary-500/10 border-primary-200 dark:border-primary-500/20 text-primary-700 dark:text-primary-300',
  };
  const icons = { tip: Lightbulb, warning: AlertCircle, important: AlertCircle, exam: PenTool };
  const Icon = icons[type];
  return (
    <div className={`p-4 rounded-xl border ${styles[type]} text-sm`}>
      <div className="flex items-start gap-2">
        <Icon className="w-4 h-4 mt-0.5 flex-shrink-0" />
        <div>{children}</div>
      </div>
    </div>
  );
}

export default function ProcessManagement() {
  const { updateProgress } = useApp();
  const relatedPYQs = pyqData.filter(p => ['CPU Scheduling', 'Process vs Thread', 'Process States', 'Process Basics'].includes(p.topic));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs text-rose-500 font-semibold mb-1">
            <span className="px-1.5 py-0.5 rounded bg-rose-100 dark:bg-rose-500/20">HIGH WEIGHTAGE</span>
            <span>~40 marks</span>
          </div>
          <h1 className="text-2xl font-bold">Process Management</h1>
          <p className="text-sm text-slate-500 mt-1">CPU Scheduling, Process States, Threads — the backbone of OS</p>
        </div>
        <button onClick={() => updateProgress('process-management', 100)} className="text-xs px-3 py-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-medium hover:bg-emerald-200 dark:hover:bg-emerald-500/30 transition-colors">
          <CheckCircle className="w-3.5 h-3.5 inline mr-1" />Mark Complete
        </button>
      </div>

      {/* Quick Revision */}
      <div className="p-4 rounded-xl bg-gradient-to-r from-primary-500/10 to-violet-500/10 border border-primary-200/50 dark:border-primary-500/20">
        <div className="flex items-center gap-2 text-sm font-semibold text-primary-600 dark:text-primary-400 mb-2">
          <Zap className="w-4 h-4" /> Quick Revision
        </div>
        <ul className="text-sm text-slate-600 dark:text-slate-300 space-y-1">
          <li>• <strong>Process</strong> = Program in execution. <strong>Thread</strong> = Light-weight unit of CPU utilization within a process</li>
          <li>• <strong>TAT = CT − AT</strong>, <strong>WT = TAT − BT</strong></li>
          <li>• <strong>FCFS</strong>: Convoy effect. <strong>SJF</strong>: Starvation. <strong>RR</strong>: Fair. <strong>Priority</strong>: Aging needed</li>
          <li>• 5 States: New → Ready → Running → Waiting → Terminated</li>
        </ul>
      </div>

      {/* SECTION: Process vs Thread */}
      <Section title="📋 Process vs Thread — Comparison">
        <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-100 dark:bg-slate-800/70">
                <th className="px-4 py-2.5 text-left font-semibold">Aspect</th>
                <th className="px-4 py-2.5 text-center font-semibold">Process</th>
                <th className="px-4 py-2.5 text-center font-semibold">Thread</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {[
                ['Definition', 'Program in execution', 'Basic unit of CPU utilization within a process'],
                ['Weight', 'Heavy-weight', 'Light-weight'],
                ['Creation', 'fork() — expensive', 'pthread_create() — cheap'],
                ['Context Switch', 'Slow (save full state)', 'Fast (save minimal state)'],
                ['Memory', 'Separate address space', 'Shared code, data, heap'],
                ['Communication', 'IPC (pipes, shared mem, msgs)', 'Direct via shared memory'],
                ['Independent?', 'Yes, isolated from others', 'No, can affect other threads'],
                ['Crash impact', 'One crash doesn\'t affect others', 'One thread crash can kill entire process'],
                ['Examples', 'Chrome tabs, VMs', 'Threads in a web server, Word autosave'],
              ].map(([aspect, proc, thread]) => (
                <tr key={aspect}>
                  <td className="px-4 py-2 font-medium text-slate-700 dark:text-slate-300">{aspect}</td>
                  <td className="px-4 py-2 text-center text-slate-600 dark:text-slate-400">{proc}</td>
                  <td className="px-4 py-2 text-center text-slate-600 dark:text-slate-400">{thread}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <InfoBox type="exam">
          <strong>Exam Tip:</strong> Always mention that threads share code section, data section, heap, and OS resources but have their own register set, stack, and program counter. Draw a diagram showing shared vs separate components.
        </InfoBox>
      </Section>

      {/* SECTION: Process States */}
      <Section title="🔄 Process State Diagram">
        <div className="p-4 rounded-xl bg-white dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700/60">
          {/* CSS State Diagram */}
          <div className="flex flex-col items-center gap-2 py-4">
            {/* New */}
            <div className="px-6 py-2.5 rounded-lg bg-slate-200 dark:bg-slate-700 font-semibold text-sm text-center">NEW (Created)</div>
            <div className="text-xs text-slate-500">Admitted</div>
            <div className="w-px h-4 bg-slate-400" />

            {/* Ready */}
            <div className="px-6 py-2.5 rounded-lg bg-blue-200 dark:bg-blue-900/50 font-semibold text-sm text-blue-700 dark:text-blue-300 text-center">READY (Waiting for CPU)</div>

            <div className="flex items-center gap-8">
              <div className="flex flex-col items-center">
                <div className="text-xs text-slate-500">Scheduler Dispatch</div>
                <div className="w-px h-4 bg-green-400" />
              </div>
              <div className="flex flex-col items-center">
                <div className="w-px h-4 bg-slate-400" />
                <div className="text-xs text-slate-500">Interrupt / I/O Wait</div>
              </div>
            </div>

            {/* Running */}
            <div className="px-6 py-2.5 rounded-lg bg-green-200 dark:bg-green-900/50 font-semibold text-sm text-green-700 dark:text-green-300 text-center">RUNNING (Executing on CPU)</div>

            <div className="flex items-center gap-4">
              <div className="flex flex-col items-center">
                <div className="text-xs text-slate-500">I/O or Event Wait</div>
                <div className="w-px h-4 bg-amber-400" />
              </div>
              <div className="flex flex-col items-center">
                <div className="text-xs text-slate-500">Exit</div>
                <div className="w-px h-4 bg-red-400" />
              </div>
            </div>

            <div className="flex items-center gap-12">
              {/* Waiting */}
              <div className="px-6 py-2.5 rounded-lg bg-amber-200 dark:bg-amber-900/50 font-semibold text-sm text-amber-700 dark:text-amber-300 text-center">WAITING (For I/O/Event)</div>
              <div className="flex flex-col items-center">
                <div className="w-px h-4 bg-blue-400" />
                <div className="text-xs text-slate-500">I/O Complete</div>
                <div className="px-4 py-1 rounded bg-blue-100 dark:bg-blue-900/30 text-xs text-blue-600 dark:text-blue-400">→ Back to READY</div>
              </div>
            </div>

            {/* Terminated */}
            <div className="mt-4 px-6 py-2.5 rounded-lg bg-red-200 dark:bg-red-900/50 font-semibold text-sm text-red-700 dark:text-red-300 text-center">TERMINATED (Finished)</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-2 text-xs">
          {[
            { state: 'New', desc: 'Process is being created. OS allocates resources.' },
            { state: 'Ready', desc: 'Process is loaded in memory, waiting for CPU.' },
            { state: 'Running', desc: 'CPU is executing the process instructions.' },
            { state: 'Waiting', desc: 'Process waits for I/O completion or event.' },
            { state: 'Terminated', desc: 'Process has finished. Resources released.' },
          ].map(s => (
            <div key={s.state} className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/40">
              <strong>{s.state}</strong>: {s.desc}
            </div>
          ))}
        </div>
      </Section>

      {/* SECTION: CPU Scheduling */}
      <Section title="⚡ CPU Scheduling Algorithms">
        <InfoBox type="important">
          <strong>Most Asked Numerical!</strong> Every year, a 10-mark numerical on CPU scheduling appears. Practice with the interactive calculator below. Always draw Gantt charts in exam.
        </InfoBox>

        {/* Algorithm Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* FCFS */}
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700/60 bg-white dark:bg-slate-800/30">
            <h4 className="font-bold text-sm mb-2 text-blue-600 dark:text-blue-400">First Come First Served (FCFS)</h4>
            <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1">
              <li>• Non-preemptive: Process runs to completion</li>
              <li>• Order by Arrival Time (FIFO queue)</li>
              <li>✓ Simple, fair (no starvation)</li>
              <li>✗ <strong>Convoy Effect</strong>: Short processes wait for long ones</li>
              <li>✗ High average waiting time</li>
            </ul>
            <div className="mt-2 p-2 rounded bg-slate-50 dark:bg-slate-900/50 text-xs font-mono">
              <div>Algorithm: Sort by AT → Execute in order</div>
              <div>CT = max(prev_CT, AT) + BT</div>
              <div>TAT = CT − AT, WT = TAT − BT</div>
            </div>
          </div>

          {/* SJF */}
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700/60 bg-white dark:bg-slate-800/30">
            <h4 className="font-bold text-sm mb-2 text-emerald-600 dark:text-emerald-400">Shortest Job First (SJF)</h4>
            <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1">
              <li>• Non-preemptive: Select shortest burst among arrived processes</li>
              <li>• Preemptive variant: Shortest Remaining Time First (SRTF)</li>
              <li>✓ Optimal average waiting time</li>
              <li>✗ <strong>Starvation</strong>: Long processes may never execute</li>
              <li>✗ Requires knowing burst time in advance (impractical)</li>
            </ul>
            <div className="mt-2 p-2 rounded bg-slate-50 dark:bg-slate-900/50 text-xs font-mono">
              <div>At time t: pick arrived process with min(BT)</div>
              <div>If tie: pick lower AT, then lower PID</div>
            </div>
          </div>

          {/* Round Robin */}
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700/60 bg-white dark:bg-slate-800/30">
            <h4 className="font-bold text-sm mb-2 text-violet-600 dark:text-violet-400">Round Robin (RR)</h4>
            <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1">
              <li>• Preemptive: Time quantum (TQ) based scheduling</li>
              <li>• Each process gets TQ units, then goes to back of queue</li>
              <li>✓ Fair, no starvation, good for time-sharing</li>
              <li>✗ If TQ too large → FCFS behavior</li>
              <li>✗ If TQ too small → excessive context switching</li>
            </ul>
            <div className="mt-2 p-2 rounded bg-slate-50 dark:bg-slate-900/50 text-xs font-mono">
              <div>Ready queue, FIFO order</div>
              <div>Exec min(TQ, remaining_time)</div>
              <div>If not done → back to queue tail</div>
            </div>
          </div>

          {/* Priority */}
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700/60 bg-white dark:bg-slate-800/30">
            <h4 className="font-bold text-sm mb-2 text-amber-600 dark:text-amber-400">Priority Scheduling</h4>
            <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1">
              <li>• Can be preemptive or non-preemptive</li>
              <li>• Process with highest priority executes first</li>
              <li>✓ Flexible — priority based on importance</li>
              <li>✗ <strong>Starvation</strong>: Low priority may never run</li>
              <li>✗ Solution: <strong>Aging</strong> — increase priority over time</li>
            </ul>
            <div className="mt-2 p-2 rounded bg-slate-50 dark:bg-slate-900/50 text-xs font-mono">
              <div>Lower number = Higher priority (usually)</div>
              <div>Aging: priority = base + (wait_time/k)</div>
            </div>
          </div>
        </div>

        {/* Solved Example */}
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700/40">
          <h4 className="font-semibold text-sm mb-3">📝 Solved Example: FCFS Scheduling</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-sm mb-3">
              <thead>
                <tr className="bg-slate-200 dark:bg-slate-700">
                  <th className="px-3 py-1.5">Process</th><th className="px-3 py-1.5">AT</th><th className="px-3 py-1.5">BT</th><th className="px-3 py-1.5">CT</th><th className="px-3 py-1.5">TAT</th><th className="px-3 py-1.5">WT</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                <tr><td className="px-3 py-1.5 font-medium">P1</td><td className="px-3 py-1.5 text-center">0</td><td className="px-3 py-1.5 text-center">6</td><td className="px-3 py-1.5 text-center">6</td><td className="px-3 py-1.5 text-center">6</td><td className="px-3 py-1.5 text-center">0</td></tr>
                <tr><td className="px-3 py-1.5 font-medium">P2</td><td className="px-3 py-1.5 text-center">1</td><td className="px-3 py-1.5 text-center">4</td><td className="px-3 py-1.5 text-center">10</td><td className="px-3 py-1.5 text-center">9</td><td className="px-3 py-1.5 text-center">5</td></tr>
                <tr><td className="px-3 py-1.5 font-medium">P3</td><td className="px-3 py-1.5 text-center">2</td><td className="px-3 py-1.5 text-center">2</td><td className="px-3 py-1.5 text-center">12</td><td className="px-3 py-1.5 text-center">10</td><td className="px-3 py-1.5 text-center">8</td></tr>
                <tr><td className="px-3 py-1.5 font-medium">P4</td><td className="px-3 py-1.5 text-center">3</td><td className="px-3 py-1.5 text-center">3</td><td className="px-3 py-1.5 text-center">15</td><td className="px-3 py-1.5 text-center">12</td><td className="px-3 py-1.5 text-center">9</td></tr>
                <tr className="font-bold bg-slate-200/50 dark:bg-slate-700/50"><td colSpan={3} className="px-3 py-1.5">Average</td><td className="px-3 py-1.5 text-center">—</td><td className="px-3 py-1.5 text-center">9.25</td><td className="px-3 py-1.5 text-center">5.50</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-500">P1 starts at 0 (no wait). P2 arrives at 1 but waits until P1 finishes at 6. P2 CT = 6+4 = 10, TAT = 10-1 = 9, WT = 9-4 = 5. Continue for all.</p>
          <div className="mt-2 flex items-center gap-0.5">
            <div className="h-8 bg-blue-500 text-white text-xs flex items-center justify-center rounded-l" style={{width: '144px'}}>P1 (0-6)</div>
            <div className="h-8 bg-emerald-500 text-white text-xs flex items-center justify-center" style={{width: '96px'}}>P2 (6-10)</div>
            <div className="h-8 bg-violet-500 text-white text-xs flex items-center justify-center" style={{width: '48px'}}>P3</div>
            <div className="h-8 bg-amber-500 text-white text-xs flex items-center justify-center rounded-r" style={{width: '72px'}}>P4</div>
          </div>
        </div>
      </Section>

      {/* SECTION: Interactive Calculator */}
      <Section title="🔢 Interactive CPU Scheduling Calculator" defaultOpen={false}>
        <InfoBox type="tip">
          Enter your own process data and see Gantt chart, CT, TAT, WT calculated automatically. Try different algorithms!
        </InfoBox>
        <CPUScheduler />
      </Section>

      {/* SECTION: PYQ Analysis */}
      <Section title="📝 Previous Year Questions" defaultOpen={false}>
        <div className="space-y-3">
          {relatedPYQs.map(q => (
            <div key={q.id} className="p-3 rounded-lg bg-white dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/40">
              <div className="flex items-center gap-2 mb-1">
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${q.type === 'numerical' ? 'bg-amber-100 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400' : q.type === 'long' ? 'bg-rose-100 text-rose-600 dark:bg-rose-500/20 dark:text-rose-400' : 'bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400'}`}>
                  {q.type.toUpperCase()} • {q.marks} marks
                </span>
                <span className="text-[10px] text-slate-400">{q.year} • ×{q.frequency}</span>
              </div>
              <p className="text-sm">{q.question}</p>
              {q.keyPoints && (
                <div className="mt-2 text-xs text-slate-500 space-y-0.5">
                  <strong>Key Points:</strong>
                  {q.keyPoints.map((p, i) => <div key={i}>• {p}</div>)}
                </div>
              )}
            </div>
          ))}
        </div>
      </Section>

      {/* Practice Questions */}
      <Section title="🏋️ Practice Questions" defaultOpen={false}>
        <div className="space-y-3 text-sm">
          <div className="p-3 rounded-lg bg-white dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/40">
            <strong className="text-primary-500">Q1.</strong> Given P1(AT=0,BT=8), P2(AT=1,BT=4), P3(AT=2,BT=9), P4(AT=3,BT=5). Calculate Avg WT using FCFS and SJF.
          </div>
          <div className="p-3 rounded-lg bg-white dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/40">
            <strong className="text-primary-500">Q2.</strong> Using Round Robin (TQ=3): P1(AT=0,BT=24), P2(AT=0,BT=3), P3(AT=0,BT=3). Draw Gantt chart and calculate Avg TAT.
          </div>
          <div className="p-3 rounded-lg bg-white dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/40">
            <strong className="text-primary-500">Q3.</strong> Explain the Convoy Effect in FCFS with an example. How does SJF solve this?
          </div>
          <div className="p-3 rounded-lg bg-white dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/40">
            <strong className="text-primary-500">Q4.</strong> What is the difference between preemptive and non-preemptive scheduling? Give 2 examples of each.
          </div>
          <div className="p-3 rounded-lg bg-white dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/40">
            <strong className="text-primary-500">Q5.</strong> What is a Process Control Block? List all the information it contains.
          </div>
        </div>
      </Section>

      {/* Viva Questions */}
      <Section title="🎤 Viva Questions" defaultOpen={false}>
        <div className="space-y-2 text-sm">
          {[
            { q: 'What is the difference between program and process?', a: 'Program is a passive entity (file on disk). Process is an active entity (program in execution) with PCB, memory, etc.' },
            { q: 'What is context switching?', a: 'Saving the state of the current process and loading the saved state of the new process so that multiple processes can share a single CPU.' },
            { q: 'What is the dispatcher?', a: 'Module that gives control of CPU to the process selected by the short-term scheduler. Dispatch latency is the time it takes to stop one process and start another.' },
            { q: 'What is a zombie process?', a: 'A process that has terminated but whose entry still exists in the process table because the parent has not called wait().' },
            { q: 'What is throughput?', a: 'Number of processes completed per unit time. Higher throughput = better system performance.' },
          ].map((v, i) => (
            <details key={i} className="p-3 rounded-lg bg-white dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/40">
              <summary className="font-medium cursor-pointer">{v.q}</summary>
              <p className="mt-2 text-slate-600 dark:text-slate-400 text-xs">{v.a}</p>
            </details>
          ))}
        </div>
      </Section>
    </div>
  );
}
