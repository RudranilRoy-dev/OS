import { useState } from 'react';
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

function CodeBlock({ code, title }: { code: string; title?: string }) {
  return (
    <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700/60">
      {title && <div className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-xs font-semibold text-slate-600 dark:text-slate-300">{title}</div>}
      <pre className="p-4 bg-slate-50 dark:bg-slate-900/50 overflow-x-auto"><code className="text-xs leading-relaxed text-slate-700 dark:text-slate-300">{code}</code></pre>
    </div>
  );
}

function InfoBox({ type, children }: { type: 'tip' | 'warning' | 'important' | 'exam'; children: React.ReactNode }) {
  const styles = { tip: 'bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/20 text-emerald-700 dark:text-emerald-300', warning: 'bg-amber-50 dark:bg-amber-500/10 border-amber-200 dark:border-amber-500/20 text-amber-700 dark:text-amber-300', important: 'bg-rose-50 dark:bg-rose-500/10 border-rose-200 dark:border-rose-500/20 text-rose-700 dark:text-rose-300', exam: 'bg-primary-50 dark:bg-primary-500/10 border-primary-200 dark:border-primary-500/20 text-primary-700 dark:text-primary-300' };
  const icons = { tip: Lightbulb, warning: AlertCircle, important: AlertCircle, exam: PenTool };
  const Icon = icons[type];
  return <div className={`p-4 rounded-xl border ${styles[type]} text-sm`}><div className="flex items-start gap-2"><Icon className="w-4 h-4 mt-0.5 flex-shrink-0" /><div>{children}</div></div></div>;
}

export default function Synchronization() {
  const { updateProgress } = useApp();
  const relatedPYQs = pyqData.filter(p => ['Critical Section', 'Producer-Consumer', 'Dining Philosophers', 'Semaphores', 'Readers-Writers', 'fork/exec', 'Hardware Sync'].includes(p.topic));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs text-rose-500 font-semibold mb-1">
            <span className="px-1.5 py-0.5 rounded bg-rose-100 dark:bg-rose-500/20">HIGH WEIGHTAGE</span>
            <span>~35 marks</span>
          </div>
          <h1 className="text-2xl font-bold">Process Synchronization</h1>
          <p className="text-sm text-slate-500 mt-1">Critical Section, Semaphores, Classic Problems</p>
        </div>
        <button onClick={() => updateProgress('synchronization', 100)} className="text-xs px-3 py-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-medium">
          <CheckCircle className="w-3.5 h-3.5 inline mr-1" />Mark Complete
        </button>
      </div>

      <div className="p-4 rounded-xl bg-gradient-to-r from-violet-500/10 to-purple-500/10 border border-violet-200/50 dark:border-violet-500/20">
        <div className="flex items-center gap-2 text-sm font-semibold text-violet-600 dark:text-violet-400 mb-2"><Zap className="w-4 h-4" /> Quick Revision</div>
        <ul className="text-sm text-slate-600 dark:text-slate-300 space-y-1">
          <li>• <strong>Critical Section:</strong> Code accessing shared resources. Must ensure Mutual Exclusion + Progress + Bounded Waiting</li>
          <li>• <strong>Semaphore:</strong> wait(S)/signal(S). Binary (0,1) or Counting. Mutex = binary + ownership</li>
          <li>• <strong>Producer-Consumer:</strong> empty(N), full(0), mutex(1). Always wait on counting sem before mutex!</li>
          <li>• <strong>Readers-Writers:</strong> Multiple readers OK, only one writer. First reader locks, last unlocks</li>
          <li>• <strong>Dining Philosophers:</strong> Resource ordering prevents deadlock</li>
        </ul>
      </div>

      {/* Critical Section */}
      <Section title="🔒 Critical Section Problem">
        <p className="text-sm text-slate-600 dark:text-slate-400">When multiple processes access shared data concurrently, the outcome depends on the order of execution → <strong>race condition</strong>. The section of code where shared data is accessed is the <strong>Critical Section</strong>.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {[
            { title: 'Mutual Exclusion', desc: 'Only ONE process can be in its critical section at a time. No two processes execute their critical sections simultaneously.', icon: '🚫', color: 'bg-red-50 dark:bg-red-500/10 border-red-200 dark:border-red-500/20' },
            { title: 'Progress', desc: 'If no process is in CS and some processes wish to enter, only those NOT in their remainder section participate in the decision. Decision cannot be postponed indefinitely.', icon: '➡️', color: 'bg-amber-50 dark:bg-amber-500/10 border-amber-200 dark:border-amber-500/20' },
            { title: 'Bounded Waiting', desc: 'A bound exists on the number of times other processes can enter CS after a process has made a request. No starvation.', icon: '⏳', color: 'bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/20' },
          ].map(req => (
            <div key={req.title} className={`p-4 rounded-xl border ${req.color}`}>
              <div className="text-2xl mb-2">{req.icon}</div>
              <h4 className="font-bold text-sm mb-1">{req.title}</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400">{req.desc}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700/40">
            <h4 className="font-semibold text-sm mb-2">General Structure</h4>
            <CodeBlock code={`do {
    // ENTRY SECTION
    // acquire lock / wait for turn
    
    // CRITICAL SECTION
    // access shared resource
    
    // EXIT SECTION
    // release lock / signal
    
    // REMAINDER SECTION
    // other code
} while(true);`} />
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700/40">
            <h4 className="font-semibold text-sm mb-2">Race Condition Example</h4>
            <CodeBlock code={`// Shared variable: counter = 5
// Process A: counter++ 
//   (temp = counter; temp++; counter = temp)
// Process B: counter--
//   (temp = counter; temp--; counter = temp)

// If interleaved: counter could be 4, 5, or 6!
// This is a RACE CONDITION`} />
          </div>
        </div>
      </Section>

      {/* Peterson's Solution */}
      <Section title="🎯 Peterson's Solution">
        <p className="text-sm text-slate-600 dark:text-slate-400">A software-based solution for <strong>2 processes</strong>. Uses two shared variables:</p>
        <ul className="text-sm text-slate-600 dark:text-slate-400 list-disc pl-5 space-y-1">
          <li><code className="px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 rounded text-xs">flag[2]</code> — boolean array indicating process wants to enter CS</li>
          <li><code className="px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 rounded text-xs">turn</code> — whose turn it is to enter CS</li>
        </ul>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <CodeBlock title="Process Pi" code={`do {
    flag[i] = TRUE;        // I want to enter
    turn = j;              // Give turn to other
    while (flag[j] && turn == j);
        // Wait if other wants in AND it's their turn
    
    // CRITICAL SECTION
    
    flag[i] = FALSE;       // I'm done
    
    // REMAINDER SECTION
} while(TRUE);`} />
          <CodeBlock title="Process Pj" code={`do {
    flag[j] = TRUE;        // I want to enter
    turn = i;              // Give turn to other
    while (flag[i] && turn == i);
        // Wait if other wants in AND it's their turn
    
    // CRITICAL SECTION
    
    flag[j] = FALSE;       // I'm done
    
    // REMAINDER SECTION
} while(TRUE);`} />
        </div>

        <InfoBox type="exam">
          <strong>Exam Tip:</strong> Prove each requirement is satisfied: (1) ME: Both can't be in CS simultaneously since one will see the other's flag and turn pointing to them. (2) Progress: If one doesn't want to enter (flag=false), other enters immediately. (3) Bounded Waiting: A process waits at most one turn.
        </InfoBox>
      </Section>

      {/* Semaphores */}
      <Section title="🚦 Semaphores, Mutex, Spinlock">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl border border-blue-200 dark:border-blue-500/20 bg-blue-50/50 dark:bg-blue-500/5">
            <h4 className="font-bold text-sm text-blue-600 dark:text-blue-400 mb-2">Mutex (Mutual Exclusion)</h4>
            <ul className="text-xs space-y-1 text-slate-600 dark:text-slate-400">
              <li>• Binary lock: locked/unlocked</li>
              <li>• <strong>Ownership</strong>: Only locking thread can unlock</li>
              <li>• Used for protecting critical sections</li>
              <li>• Operations: lock() / unlock()</li>
            </ul>
          </div>
          <div className="p-4 rounded-xl border border-violet-200 dark:border-violet-500/20 bg-violet-50/50 dark:bg-violet-500/5">
            <h4 className="font-bold text-sm text-violet-600 dark:text-violet-400 mb-2">Binary Semaphore</h4>
            <ul className="text-xs space-y-1 text-slate-600 dark:text-slate-400">
              <li>• Value: 0 or 1 only</li>
              <li>• <strong>No ownership</strong>: any process can signal</li>
              <li>• wait(S): if S&gt;0, S--. Else block.</li>
              <li>• signal(S): S++ (wake blocked process)</li>
            </ul>
          </div>
          <div className="p-4 rounded-xl border border-emerald-200 dark:border-emerald-500/20 bg-emerald-50/50 dark:bg-emerald-500/5">
            <h4 className="font-bold text-sm text-emerald-600 dark:text-emerald-400 mb-2">Counting Semaphore</h4>
            <ul className="text-xs space-y-1 text-slate-600 dark:text-slate-400">
              <li>• Value ≥ 0, unlimited range</li>
              <li>• Controls access to multiple resource instances</li>
              <li>• Example: 5 printers → init semaphore to 5</li>
              <li>• Each wait() decrements, each signal() increments</li>
            </ul>
          </div>
        </div>

        <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700/40">
          <h4 className="font-semibold text-xs mb-1">Spinlock</h4>
          <p className="text-xs text-slate-600 dark:text-slate-400">A lock where the thread <strong>busy-waits</strong> (spins in a loop checking if lock is available). Wastes CPU cycles but avoids context switch overhead. Best for multi-processor systems when critical section is short.</p>
        </div>

        <CodeBlock title="Semaphore Implementation" code={`// Classic (busy-wait / spinlock version)
wait(S) {
    while (S <= 0);   // busy wait
    S--;
}

signal(S) {
    S++;
}

// With no busy-wait (block/wakeup version)
// Each semaphore has a waiting queue
// wait: if S<=0, add process to queue and block()
// signal: if queue not empty, wakeup a process`} />
      </Section>

      {/* Producer-Consumer */}
      <Section title="🏭 Producer-Consumer Problem">
        <p className="text-sm text-slate-600 dark:text-slate-400">A bounded buffer of size N. Producer adds items, consumer removes. Must ensure: buffer not full when producing, not empty when consuming, and mutual exclusion on buffer access.</p>

        <InfoBox type="important">
          <strong>Most Asked! (10 marks)</strong> Memorize this solution. The order of wait() calls matters — always wait on the counting semaphore BEFORE the mutex!
        </InfoBox>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <CodeBlock title="Producer" code={`// Shared: buffer[N], in=0, out=0
// Semaphores: empty=N, full=0, mutex=1

Producer() {
    produce(item);
    
    wait(empty);    // Wait if buffer full
    wait(mutex);    // Enter critical section
    
    buffer[in] = item;
    in = (in + 1) % N;
    
    signal(mutex);  // Exit critical section
    signal(full);   // Increment full count
}`} />
          <CodeBlock title="Consumer" code={`Consumer() {
    wait(full);     // Wait if buffer empty
    wait(mutex);    // Enter critical section
    
    item = buffer[out];
    out = (out + 1) % N;
    
    signal(mutex);  // Exit critical section
    signal(empty);  // Increment empty count
    
    consume(item);
}`} />
        </div>

        <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 text-xs">
          <strong className="text-amber-600 dark:text-amber-400">⚠️ Common Mistake:</strong> Swapping wait(empty) and wait(mutex). If you wait(mutex) first and buffer is full, you'll hold the mutex while waiting → <strong>DEADLOCK!</strong> Always wait on resource semaphore first.
        </div>
      </Section>

      {/* Readers-Writers */}
      <Section title="📖 Readers-Writers Problem">
        <p className="text-sm text-slate-600 dark:text-slate-400">Multiple readers can read simultaneously, but only one writer can write at a time. Writers need exclusive access.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <CodeBlock title="Reader" code={`// Shared: readcount=0
// Semaphores: mutex=1, rw_mutex=1

Reader() {
    wait(mutex);
    readcount++;
    if (readcount == 1)
        wait(rw_mutex);  // First reader locks writer
    signal(mutex);
    
    // READ
    
    wait(mutex);
    readcount--;
    if (readcount == 0)
        signal(rw_mutex); // Last reader unlocks
    signal(mutex);
}`} />
          <CodeBlock title="Writer" code={`Writer() {
    wait(rw_mutex);
    
    // WRITE
    
    signal(rw_mutex);
}`} />
        </div>
        <InfoBox type="tip">
          <strong>Key Insight:</strong> The first reader locks the resource (rw_mutex), and the last reader unlocks it. This allows multiple readers simultaneously while blocking writers. Writers simply lock/unlock rw_mutex for exclusive access. <strong>Note:</strong> Writers may starve in this basic version.
        </InfoBox>
      </Section>

      {/* Dining Philosophers */}
      <Section title="🍽️ Dining Philosophers Problem">
        <p className="text-sm text-slate-600 dark:text-slate-400">5 philosophers sit around a table. Between each pair is one chopstick. To eat, a philosopher needs <strong>BOTH</strong> adjacent chopsticks. If all pick up left chopstick simultaneously → <strong>DEADLOCK</strong>!</p>

        <CodeBlock title="Naive Solution (DEADLOCK possible!)" code={`// Shared: chopstick[5] = {1,1,1,1,1} (semaphores)

Philosopher(i) {
    wait(chopstick[i]);         // Pick left
    wait(chopstick[(i+1) % 5]); // Pick right
    // EAT
    signal(chopstick[i]);       // Put left
    signal(chopstick[(i+1) % 5]); // Put right
    // THINK
}
// DEADLOCK if all pick left simultaneously!`} />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {[
            { title: 'Solution 1: Limit Philosophers', desc: 'Allow only 4 philosophers to sit at the table. This ensures at least one can always get both chopsticks.' },
            { title: 'Solution 2: Odd-Even Pick Order', desc: 'Odd philosophers pick left first, even pick right first. This breaks the circular wait condition.' },
            { title: 'Solution 3: Arbitrator', desc: 'Use a mutex to allow only one philosopher to pick up chopsticks at a time. Pick both or none.' },
          ].map((sol, i) => (
            <div key={i} className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700/40">
              <h4 className="font-semibold text-xs mb-1">{sol.title}</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400">{sol.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* fork() and exec() */}
      <Section title="🔀 fork() and exec()" defaultOpen={false}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700/60 bg-white dark:bg-slate-800/30">
            <h4 className="font-bold text-sm mb-2 text-primary-500">fork()</h4>
            <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1">
              <li>• Creates an <strong>exact copy</strong> of the calling process</li>
              <li>• Child gets copy of parent's memory, FDs, etc.</li>
              <li>• Returns <strong>PID of child</strong> to parent, <strong>0</strong> to child</li>
              <li>• Both processes continue from after fork()</li>
            </ul>
            <CodeBlock code={`pid_t pid = fork();
if (pid == 0) {
    // Child process
} else if (pid > 0) {
    // Parent process
} else {
    // Error
}`} />
          </div>
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700/60 bg-white dark:bg-slate-800/30">
            <h4 className="font-bold text-sm mb-2 text-emerald-500">exec()</h4>
            <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1">
              <li>• <strong>Replaces</strong> current process image with new program</li>
              <li>• Does NOT create a new process (PID stays same)</li>
              <li>• All memory is replaced: code, data, stack, heap</li>
              <li>• If successful, does NOT return (old program is gone)</li>
            </ul>
            <CodeBlock code={`// Typical pattern:
pid_t pid = fork();
if (pid == 0) {
    execlp("/bin/ls", "ls", NULL);
    // Only reaches here if exec fails
    perror("exec failed");
}`} />
          </div>
        </div>
      </Section>

      {/* Hardware Synchronization */}
      <Section title="🔧 Hardware Synchronization" defaultOpen={false}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700/60">
            <h4 className="font-bold text-sm mb-2">Test-and-Set</h4>
            <CodeBlock code={`// Atomic operation
boolean TestAndSet(boolean *target) {
    boolean rv = *target;
    *target = TRUE;
    return rv;
}

// Usage for mutex:
do {
    while (TestAndSet(&lock)); // spin
    // critical section
    lock = FALSE;
    // remainder
} while(true);`} />
          </div>
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700/60">
            <h4 className="font-bold text-sm mb-2">Compare-and-Swap (CAS)</h4>
            <CodeBlock code={`// Atomic operation
int CompareAndSwap(int *ptr, 
                   int expected, 
                   int new) {
    int actual = *ptr;
    if (actual == expected)
        *ptr = new;
    return actual;
}

// Modern CPUs use CAS for 
// lock-free data structures`} />
          </div>
        </div>
      </Section>

      {/* PYQ Section */}
      <Section title="📝 PYQ Questions" defaultOpen={false}>
        <div className="space-y-3">
          {relatedPYQs.map(q => (
            <div key={q.id} className="p-3 rounded-lg bg-white dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/40">
              <div className="flex items-center gap-2 mb-1">
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${q.type === 'long' ? 'bg-rose-100 text-rose-600 dark:bg-rose-500/20 dark:text-rose-400' : q.type === 'numerical' ? 'bg-amber-100 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400' : 'bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400'}`}>{q.type.toUpperCase()} • {q.marks}m</span>
                <span className="text-[10px] text-slate-400">{q.year} • ×{q.frequency}</span>
              </div>
              <p className="text-sm">{q.question}</p>
              {q.keyPoints && <div className="mt-2 text-xs text-slate-500 space-y-0.5"><strong>Key Points:</strong>{q.keyPoints.map((p, i) => <div key={i}>• {p}</div>)}</div>}
            </div>
          ))}
        </div>
      </Section>

      {/* Viva */}
      <Section title="🎤 Viva Questions" defaultOpen={false}>
        <div className="space-y-2 text-sm">
          {[
            { q: 'What is a race condition?', a: 'A situation where the outcome depends on the order/timing of process execution. Results are unpredictable and incorrect.' },
            { q: 'Why can\'t we just use a boolean flag for mutual exclusion?', a: 'Simple flags don\'t satisfy all three requirements. Two processes might both read flag=false and both enter CS. Need atomic operations or more complex algorithms.' },
            { q: 'What is the difference between binary semaphore and mutex?', a: 'Mutex has ownership (only locking thread unlocks). Binary semaphore has no ownership. Mutex is for mutual exclusion, semaphore for signaling.' },
            { q: 'Why does Producer-Consumer use 3 semaphores?', a: 'empty: tracks empty slots (counting). full: tracks filled slots (counting). mutex: ensures exclusive buffer access (binary). Together they synchronize access correctly.' },
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
