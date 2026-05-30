import { useState } from 'react';
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

export default function SystemCalls() {
  const { updateProgress } = useApp();
  const relatedPYQs = pyqData.filter(p => ['OS Functions', 'OS Types', 'System Calls', 'Kernel', 'Kernel Types'].includes(p.topic));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs text-cyan-500 font-semibold mb-1">
            <span className="px-1.5 py-0.5 rounded bg-cyan-100 dark:bg-cyan-500/20">MEDIUM</span>
            <span>~20 marks</span>
          </div>
          <h1 className="text-2xl font-bold">OS Basics & System Calls</h1>
          <p className="text-sm text-slate-500 mt-1">OS Functions, Types, Kernel, System Calls</p>
        </div>
        <button onClick={() => updateProgress('system-calls', 100)} className="text-xs px-3 py-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-medium">
          <CheckCircle className="w-3.5 h-3.5 inline mr-1" />Mark Complete
        </button>
      </div>

      <div className="p-4 rounded-xl bg-gradient-to-r from-cyan-500/10 to-teal-500/10 border border-cyan-200/50 dark:border-cyan-500/20">
        <div className="flex items-center gap-2 text-sm font-semibold text-cyan-600 dark:text-cyan-400 mb-2"><Zap className="w-4 h-4" /> Quick Revision</div>
        <ul className="text-sm text-slate-600 dark:text-slate-300 space-y-1">
          <li>• OS manages hardware, provides abstractions, protects resources</li>
          <li>• 5 OS types: Batch → Multiprogramming → Time-sharing → Distributed → Real-time</li>
          <li>• 5 System Call categories: Process Control, File Mgmt, Device Mgmt, Info Maintenance, Communication</li>
          <li>• Kernel mode: full access. User mode: restricted. System call transitions between them.</li>
        </ul>
      </div>

      {/* Functions of OS */}
      <Section title="⚙️ Functions of Operating System">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {[
            { title: 'Resource Management', desc: 'Allocates and manages CPU, memory, I/O devices, and files among competing processes.' },
            { title: 'Process Management', desc: 'Creation, scheduling, synchronization, communication, and termination of processes.' },
            { title: 'Memory Management', desc: 'Allocation/deallocation of memory space, memory protection, virtual memory management.' },
            { title: 'File Management', desc: 'Creation, deletion, organization, and protection of files and directories.' },
            { title: 'I/O Management', desc: 'Device drivers, buffering, caching, spooling. Provides uniform interface to devices.' },
            { title: 'Security & Protection', desc: 'Authentication, authorization, access control. Prevents unauthorized access to resources.' },
            { title: 'User Interface', desc: 'CLI (shell) and GUI. Provides users a way to interact with the system.' },
            { title: 'Error Detection', desc: 'Constantly monitors for errors (hardware, I/O, software) and takes corrective action.' },
          ].map(f => (
            <div key={f.title} className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700/40">
              <h4 className="font-semibold text-xs mb-1">{f.title}</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400">{f.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Kernel */}
      <Section title="🧠 Kernel">
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">The kernel is the core part of the OS that runs at all times. It provides the most basic and essential services.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700/60">
            <h4 className="font-bold text-sm mb-2 text-primary-500">Kernel Mode vs User Mode</h4>
            <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-700">
              <table className="w-full text-xs">
                <thead><tr className="bg-slate-100 dark:bg-slate-800/70"><th className="px-3 py-1.5">Aspect</th><th className="px-3 py-1.5">Kernel Mode</th><th className="px-3 py-1.5">User Mode</th></tr></thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  <tr><td className="px-3 py-1.5 font-medium">Access</td><td className="px-3 py-1.5">Full hardware</td><td className="px-3 py-1.5">Restricted</td></tr>
                  <tr><td className="px-3 py-1.5 font-medium">Instructions</td><td className="px-3 py-1.5">All (privileged)</td><td className="px-3 py-1.5">Non-privileged only</td></tr>
                  <tr><td className="px-3 py-1.5 font-medium">Crash</td><td className="px-3 py-1.5">System crash</td><td className="px-3 py-1.5">Only process affected</td></tr>
                  <tr><td className="px-3 py-1.5 font-medium">Runs</td><td className="px-3 py-1.5">OS kernel code</td><td className="px-3 py-1.5">User applications</td></tr>
                  <tr><td className="px-3 py-1.5 font-medium">Mode bit</td><td className="px-3 py-1.5">0</td><td className="px-3 py-1.5">1</td></tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700/60">
            <h4 className="font-bold text-sm mb-2 text-emerald-500">Monolithic vs Microkernel</h4>
            <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-700">
              <table className="w-full text-xs">
                <thead><tr className="bg-slate-100 dark:bg-slate-800/70"><th className="px-3 py-1.5">Aspect</th><th className="px-3 py-1.5">Monolithic</th><th className="px-3 py-1.5">Microkernel</th></tr></thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  <tr><td className="px-3 py-1.5 font-medium">Size</td><td className="px-3 py-1.5">Large kernel</td><td className="px-3 py-1.5">Minimal kernel</td></tr>
                  <tr><td className="px-3 py-1.5 font-medium">Services</td><td className="px-3 py-1.5">All in kernel space</td><td className="px-3 py-1.5">In user space</td></tr>
                  <tr><td className="px-3 py-1.5 font-medium">Speed</td><td className="px-3 py-1.5">Fast (no IPC)</td><td className="px-3 py-1.5">Slower (IPC overhead)</td></tr>
                  <tr><td className="px-3 py-1.5 font-medium">Reliability</td><td className="px-3 py-1.5">Less (bug = crash)</td><td className="px-3 py-1.5">More modular</td></tr>
                  <tr><td className="px-3 py-1.5 font-medium">Example</td><td className="px-3 py-1.5">Linux, Windows</td><td className="px-3 py-1.5">MINIX, Mach</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Section>

      {/* OS Types */}
      <Section title="💻 Types of Operating Systems">
        <div className="space-y-3">
          {[
            { name: 'Batch OS', desc: 'Jobs collected into batches, processed sequentially without user interaction. Operator groups similar jobs.', pros: 'High throughput, efficient resource use', cons: 'No interaction, long turnaround, difficult debugging', example: 'IBM OS/360' },
            { name: 'Multiprogramming OS', desc: 'Multiple jobs in memory simultaneously. CPU switches to another job when current job waits for I/O. Maximizes CPU utilization.', pros: 'Higher CPU utilization, better throughput', cons: 'Memory management complexity, job scheduling needed', example: 'Early IBM mainframes' },
            { name: 'Time-Sharing OS', desc: 'Each user gets a small time slice of CPU. CPU switches between users rapidly giving illusion of dedicated computer. Interactive.', pros: 'Interactive, quick response, resource sharing', cons: 'Overhead of context switching, security concerns', example: 'Unix, Linux, Windows' },
            { name: 'Distributed OS', desc: 'Multiple machines connected via network, appearing as one system. Process migration, load balancing, transparent access.', pros: 'Resource sharing, reliability, scalability', cons: 'Complex, security, network dependency', example: 'LOCUS, Amoeba' },
            { name: 'Real-Time OS', desc: 'Guaranteed response within strict time deadlines. Hard real-time (missing deadline = failure) vs Soft real-time (degraded performance).', pros: 'Predictable, deterministic timing', cons: 'Limited resources, expensive, complex', example: 'VxWorks, QNX, FreeRTOS' },
          ].map(os => (
            <div key={os.name} className="p-4 rounded-lg bg-white dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/40">
              <div className="flex items-start justify-between">
                <h4 className="font-bold text-sm">{os.name}</h4>
                <span className="text-[10px] text-slate-400">{os.example}</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">{os.desc}</p>
              <div className="flex gap-4 mt-2 text-[10px]">
                <span className="text-emerald-500">✓ {os.pros}</span>
              </div>
              <div className="text-[10px] text-rose-500 mt-0.5">✗ {os.cons}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* System Calls */}
      <Section title="📞 System Calls">
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">System calls provide an interface to the services made available by the OS. They are the only way for user programs to request kernel services.</p>

        <div className="space-y-3">
          {[
            { cat: 'Process Control', desc: 'Create, terminate, load, execute processes. Get/set attributes.', calls: [
              { name: 'fork()', desc: 'Create child process (Unix)' },
              { name: 'exit()', desc: 'Terminate process' },
              { name: 'wait()', desc: 'Wait for child process' },
              { name: 'exec()', desc: 'Replace process image' },
              { name: 'getpid()', desc: 'Get process ID' },
              { name: 'kill()', desc: 'Send signal to process' },
            ]},
            { cat: 'File Management', desc: 'Create, delete, read, write files and directories.', calls: [
              { name: 'open()', desc: 'Open a file' },
              { name: 'read()', desc: 'Read from file' },
              { name: 'write()', desc: 'Write to file' },
              { name: 'close()', desc: 'Close file descriptor' },
              { name: 'creat()', desc: 'Create new file' },
              { name: 'unlink()', desc: 'Delete file' },
            ]},
            { cat: 'Device Management', desc: 'Request, release, read, write devices.', calls: [
              { name: 'ioctl()', desc: 'Device-specific operations' },
              { name: 'read()', desc: 'Read from device' },
              { name: 'write()', desc: 'Write to device' },
              { name: 'open()', desc: 'Open device' },
            ]},
            { cat: 'Information Maintenance', desc: 'Get/set system information, time, date.', calls: [
              { name: 'getpid()', desc: 'Get process identifier' },
              { name: 'alarm()', desc: 'Set timer' },
              { name: 'sleep()', desc: 'Sleep for time' },
              { name: 'time()', desc: 'Get system time' },
              { name: 'ptrace()', desc: 'Debug/trace execution' },
            ]},
            { cat: 'Communication', desc: 'Create/delete connections, send/receive messages.', calls: [
              { name: 'pipe()', desc: 'Create pipe for IPC' },
              { name: 'shmget()', desc: 'Get shared memory segment' },
              { name: 'mmap()', desc: 'Map file/device into memory' },
              { name: 'socket()', desc: 'Create network socket' },
              { name: 'connect()', desc: 'Connect to socket' },
            ]},
          ].map(cat => (
            <div key={cat.cat} className="p-3 rounded-lg bg-white dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/40">
              <h4 className="font-semibold text-sm mb-1">{cat.cat}</h4>
              <p className="text-xs text-slate-500 mb-2">{cat.desc}</p>
              <div className="flex flex-wrap gap-2">
                {cat.calls.map(c => (
                  <span key={c.name} className="text-xs px-2 py-1 rounded-md bg-slate-100 dark:bg-slate-700 font-mono" title={c.desc}>{c.name}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="p-3 rounded-lg bg-primary-50 dark:bg-primary-500/10 border border-primary-200 dark:border-primary-500/20 text-xs">
          <strong className="text-primary-600 dark:text-primary-400">Exam Tip:</strong> When asked about system calls, name all 5 categories with at least 2-3 examples each. Explain that system calls provide the interface between user programs and kernel services. A mode switch from user to kernel mode occurs on each call.
        </div>
      </Section>

      {/* PYQ */}
      <Section title="📝 PYQ Questions" defaultOpen={false}>
        <div className="space-y-3">
          {relatedPYQs.map(q => (
            <div key={q.id} className="p-3 rounded-lg bg-white dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/40">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400">{q.type.toUpperCase()} • {q.marks}m</span>
                <span className="text-[10px] text-slate-400">{q.year}</span>
              </div>
              <p className="text-sm">{q.question}</p>
              {q.keyPoints && <div className="mt-2 text-xs text-slate-500 space-y-0.5"><strong>Key Points:</strong>{q.keyPoints.map((p, i) => <div key={i}>• {p}</div>)}</div>}
            </div>
          ))}
        </div>
      </Section>

      {/* MCQs */}
      <Section title="✅ MCQs for Practice" defaultOpen={false}>
        <div className="space-y-3">
          {[
            { q: 'Which system call creates a new process?', options: ['A) exec()', 'B) fork()', 'C) create()', 'D) new()'], answer: 'B' },
            { q: 'Real-time OS must guarantee:', options: ['A) High throughput', 'B) Deadline compliance', 'C) Multi-user support', 'D) Low memory usage'], answer: 'B' },
            { q: 'In multiprogramming, when does CPU switch processes?', options: ['A) After every instruction', 'B) When process waits for I/O', 'C) Never', 'D) Only on error'], answer: 'B' },
            { q: 'Which mode has unrestricted hardware access?', options: ['A) User mode', 'B) Kernel mode', 'C) Guest mode', 'D) Supervisor mode'], answer: 'B' },
            { q: 'Monolithic kernel runs all services in:', options: ['A) User space', 'B) Kernel space', 'C) Disk', 'D) Network'], answer: 'B' },
          ].map((mcq, i) => (
            <div key={i} className="p-3 rounded-lg bg-white dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/40">
              <p className="text-sm font-medium mb-2">{mcq.q}</p>
              <div className="grid grid-cols-2 gap-1 text-xs">
                {mcq.options.map(opt => (
                  <div key={opt} className={`px-2 py-1 rounded ${opt.startsWith(mcq.answer) ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold' : 'text-slate-600 dark:text-slate-400'}`}>{opt}</div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}
