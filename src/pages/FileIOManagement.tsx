import { useState } from 'react';
import { DiskScheduling } from '../components/InteractiveWidgets';
import { useApp } from '../context/AppContext';
import { pyqData } from '../data/examData';
import { ChevronDown, ChevronRight, Zap, CheckCircle } from 'lucide-react';

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

export default function FileIOManagement() {
  const { updateProgress } = useApp();
  const relatedPYQs = pyqData.filter(p => ['Disk Scheduling', 'Directory Structure', 'Device Drivers'].includes(p.topic));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs text-amber-500 font-semibold mb-1">
            <span className="px-1.5 py-0.5 rounded bg-amber-100 dark:bg-amber-500/20">HIGH</span>
            <span>~24 marks</span>
          </div>
          <h1 className="text-2xl font-bold">File & I/O Management</h1>
          <p className="text-sm text-slate-500 mt-1">Disk Scheduling, Directory Structures, Device Drivers</p>
        </div>
        <button onClick={() => updateProgress('file-io', 100)} className="text-xs px-3 py-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-medium">
          <CheckCircle className="w-3.5 h-3.5 inline mr-1" />Mark Complete
        </button>
      </div>

      <div className="p-4 rounded-xl bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-200/50 dark:border-amber-500/20">
        <div className="flex items-center gap-2 text-sm font-semibold text-amber-600 dark:text-amber-400 mb-2"><Zap className="w-4 h-4" /> Quick Revision</div>
        <ul className="text-sm text-slate-600 dark:text-slate-300 space-y-1">
          <li>• FCFS: Simple, high seek. SSTF: Greedy nearest, may starve</li>
          <li>• SCAN: Elevator — goes to end, reverses. C-SCAN: One direction only, jump back</li>
          <li>• LOOK: Stop at last request (don't go to end). C-LOOK: LOOK + one direction</li>
          <li>• Total Seek = Σ |Request[i] − Request[i−1]|</li>
        </ul>
      </div>

      {/* File Concepts */}
      <Section title="📁 File Concepts">
        <p className="text-sm text-slate-600 dark:text-slate-400">A file is a named collection of related information recorded on secondary storage. From a user's perspective, a file is the smallest allotment of logical secondary storage.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700/40">
            <h4 className="font-semibold text-xs mb-1">File Attributes</h4>
            <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-0.5">
              <li>• <strong>Name:</strong> Human-readable identifier</li>
              <li>• <strong>Identifier:</strong> Unique tag within file system</li>
              <li>• <strong>Type:</strong> Information needed for different file types</li>
              <li>• <strong>Location:</strong> Pointer to file location on device</li>
              <li>• <strong>Size:</strong> Current size of file</li>
              <li>• <strong>Protection:</strong> Read, write, execute permissions</li>
              <li>• <strong>Time, Date, User ID:</strong> For protection, security, usage monitoring</li>
            </ul>
          </div>
          <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700/40">
            <h4 className="font-semibold text-xs mb-1">File Operations</h4>
            <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-0.5">
              <li>• Creating, Writing, Reading, Repositioning (seek)</li>
              <li>• Deleting, Truncating</li>
              <li>• Opening and Closing files</li>
              <li>• Open() returns a file handle/pointer</li>
              <li>• Close() frees internal table entries</li>
            </ul>
          </div>
        </div>
      </Section>

      {/* Directory Structure */}
      <Section title="📂 Directory Structure">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {[
            { name: 'Single-Level', desc: 'All files in one directory. Simple but naming conflicts. Used in early systems.', pros: 'Simple', cons: 'Naming conflicts, no grouping' },
            { name: 'Two-Level', desc: 'Separate directory per user. Files can have same name across users. But no grouping within user.', pros: 'User isolation', cons: 'No subdirectories' },
            { name: 'Tree-Structured', desc: 'Hierarchical directories. Most common. Paths from root. Allows grouping and organization.', pros: 'Flexible, organized', cons: 'Must navigate path' },
            { name: 'Acyclic Graph', desc: 'Allows shared files/subdirectories (aliases). Like tree but with shared nodes. Complicates deletion.', pros: 'File sharing', cons: 'Deletion complex' },
            { name: 'General Graph', desc: 'Allows cycles. Most flexible but requires garbage collection to manage.', pros: 'Maximum flexibility', cons: 'Garbage collection needed' },
          ].map(d => (
            <div key={d.name} className="p-3 rounded-lg bg-white dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/40">
              <h4 className="font-semibold text-xs mb-1">{d.name}</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">{d.desc}</p>
              <div className="text-[10px]"><span className="text-emerald-500">✓ {d.pros}</span> • <span className="text-rose-500">✗ {d.cons}</span></div>
            </div>
          ))}
        </div>
      </Section>

      {/* Disk Scheduling */}
      <Section title="💿 Disk Scheduling Algorithms">
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">Disk scheduling aims to minimize total head movement (seek time) when servicing I/O requests. The disk arm/head moves across cylinders to reach requested positions.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {[
            { name: 'FCFS', color: 'border-blue-200 dark:border-blue-500/20', desc: 'Service requests in order of arrival. Simplest, but may cause excessive head movement.', seek: 'Just follow arrival order' },
            { name: 'SSTF', color: 'border-emerald-200 dark:border-emerald-500/20', desc: 'Shortest Seek Time First. Always go to nearest request. Greedy approach.', seek: 'Pick min |current − request|' },
            { name: 'SCAN', color: 'border-violet-200 dark:border-violet-500/20', desc: 'Elevator algorithm. Head moves in one direction servicing all requests, then reverses at the end.', seek: 'Go to disk end, then reverse' },
            { name: 'C-SCAN', color: 'border-amber-200 dark:border-amber-500/20', desc: 'Circular SCAN. Head moves in one direction only. When it reaches end, jumps to beginning.', seek: 'One direction, jump back' },
            { name: 'LOOK', color: 'border-cyan-200 dark:border-cyan-500/20', desc: 'Like SCAN but doesn\'t go to disk end — goes only to last request in direction, then reverses.', seek: 'Stop at last request, reverse' },
            { name: 'C-LOOK', color: 'border-rose-200 dark:border-rose-500/20', desc: 'Like C-SCAN but only goes to last request in direction. Jumps back to first request on other end.', seek: 'LOOK + one direction only' },
          ].map(a => (
            <div key={a.name} className={`p-3 rounded-xl border ${a.color} bg-white dark:bg-slate-800/30`}>
              <h4 className="font-bold text-sm mb-1">{a.name}</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">{a.desc}</p>
              <p className="text-[10px] font-mono text-primary-500">{a.seek}</p>
            </div>
          ))}
        </div>

        {/* Solved Example */}
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700/40">
          <h4 className="font-semibold text-sm mb-2">📝 Solved: Queue = 98,183,37,122,14,124,65,67. Head = 53. Disk = 199.</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-lg bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/40">
              <strong className="text-blue-500">FCFS:</strong> 53→98→183→37→122→14→124→65→67
              <div className="font-mono mt-1">= 45+85+146+85+108+110+59+2 = <strong>640</strong></div>
            </div>
            <div className="p-3 rounded-lg bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/40">
              <strong className="text-emerald-500">SSTF:</strong> 53→65→67→37→14→98→122→124→183
              <div className="font-mono mt-1">= 12+2+30+23+84+24+2+59 = <strong>236</strong></div>
            </div>
            <div className="p-3 rounded-lg bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/40">
              <strong className="text-violet-500">SCAN (right):</strong> 53→65→67→98→122→124→183→199→37→14
              <div className="font-mono mt-1">= 12+2+31+24+2+59+16+162+23 = <strong>331</strong></div>
            </div>
            <div className="p-3 rounded-lg bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/40">
              <strong className="text-amber-500">C-SCAN (right):</strong> 53→65→67→98→122→124→183→199→0→14→37
              <div className="font-mono mt-1">= goes right to 199, jumps to 0, services remaining</div>
            </div>
          </div>
        </div>
      </Section>

      {/* Interactive Disk Scheduler */}
      <Section title="🔢 Interactive Disk Scheduling Visualizer" defaultOpen={false}>
        <DiskScheduling />
      </Section>

      {/* Device Drivers */}
      <Section title="🔌 Device Drivers" defaultOpen={false}>
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700/40">
          <h4 className="font-semibold text-sm mb-2">What are Device Drivers?</h4>
          <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">Device drivers are special software components that provide the OS with an interface to interact with hardware devices. They translate OS commands into device-specific operations.</p>
          <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1">
            <li>• Each device requires a specific driver to function</li>
            <li>• Drivers run in <strong>kernel mode</strong> (privileged)</li>
            <li>• Provide uniform interface to the OS despite hardware differences</li>
            <li>• Types: Block devices (disks), Character devices (keyboard), Network devices</li>
            <li>• Modern OS use layered driver architecture</li>
          </ul>
        </div>
      </Section>

      {/* PYQ */}
      <Section title="📝 PYQ Questions" defaultOpen={false}>
        <div className="space-y-3">
          {relatedPYQs.map(q => (
            <div key={q.id} className="p-3 rounded-lg bg-white dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/40">
              <div className="flex items-center gap-2 mb-1">
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${q.type === 'numerical' ? 'bg-amber-100 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400' : 'bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400'}`}>{q.type.toUpperCase()} • {q.marks}m</span>
                <span className="text-[10px] text-slate-400">{q.year}</span>
              </div>
              <p className="text-sm">{q.question}</p>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}
