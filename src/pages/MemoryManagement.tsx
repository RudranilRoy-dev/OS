import { useState } from 'react';
import { PageReplacement } from '../components/InteractiveWidgets';
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

export default function MemoryManagement() {
  const { updateProgress } = useApp();
  const relatedPYQs = pyqData.filter(p => ['Paging', 'Page Replacement', 'Virtual Memory'].includes(p.topic));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs text-rose-500 font-semibold mb-1">
            <span className="px-1.5 py-0.5 rounded bg-rose-100 dark:bg-rose-500/20">HIGH WEIGHTAGE</span>
            <span>~28 marks</span>
          </div>
          <h1 className="text-2xl font-bold">Memory Management</h1>
          <p className="text-sm text-slate-500 mt-1">Paging, Page Replacement, Virtual Memory</p>
        </div>
        <button onClick={() => updateProgress('memory-management', 100)} className="text-xs px-3 py-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-medium">
          <CheckCircle className="w-3.5 h-3.5 inline mr-1" />Mark Complete
        </button>
      </div>

      <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-500/10 to-green-500/10 border border-emerald-200/50 dark:border-emerald-500/20">
        <div className="flex items-center gap-2 text-sm font-semibold text-emerald-600 dark:text-emerald-400 mb-2"><Zap className="w-4 h-4" /> Quick Revision</div>
        <ul className="text-sm text-slate-600 dark:text-slate-300 space-y-1">
          <li>• <strong>PA = (Frame# × PageSize) + Offset</strong>. Offset bits = log₂(PageSize)</li>
          <li>• Paging: NO external fragmentation. Internal fragmentation only in last page.</li>
          <li>• <strong>FIFO</strong>: Belady's Anomaly. <strong>LRU</strong>: Stack algorithm, no Belady's. <strong>Optimal</strong>: Theoretical best</li>
          <li>• Thrashing: Too many processes, too few frames → excessive paging</li>
        </ul>
      </div>

      {/* Paging */}
      <Section title="📄 Paging — Address Translation">
        <p className="text-sm text-slate-600 dark:text-slate-400">Paging is a memory management scheme that eliminates external fragmentation by dividing logical memory into fixed-size <strong>pages</strong> and physical memory into same-sized <strong>frames</strong>.</p>

        <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-100 dark:bg-slate-800/70">
                <th className="px-4 py-2 text-left font-semibold">Term</th>
                <th className="px-4 py-2 text-left font-semibold">Definition</th>
                <th className="px-4 py-2 text-left font-semibold">Formula</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              <tr><td className="px-4 py-2 font-medium">Page</td><td className="px-4 py-2">Fixed-size block of logical memory</td><td className="px-4 py-2 font-mono text-xs">Pages = LA_space / Page_size</td></tr>
              <tr><td className="px-4 py-2 font-medium">Frame</td><td className="px-4 py-2">Fixed-size block of physical memory</td><td className="px-4 py-2 font-mono text-xs">Frames = PA_space / Page_size</td></tr>
              <tr><td className="px-4 py-2 font-medium">Page Table</td><td className="px-4 py-2">Maps page numbers to frame numbers</td><td className="px-4 py-2 font-mono text-xs">PT_size = Pages × Entry_size</td></tr>
              <tr><td className="px-4 py-2 font-medium">Offset</td><td className="px-4 py-2">Position within page/frame</td><td className="px-4 py-2 font-mono text-xs">Offset bits = log₂(Page_size)</td></tr>
              <tr><td className="px-4 py-2 font-medium">Page Number</td><td className="px-4 py-2">Which page the address belongs to</td><td className="px-4 py-2 font-mono text-xs">Page# bits = log₂(#Pages)</td></tr>
            </tbody>
          </table>
        </div>

        {/* Solved Example */}
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700/40">
          <h4 className="font-semibold text-sm mb-3">📝 Solved Example</h4>
          <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">
            Logical address = 16 bits, Page size = 1KB, Physical memory = 64KB
          </p>
          <div className="space-y-1 text-xs font-mono">
            <div>Page size = 1KB = 2<sup>10</sup> → Offset bits = 10</div>
            <div>Logical address = 16 bits → Page# bits = 16 − 10 = 6 bits → 2<sup>6</sup> = 64 pages</div>
            <div>Physical memory = 64KB = 2<sup>16</sup> bytes → Frame# bits = 16 − 10 = 6 bits → 64 frames</div>
            <div>Physical address = Frame# (6 bits) + Offset (10 bits) = 16 bits</div>
            <div className="mt-2 text-primary-500 font-bold">
              If logical address = 0x2A6F (binary: 00101010010111_0111):
            </div>
            <div>Page# = 00101010 = 42, Offset = 1001110111 = 0x177</div>
            <div>Lookup frame# from Page Table[42], say frame# = 15</div>
            <div>PA = 15 × 1024 + 0x177 = 15360 + 375 = 15735</div>
          </div>
        </div>

        <InfoBox type="exam">
          <strong>Exam Tip:</strong> For address translation questions, always: (1) Find page size → offset bits (2) Find total logical/physical address bits (3) Calculate page/frame number bits (4) Split address into page# and offset (5) Use page table to find frame# (6) Calculate PA = Frame# × PageSize + Offset
        </InfoBox>

        {/* TLB */}
        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700/60 bg-white dark:bg-slate-800/30">
          <h4 className="font-semibold text-sm mb-2">TLB (Translation Lookaside Buffer)</h4>
          <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">A hardware cache for page table entries. Speeds up address translation.</p>
          <div className="p-2 rounded bg-slate-50 dark:bg-slate-900/50 text-xs font-mono">
            EAT = h × (t_tlb + t_mem) + (1−h) × (t_tlb + 2×t_mem)<br/>
            Simplified: EAT = h × c + (1−h) × (c + m) ... depends on model<br/>
            Where h = hit ratio, c = TLB access time, m = memory access time
          </div>
        </div>
      </Section>

      {/* Page Replacement */}
      <Section title="🔄 Page Replacement Algorithms">
        <InfoBox type="important">
          <strong>10-mark numerical!</strong> Practice all three algorithms: FIFO, LRU, Optimal. Always show the frame table step by step with HIT/FAULT for each reference.
        </InfoBox>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {[
            { name: 'FIFO', color: 'border-blue-200 dark:border-blue-500/20 bg-blue-50/50 dark:bg-blue-500/5', titleColor: 'text-blue-600 dark:text-blue-400', desc: 'Replace the page that has been in memory the longest. Simple but suffers from Belady\'s Anomaly.', pros: 'Simple to implement', cons: 'Belady\'s Anomaly — more frames can mean MORE faults!' },
            { name: 'LRU', color: 'border-emerald-200 dark:border-emerald-500/20 bg-emerald-50/50 dark:bg-emerald-500/5', titleColor: 'text-emerald-600 dark:text-emerald-400', desc: 'Replace the page that hasn\'t been used for the longest time. Approximation of Optimal using past behavior.', pros: 'Good performance, no Belady\'s Anomaly', cons: 'Requires hardware support (counters/stack), expensive' },
            { name: 'Optimal', color: 'border-violet-200 dark:border-violet-500/20 bg-violet-50/50 dark:bg-violet-500/5', titleColor: 'text-violet-600 dark:text-violet-400', desc: 'Replace the page that won\'t be used for the longest time in the future. Gives minimum page faults.', pros: 'Theoretical minimum faults', cons: 'Impossible to implement (requires future knowledge)' },
          ].map(a => (
            <div key={a.name} className={`p-4 rounded-xl border ${a.color}`}>
              <h4 className={`font-bold text-sm mb-2 ${a.titleColor}`}>{a.name}</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">{a.desc}</p>
              <div className="text-xs space-y-0.5">
                <div className="text-emerald-600 dark:text-emerald-400">✓ {a.pros}</div>
                <div className="text-rose-600 dark:text-rose-400">✗ {a.cons}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Solved FIFO Example */}
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700/40">
          <h4 className="font-semibold text-sm mb-2">📝 FIFO Example: Ref String = 7,0,1,2,0,3,0,4,2,3 with 3 frames</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr>
                  <th className="px-2 py-1">Ref</th><th className="px-2 py-1">F1</th><th className="px-2 py-1">F2</th><th className="px-2 py-1">F3</th><th className="px-2 py-1">Status</th>
                </tr>
              </thead>
              <tbody className="font-mono">
                {[
                  ['7', '7', '-', '-', 'FAULT'],
                  ['0', '7', '0', '-', 'FAULT'],
                  ['1', '7', '0', '1', 'FAULT'],
                  ['2', '2', '0', '1', 'FAULT (replaced 7)'],
                  ['0', '2', '0', '1', 'HIT'],
                  ['3', '2', '3', '1', 'FAULT (replaced 0)'],
                  ['0', '2', '3', '0', 'FAULT (replaced 1)'],
                  ['4', '4', '3', '0', 'FAULT (replaced 2)'],
                  ['2', '4', '2', '0', 'FAULT (replaced 3)'],
                  ['3', '4', '2', '3', 'FAULT (replaced 0)'],
                ].map((row, i) => (
                  <tr key={i} className={row[4].includes('FAULT') ? 'bg-rose-50/50 dark:bg-rose-500/5' : 'bg-emerald-50/50 dark:bg-emerald-500/5'}>
                    {row.map((cell, j) => <td key={j} className="px-2 py-1 text-center">{cell}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-500 mt-2">Total Page Faults: 8, Hits: 2, Hit Ratio: 20%</p>
        </div>

        {/* Belady's Anomaly */}
        <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-500/20">
          <h4 className="font-semibold text-sm text-rose-600 dark:text-rose-400 mb-1">⚠️ Belady's Anomaly</h4>
          <p className="text-xs text-slate-600 dark:text-slate-400">In FIFO, increasing frames can INCREASE page faults! Example: 1,2,3,4,1,2,5,1,2,3,4,5 → 3 frames = 9 faults, 4 frames = 10 faults. This only happens with FIFO. LRU and Optimal are stack algorithms → immune.</p>
        </div>
      </Section>

      {/* Interactive Simulator */}
      <Section title="🔢 Interactive Page Replacement Simulator" defaultOpen={false}>
        <InfoBox type="tip">Enter your own reference string and see step-by-step simulation for all algorithms!</InfoBox>
        <PageReplacement />
      </Section>

      {/* Virtual Memory */}
      <Section title="💫 Virtual Memory & Thrashing">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700/60">
            <h4 className="font-bold text-sm mb-2 text-primary-500">Virtual Memory</h4>
            <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1">
              <li>• Allows execution of processes not completely in memory</li>
              <li>• Logical address space can be much larger than physical</li>
              <li>• <strong>Demand Paging:</strong> Load pages only when referenced</li>
              <li>• Page Fault → load from disk → update page table → restart instruction</li>
              <li>• Enables process isolation and memory protection</li>
            </ul>
          </div>
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700/60">
            <h4 className="font-bold text-sm mb-2 text-rose-500">Thrashing</h4>
            <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1">
              <li>• Process spends more time <strong>paging than executing</strong></li>
              <li>• CPU utilization drops sharply</li>
              <li>• OS thinks it needs more processes → makes it worse!</li>
              <li>• <strong>Cause:</strong> Too many processes, insufficient frames per process</li>
              <li>• <strong>Solution:</strong> Working Set Model — allocate enough frames for locality</li>
              <li>• <strong>Working Set:</strong> Set of pages used in last Δ references</li>
            </ul>
          </div>
        </div>

        <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700/40">
          <h4 className="font-semibold text-xs mb-1">Page Fault Handling Steps</h4>
          <ol className="text-xs text-slate-600 dark:text-slate-400 list-decimal pl-4 space-y-0.5">
            <li>Process references page not in memory → trap to OS</li>
            <li>OS checks if reference valid (in page table)</li>
            <li>If invalid → abort. If valid but not loaded → find free frame</li>
            <li>If no free frame → run page replacement algorithm</li>
            <li>Read desired page from disk into free frame</li>
            <li>Update page table (set valid bit = 1)</li>
            <li>Restart the instruction that caused the fault</li>
          </ol>
        </div>
      </Section>

      {/* PYQ */}
      <Section title="📝 PYQ Questions" defaultOpen={false}>
        <div className="space-y-3">
          {relatedPYQs.map(q => (
            <div key={q.id} className="p-3 rounded-lg bg-white dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/40">
              <div className="flex items-center gap-2 mb-1">
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${q.type === 'numerical' ? 'bg-amber-100 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400' : 'bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400'}`}>{q.type.toUpperCase()} • {q.marks}m</span>
                <span className="text-[10px] text-slate-400">{q.year} • ×{q.frequency}</span>
              </div>
              <p className="text-sm">{q.question}</p>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}
