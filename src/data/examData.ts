/* ─────────── FORMULA SHEET ─────────── */
export interface Formula {
  id: string;
  name: string;
  formula: string;
  description: string;
  topic: string;
}

export const formulas: Formula[] = [
  // CPU Scheduling
  { id: 'f1', name: 'Turnaround Time', formula: 'TAT = CT − AT', description: 'Completion Time minus Arrival Time. Total time a process spends in the system.', topic: 'CPU Scheduling' },
  { id: 'f2', name: 'Waiting Time', formula: 'WT = TAT − BT', description: 'Time a process waits in the ready queue. Turnaround Time minus Burst Time.', topic: 'CPU Scheduling' },
  { id: 'f3', name: 'Average TAT', formula: 'Avg TAT = Σ(TAT) / n', description: 'Sum of all turnaround times divided by number of processes.', topic: 'CPU Scheduling' },
  { id: 'f4', name: 'Average WT', formula: 'Avg WT = Σ(WT) / n', description: 'Sum of all waiting times divided by number of processes.', topic: 'CPU Scheduling' },
  { id: 'f5', name: 'Response Time', formula: 'RT = First Response − Arrival Time', description: 'Time from submission to first response. Important for interactive systems.', topic: 'CPU Scheduling' },
  { id: 'f6', name: 'CPU Utilization', formula: 'CPU Util = (Busy Time / Total Time) × 100%', description: 'Percentage of time CPU is busy executing processes.', topic: 'CPU Scheduling' },
  { id: 'f7', name: 'Throughput', formula: 'Throughput = n / Total Time', description: 'Number of processes completed per unit time.', topic: 'CPU Scheduling' },
  // Memory Management
  { id: 'f8', name: 'Physical Address (Paging)', formula: 'PA = (Frame No × Page Size) + Offset', description: 'Translating logical to physical address using page table.', topic: 'Memory Management' },
  { id: 'f9', name: 'Number of Pages', formula: 'Pages = ⌈Logical Space / Page Size⌉', description: 'Total pages in logical address space.', topic: 'Memory Management' },
  { id: 'f10', name: 'Number of Frames', formula: 'Frames = ⌊Physical Memory / Page Size⌋', description: 'Total frames available in physical memory.', topic: 'Memory Management' },
  { id: 'f11', name: 'Page Table Size', formula: 'PT Size = Pages × Entry Size', description: 'Size of the page table in bytes.', topic: 'Memory Management' },
  { id: 'f12', name: 'TLB Hit Ratio', formula: 'EAT = h × (c + m) + (1−h) × (2m + c)', description: 'Effective Access Time: h=hit ratio, c=TLB access, m=memory access.', topic: 'Memory Management' },
  { id: 'f13', name: 'Page Fault Rate', formula: 'PFR = Page Faults / Total References', description: 'Ratio of page faults to total memory references.', topic: 'Memory Management' },
  // Banker's Algorithm
  { id: 'f14', name: 'Need Matrix', formula: 'Need[i][j] = Max[i][j] − Allocation[i][j]', description: 'Remaining resource need for each process.', topic: 'Deadlocks' },
  { id: 'f15', name: 'Safety Condition', formula: 'Need[i] ≤ Available', description: 'Process can be granted resources only if its need ≤ available.', topic: 'Deadlocks' },
  // Disk Scheduling
  { id: 'f16', name: 'Total Seek Time (FCFS)', formula: 'Σ |Request[i] − Request[i−1]|', description: 'Sum of absolute differences between consecutive requests.', topic: 'Disk Scheduling' },
  { id: 'f17', name: 'Average Seek Time', formula: 'Avg = Total Seek / Num Requests', description: 'Average head movement per request.', topic: 'Disk Scheduling' },
];

/* ─────────── PYQ DATABASE ─────────── */
export interface PYQ {
  id: string;
  year: string;
  marks: number;
  question: string;
  topic: string;
  type: 'theory' | 'numerical' | 'short' | 'long';
  frequency: number; // how many times appeared
  solution?: string;
  keyPoints?: string[];
  commonMistakes?: string[];
}

export const pyqData: PYQ[] = [
  // Process Management
  { id: 'p1', year: '2023', marks: 10, question: 'Explain CPU scheduling algorithms: FCFS, SJF, Round Robin, and Priority Scheduling with examples and Gantt charts.', topic: 'CPU Scheduling', type: 'long', frequency: 5, keyPoints: ['Draw Gantt chart for each', 'Calculate TAT, WT for all processes', 'Compare average waiting times', 'Mention advantages/disadvantages of each'], commonMistakes: ['Forgetting to sort by arrival time in FCFS', 'Not considering processes arriving at same time', 'Wrong TAT/WT calculation'] },
  { id: 'p2', year: '2023', marks: 5, question: 'Differentiate between Process and Thread. Explain user-level and kernel-level threads.', topic: 'Process vs Thread', type: 'short', frequency: 4, keyPoints: ['Process is heavy-weight, thread is light-weight', 'Threads share code/data/heap, processes don\'t', 'User threads managed by library, kernel threads by OS', 'Many-to-one, one-to-one, many-to-many models'] },
  { id: 'p3', year: '2022', marks: 10, question: 'Consider P1(AT=0,BT=5), P2(AT=1,BT=3), P3(AT=2,BT=8), P4(AT=3,BT=6). Calculate average waiting time using FCFS and SJF.', topic: 'CPU Scheduling', type: 'numerical', frequency: 4 },
  { id: 'p4', year: '2022', marks: 5, question: 'Explain the five states of a process with a state transition diagram.', topic: 'Process States', type: 'short', frequency: 3, keyPoints: ['New, Ready, Running, Waiting, Terminated', 'Draw transitions between states', 'Explain each transition condition'] },
  { id: 'p5', year: '2023', marks: 5, question: 'Explain Round Robin scheduling with a time quantum of 2 for processes: P1(AT=0,BT=4), P2(AT=0,BT=3), P3(AT=3,BT=4). Draw Gantt chart.', topic: 'CPU Scheduling', type: 'numerical', frequency: 3 },
  { id: 'p6', year: '2021', marks: 5, question: 'What is a process? Explain process control block (PCB) in detail.', topic: 'Process Basics', type: 'short', frequency: 3, keyPoints: ['Process is program in execution', 'PCB contains: PID, state, PC, registers, memory limits, I/O info, accounting info'] },
  
  // Synchronization
  { id: 's1', year: '2023', marks: 10, question: 'What is the Critical Section Problem? Explain the three requirements. Explain Peterson\'s Solution.', topic: 'Critical Section', type: 'long', frequency: 5, keyPoints: ['Mutual Exclusion, Progress, Bounded Waiting', 'Peterson\'s uses turn and flag variables', 'Prove all 3 requirements are satisfied'], commonMistakes: ['Confusing mutual exclusion with bounded waiting', 'Not explaining how Peterson\'s ensures progress'] },
  { id: 's2', year: '2023', marks: 10, question: 'Explain the Producer-Consumer problem using semaphores. Write the solution with proper synchronization.', topic: 'Producer-Consumer', type: 'long', frequency: 5, keyPoints: ['Use empty, full counting semaphores', 'Use mutex for critical section', 'Producer: wait(empty), wait(mutex), produce, signal(mutex), signal(full)', 'Consumer: wait(full), wait(mutex), consume, signal(mutex), signal(empty)'] },
  { id: 's3', year: '2022', marks: 10, question: 'Explain the Dining Philosophers Problem and provide a solution to prevent deadlock.', topic: 'Dining Philosophers', type: 'long', frequency: 4, keyPoints: ['5 philosophers, 5 chopsticks', 'Deadlock if all pick left first', 'Solutions: allow max 4 to sit, odd-even, arbitrator'], commonMistakes: ['Not addressing starvation', 'Forgetting to explain why deadlock occurs'] },
  { id: 's4', year: '2022', marks: 5, question: 'Differentiate between Mutex and Semaphore. Explain Binary and Counting semaphores.', topic: 'Semaphores', type: 'short', frequency: 4, keyPoints: ['Mutex is binary, owned by locking thread', 'Semaphore can be counting, no ownership concept', 'Binary semaphore: value 0 or 1', 'Counting semaphore: value ≥ 0, controls multiple instances'] },
  { id: 's5', year: '2021', marks: 10, question: 'Explain the Readers-Writers Problem. Provide the solution with proper synchronization.', topic: 'Readers-Writers', type: 'long', frequency: 3, keyPoints: ['Multiple readers can read simultaneously', 'Only one writer at a time', 'Use mutex and readcount', 'First reader locks, last reader unlocks'] },
  { id: 's6', year: '2023', marks: 5, question: 'Explain fork() and exec() system calls with lifecycle visualization.', topic: 'fork/exec', type: 'short', frequency: 3 },
  { id: 's7', year: '2021', marks: 5, question: 'Explain hardware synchronization: Test-and-Set and Compare-and-Swap instructions.', topic: 'Hardware Sync', type: 'short', frequency: 2 },

  // Deadlocks
  { id: 'd1', year: '2023', marks: 10, question: 'Explain the four necessary conditions for deadlock (Coffman Conditions). How can deadlocks be prevented?', topic: 'Deadlock Conditions', type: 'long', frequency: 5, keyPoints: ['Mutual Exclusion, Hold & Wait, No Preemption, Circular Wait', 'Prevention: negate at least one condition', 'Explain each prevention strategy'] },
  { id: 'd2', year: '2023', marks: 10, question: 'Solve using Banker\'s Algorithm: 5 processes P0-P4, 3 resource types A,B,C. Available=[3,3,2]. Given Allocation and Max matrices, find if system is in safe state.', topic: "Banker's Algorithm", type: 'numerical', frequency: 5, keyPoints: ['Calculate Need = Max - Allocation', 'Apply safety algorithm', 'Find safe sequence', 'Show work vector at each step'] },
  { id: 'd3', year: '2022', marks: 5, question: 'Differentiate between Deadlock Prevention and Deadlock Avoidance.', topic: 'Deadlock Handling', type: 'short', frequency: 4, keyPoints: ['Prevention: ensure conditions never hold', 'Avoidance: Banker\'s algorithm, safe state check', 'Prevention is stricter, avoidance allows more concurrency'] },
  { id: 'd4', year: '2021', marks: 5, question: 'What is a Resource Allocation Graph? How does it help in deadlock detection?', topic: 'RAG', type: 'short', frequency: 3 },
  { id: 'd5', year: '2022', marks: 10, question: 'Given 5 processes with Allocation and Max, use Banker\'s Algorithm to determine if granting a request from P1 for (1,0,2) can be granted safely.', topic: "Banker's Algorithm", type: 'numerical', frequency: 3 },

  // Memory Management
  { id: 'm1', year: '2023', marks: 10, question: 'Explain Paging in detail. How is logical address translated to physical address? Solve: Logical address=16 bits, Page size=1KB, Physical memory=64KB, Page table entry=2 bytes.', topic: 'Paging', type: 'long', frequency: 5, keyPoints: ['Calculate page number and offset from logical address', 'Use page table to find frame number', 'PA = Frame × Page Size + Offset', 'Calculate page table size'] },
  { id: 'm2', year: '2023', marks: 10, question: 'Explain page replacement algorithms: FIFO, LRU, and Optimal. Given reference string 7,0,1,2,0,3,0,4,2,3 find page faults with 3 frames.', topic: 'Page Replacement', type: 'numerical', frequency: 5 },
  { id: 'm3', year: '2022', marks: 5, question: 'What is Virtual Memory? Explain Demand Paging and Thrashing.', topic: 'Virtual Memory', type: 'short', frequency: 4, keyPoints: ['Virtual memory allows execution of partially loaded processes', 'Demand paging: pages loaded on demand', 'Thrashing: excessive paging, CPU utilization drops', 'Working set model prevents thrashing'] },
  { id: 'm4', year: '2021', marks: 5, question: 'Explain Belady\'s Anomaly with an example.', topic: 'Page Replacement', type: 'short', frequency: 3, keyPoints: ['More frames can lead to MORE page faults', 'Only happens in FIFO', 'Example: 1,2,3,4,1,2,5,1,2,3,4,5 with 3 vs 4 frames'] },
  { id: 'm5', year: '2022', marks: 10, question: 'Given: Logical address space=32KB, Page size=512 bytes, Physical memory=128KB. Calculate: (a) number of pages (b) number of frames (c) bits for page number (d) bits for offset (e) page table size if each entry=4 bytes.', topic: 'Paging', type: 'numerical', frequency: 3 },

  // File & I/O
  { id: 'io1', year: '2023', marks: 10, question: 'Explain disk scheduling algorithms: FCFS, SSTF, SCAN, C-SCAN with examples. Given queue=98,183,37,122,14,124,65,67, head=53, calculate total head movement.', topic: 'Disk Scheduling', type: 'numerical', frequency: 5 },
  { id: 'io2', year: '2022', marks: 5, question: 'Explain different directory structures with diagrams.', topic: 'Directory Structure', type: 'short', frequency: 3, keyPoints: ['Single-level, Two-level, Tree-structured, Acyclic graph, General graph', 'Draw diagrams for each', 'Explain advantages and disadvantages'] },
  { id: 'io3', year: '2021', marks: 5, question: 'Explain LOOK and C-LOOK disk scheduling algorithms.', topic: 'Disk Scheduling', type: 'short', frequency: 3 },
  { id: 'io4', year: '2022', marks: 5, question: 'What are device drivers? Explain their role in I/O management.', topic: 'Device Drivers', type: 'short', frequency: 2 },

  // OS Basics & System Calls
  { id: 'o1', year: '2023', marks: 5, question: 'Explain the functions of an Operating System.', topic: 'OS Functions', type: 'short', frequency: 3, keyPoints: ['Resource management', 'Process management', 'Memory management', 'File management', 'I/O management', 'Security and protection'] },
  { id: 'o2', year: '2023', marks: 5, question: 'Explain different types of Operating Systems: Batch, Multiprogramming, Time-sharing, Distributed, Real-time.', topic: 'OS Types', type: 'short', frequency: 4 },
  { id: 'o3', year: '2022', marks: 5, question: 'What are System Calls? Explain the five categories of system calls with examples.', topic: 'System Calls', type: 'short', frequency: 4, keyPoints: ['Process control: fork(), exit(), wait()', 'File management: open(), read(), write(), close()', 'Device management: ioctl(), read(), write()', 'Information maintenance: getpid(), alarm(), sleep()', 'Communication: pipe(), shmget(), mmap()'] },
  { id: 'o4', year: '2021', marks: 5, question: 'Differentiate between Kernel mode and User mode. What is a system call interface?', topic: 'Kernel', type: 'short', frequency: 3 },
  { id: 'o5', year: '2022', marks: 5, question: 'What is a monolithic kernel vs microkernel? Compare.', topic: 'Kernel Types', type: 'short', frequency: 2 },
];

/* ─────────── TOPIC FREQUENCY ANALYSIS ─────────── */
export const topicAnalysis = [
  { topic: 'CPU Scheduling', frequency: 20, marks: 40, importance: 'Critical' },
  { topic: "Banker's Algorithm", frequency: 15, marks: 30, importance: 'Critical' },
  { topic: 'Semaphores & Classic Problems', frequency: 18, marks: 35, importance: 'Critical' },
  { topic: 'Page Replacement', frequency: 14, marks: 28, importance: 'High' },
  { topic: 'Paging & Address Translation', frequency: 12, marks: 24, importance: 'High' },
  { topic: 'Disk Scheduling', frequency: 12, marks: 24, importance: 'High' },
  { topic: 'Deadlock Conditions', frequency: 10, marks: 20, importance: 'High' },
  { topic: 'Process vs Thread', frequency: 8, marks: 16, importance: 'Medium' },
  { topic: 'System Calls', frequency: 8, marks: 16, importance: 'Medium' },
  { topic: 'Virtual Memory', frequency: 6, marks: 12, importance: 'Medium' },
  { topic: 'OS Types', frequency: 6, marks: 12, importance: 'Medium' },
  { topic: 'Process States', frequency: 5, marks: 10, importance: 'Low' },
  { topic: 'Directory Structure', frequency: 4, marks: 8, importance: 'Low' },
  { topic: 'Kernel Types', frequency: 3, marks: 6, importance: 'Low' },
];

/* ─────────── QUIZ DATA ─────────── */
export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  topic: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export const quizQuestions: QuizQuestion[] = [
  // CPU Scheduling
  { id: 'q1', question: 'Which scheduling algorithm may cause starvation?', options: ['FCFS', 'SJF', 'Round Robin', 'All of the above'], correct: 1, explanation: 'SJF can cause starvation because long processes may keep getting delayed by shorter processes that arrive continuously.', topic: 'CPU Scheduling', difficulty: 'easy' },
  { id: 'q2', question: 'In Round Robin scheduling, if time quantum is too large, it degenerates to:', options: ['SJF', 'FCFS', 'Priority Scheduling', 'None'], correct: 1, explanation: 'When the time quantum becomes very large (larger than the longest burst time), each process completes in its first turn → FCFS behavior.', topic: 'CPU Scheduling', difficulty: 'easy' },
  { id: 'q3', question: 'The optimal scheduling algorithm (theoretically) is:', options: ['FCFS', 'SJF', 'Optimal (future knowledge)', 'Round Robin'], correct: 2, explanation: 'The Optimal algorithm requires knowledge of future burst times and is only theoretical. SJF is a practical approximation.', topic: 'CPU Scheduling', difficulty: 'medium' },
  { id: 'q4', question: 'Turnaround time = Completion Time − ?', options: ['Burst Time', 'Waiting Time', 'Arrival Time', 'Response Time'], correct: 2, explanation: 'TAT = CT − AT. The total time from arrival to completion.', topic: 'CPU Scheduling', difficulty: 'easy' },
  { id: 'q5', question: 'Which algorithm is preemptive by nature?', options: ['FCFS', 'SJF (non-preemptive)', 'Round Robin', 'None'], correct: 2, explanation: 'Round Robin is inherently preemptive — processes are interrupted after the time quantum expires.', topic: 'CPU Scheduling', difficulty: 'easy' },
  // Synchronization
  { id: 'q6', question: 'The three requirements for the critical section problem are:', options: ['Mutual Exclusion, Progress, Bounded Waiting', 'Mutual Exclusion, Deadlock-free, Starvation-free', 'Synchronization, Progress, Fairness', 'Atomicity, Consistency, Isolation'], correct: 0, explanation: 'The three requirements are Mutual Exclusion (only one in CS), Progress (decide who enters next), Bounded Waiting (no starvation).', topic: 'Synchronization', difficulty: 'easy' },
  { id: 'q7', question: 'A binary semaphore can have values:', options: ['0 and 1', '0 to infinity', '-1 and 0', 'Any positive integer'], correct: 0, explanation: 'Binary semaphore is restricted to 0 and 1, similar to a mutex but without ownership.', topic: 'Synchronization', difficulty: 'easy' },
  { id: 'q8', question: 'In the Producer-Consumer problem, the "empty" semaphore tracks:', options: ['Number of full slots', 'Number of empty slots in buffer', 'Number of producers', 'Buffer size'], correct: 1, explanation: 'The "empty" counting semaphore tracks how many empty slots are available in the buffer.', topic: 'Synchronization', difficulty: 'medium' },
  { id: 'q9', question: 'Peterson\'s Solution works for how many processes?', options: ['1', '2', 'Any number', 'N/2'], correct: 1, explanation: 'Peterson\'s Solution is designed for exactly 2 processes. For more processes, other algorithms like Bakery algorithm are used.', topic: 'Synchronization', difficulty: 'medium' },
  { id: 'q10', question: 'Spinlocks are useful in which scenario?', options: ['Single-processor systems', 'Multi-processor systems with short critical sections', 'Long I/O operations', 'Distributed systems'], correct: 1, explanation: 'Spinlocks waste CPU cycles but avoid context switch overhead. Best when wait time is shorter than a context switch on multi-processor systems.', topic: 'Synchronization', difficulty: 'medium' },
  // Deadlocks
  { id: 'q11', question: 'Which is NOT a Coffman condition for deadlock?', options: ['Mutual Exclusion', 'Hold and Wait', 'Preemption', 'Circular Wait'], correct: 2, explanation: 'The four conditions are: Mutual Exclusion, Hold and Wait, No Preemption (not Preemption), and Circular Wait.', topic: 'Deadlocks', difficulty: 'easy' },
  { id: 'q12', question: 'Banker\'s Algorithm is used for deadlock:', options: ['Prevention', 'Avoidance', 'Detection', 'Recovery'], correct: 1, explanation: "Banker's Algorithm is a deadlock AVOIDANCE technique. It checks if granting a request leads to a safe state.", topic: 'Deadlocks', difficulty: 'easy' },
  { id: 'q13', question: 'The Need matrix in Banker\'s Algorithm is calculated as:', options: ['Allocation − Max', 'Max − Allocation', 'Available − Max', 'Max − Available'], correct: 1, explanation: 'Need[i][j] = Max[i][j] − Allocation[i][j]. It represents the remaining resources each process may need.', topic: 'Deadlocks', difficulty: 'easy' },
  { id: 'q14', question: 'Which deadlock handling strategy does NOT exist?', options: ['Prevention', 'Avoidance', 'Ignorance', 'Acceleration'], correct: 3, explanation: 'The four strategies are: Prevention, Avoidance, Detection & Recovery, and Ignorance (ostrich algorithm). Acceleration is not a strategy.', topic: 'Deadlocks', difficulty: 'medium' },
  { id: 'q15', question: 'A safe state means:', options: ['No deadlock exists', 'A safe sequence of process execution exists', 'All resources are free', 'System has enough resources'], correct: 1, explanation: 'A safe state means there exists at least one sequence (safe sequence) in which all processes can execute to completion without deadlock.', topic: 'Deadlocks', difficulty: 'medium' },
  // Memory
  { id: 'q16', question: 'Belady\'s Anomaly is associated with which page replacement algorithm?', options: ['LRU', 'Optimal', 'FIFO', 'LFU'], correct: 2, explanation: "Belady's Anomaly: increasing the number of frames can increase page faults. This happens ONLY in FIFO.", topic: 'Memory Management', difficulty: 'medium' },
  { id: 'q17', question: 'If logical address is 16 bits and page size is 1KB, how many bits are for offset?', options: ['6', '8', '10', '16'], correct: 2, explanation: 'Page size = 1KB = 2^10 bytes. Offset bits = log2(page size) = log2(1024) = 10 bits.', topic: 'Memory Management', difficulty: 'medium' },
  { id: 'q18', question: 'Thrashing occurs when:', options: ['CPU utilization is high', 'A process spends more time paging than executing', 'Memory is full', 'Disk is slow'], correct: 1, explanation: 'Thrashing: a process is constantly paging in and out, spending more time on paging than actual execution. CPU utilization drops dramatically.', topic: 'Memory Management', difficulty: 'easy' },
  { id: 'q19', question: 'The optimal page replacement algorithm replaces the page that:', options: ['Was loaded first', 'Was least recently used', 'Will not be used for the longest time', 'Has been used most'], correct: 2, explanation: 'Optimal replacement replaces the page that will not be used for the longest period in the future. Not implementable in practice.', topic: 'Memory Management', difficulty: 'easy' },
  { id: 'q20', question: 'In paging, external fragmentation:', options: ['Is very high', 'Is moderate', 'Does not exist', 'Depends on page size'], correct: 2, explanation: 'Paging eliminates external fragmentation because any page can go into any frame. Only internal fragmentation (last page) may exist.', topic: 'Memory Management', difficulty: 'medium' },
  // Disk Scheduling
  { id: 'q21', question: 'Which disk scheduling algorithm has the highest total seek time in most cases?', options: ['FCFS', 'SSTF', 'SCAN', 'C-SCAN'], correct: 0, explanation: 'FCFS processes requests in order of arrival, leading to random head movement and typically the highest total seek time.', topic: 'Disk Scheduling', difficulty: 'easy' },
  { id: 'q22', question: 'The C-SCAN algorithm differs from SCAN by:', options: ['Going only in one direction', 'Being faster', 'Using a queue', 'Being non-preemptive'], correct: 0, explanation: 'C-SCAN (Circular SCAN) moves in only one direction. When it reaches the end, it jumps to the beginning instead of reversing.', topic: 'Disk Scheduling', difficulty: 'medium' },
  { id: 'q23', question: 'SSTF may cause starvation of:', options: ['Inner requests', 'Outer requests', 'Requests far from current head', 'No starvation occurs'], correct: 2, explanation: 'SSTF always services the nearest request. Requests far from the current head position may never get serviced (starvation).', topic: 'Disk Scheduling', difficulty: 'medium' },
  // OS Basics
  { id: 'q24', question: 'Which system call creates a new process in Unix?', options: ['exec()', 'fork()', 'create()', 'spawn()'], correct: 1, explanation: 'fork() creates a new process by duplicating the calling process. The new process is called the child process.', topic: 'System Calls', difficulty: 'easy' },
  { id: 'q25', question: 'A real-time OS must guarantee:', options: ['High throughput', 'Fast response within deadlines', 'Low memory usage', 'Multi-user support'], correct: 1, explanation: 'Real-time OS must guarantee that tasks complete within specified time constraints (deadlines). Correctness depends on both results and timing.', topic: 'OS Basics', difficulty: 'easy' },
];

/* ─────────── FLASHCARD DATA ─────────── */
export interface Flashcard {
  id: string;
  front: string;
  back: string;
  topic: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export const flashcards: Flashcard[] = [
  // Process Management
  { id: 'fl1', front: 'What is a Process?', back: 'A program in execution. It includes the program code (text section), current activity (program counter, processor registers), stack (temporary data), data section (global variables), and heap (dynamically allocated memory).', topic: 'Process Management', difficulty: 'easy' },
  { id: 'fl2', front: 'What is a Thread?', back: 'A basic unit of CPU utilization within a process. Threads share the code section, data section, and OS resources (files, signals) with other threads of the same process but have their own register set, stack, and program counter.', topic: 'Process Management', difficulty: 'easy' },
  { id: 'fl3', front: '5 States of a Process', back: '1. New — being created\n2. Ready — waiting for CPU\n3. Running — executing on CPU\n4. Waiting — waiting for I/O or event\n5. Terminated — finished execution', topic: 'Process Management', difficulty: 'easy' },
  { id: 'fl4', front: 'What is a PCB?', back: 'Process Control Block — data structure containing process information:\n• Process ID (PID)\n• Process State\n• Program Counter\n• CPU Registers\n• Memory limits\n• I/O status\n• Accounting info', topic: 'Process Management', difficulty: 'easy' },
  { id: 'fl5', front: 'TAT = ? WT = ?', back: 'Turnaround Time = Completion Time − Arrival Time\nWaiting Time = TAT − Burst Time\n\nAvg TAT = Σ(TAT)/n\nAvg WT = Σ(WT)/n', topic: 'Process Management', difficulty: 'easy' },
  { id: 'fl6', front: 'FCFS: Pros & Cons', back: 'Pros: Simple, fair (FIFO order)\nCons: Convoy effect (short processes wait for long ones), high average waiting time, non-preemptive', topic: 'Process Management', difficulty: 'medium' },
  { id: 'fl7', front: 'SJF: Pros & Cons', back: 'Pros: Optimal average waiting time, minimum average WT\nCons: Starvation of long processes, requires knowing burst time (impractical), difficult to implement\nVariants: Preemptive (SRTF) and Non-preemptive', topic: 'Process Management', difficulty: 'medium' },
  { id: 'fl8', front: 'Round Robin: Key Points', back: '• Time slicing: each process gets a time quantum\n• Preemptive by nature\n• Fair allocation of CPU\n• If quantum → ∞: becomes FCFS\n• If quantum → 0: excessive context switching\n• Best for time-sharing systems', topic: 'Process Management', difficulty: 'medium' },
  // Synchronization
  { id: 'fl9', front: 'Critical Section Problem: 3 Requirements', back: '1. Mutual Exclusion: Only one process can be in CS at a time\n2. Progress: If CS is empty, processes not in CS decide who enters next (decision made in finite time)\n3. Bounded Waiting: Limit on how many times other processes can enter CS after a process has requested', topic: 'Synchronization', difficulty: 'easy' },
  { id: 'fl10', front: "Peterson's Solution", back: 'For 2 processes (Pi, Pj):\n\nPi: flag[i] = true; turn = j;\n    while(flag[j] && turn == j);\n    // critical section\n    flag[i] = false;\n\nUses: turn variable + flag array\nSatisfies all 3 requirements!', topic: 'Synchronization', difficulty: 'medium' },
  { id: 'fl11', front: 'Binary vs Counting Semaphore', back: 'Binary Semaphore: Value ∈ {0, 1}\n• Like a mutex but without ownership\n• Used for mutual exclusion\n\nCounting Semaphore: Value ≥ 0\n• Controls access to multiple instances of a resource\n• wait(S): while S≤0; S--\n• signal(S): S++', topic: 'Synchronization', difficulty: 'medium' },
  { id: 'fl12', front: 'Producer-Consumer Solution', back: 'Semaphores: empty = N, full = 0, mutex = 1\n\nProducer:\n  wait(empty); wait(mutex)\n  // add to buffer\n  signal(mutex); signal(full)\n\nConsumer:\n  wait(full); wait(mutex)\n  // remove from buffer\n  signal(mutex); signal(empty)', topic: 'Synchronization', difficulty: 'hard' },
  { id: 'fl13', front: 'Readers-Writers: Key Idea', back: '• Multiple readers can read simultaneously\n• Only ONE writer at a time\n• No reader should wait if buffer not being written\n• Uses: mutex (protects readcount), rw_mutex (for writer exclusion), readcount\n• First reader locks, last reader unlocks', topic: 'Synchronization', difficulty: 'hard' },
  { id: 'fl14', front: 'Dining Philosophers Solution', back: 'Problem: 5 philosophers, 5 chopsticks, need 2 to eat\nDeadlock if all pick left first!\nSolutions:\n1. Allow only 4 philosophers at table\n2. Pick chopsticks in different order (odd-even)\n3. Arbitrator: pick both or none\n4. Chandy-Misra (distributed)', topic: 'Synchronization', difficulty: 'medium' },
  { id: 'fl15', front: 'fork() vs exec()', back: 'fork(): Creates exact copy of calling process\n• Returns PID of child to parent, 0 to child\n• Parent and child have different PIDs\n\nexec(): Replaces current process image with new program\n• Does NOT create new process\n• PID stays the same\n• Typically: fork() then exec() in child', topic: 'Synchronization', difficulty: 'medium' },
  // Deadlocks
  { id: 'fl16', front: '4 Coffman Conditions', back: '1. Mutual Exclusion: Resources can\'t be shared\n2. Hold and Wait: Process holds resources while waiting for more\n3. No Preemption: Resources can\'t be forcibly taken\n4. Circular Wait: Circular chain of processes\n\nALL 4 must hold for deadlock!', topic: 'Deadlocks', difficulty: 'easy' },
  { id: 'fl17', front: 'Deadlock Prevention Strategies', back: 'Negate each condition:\n1. ME: Use sharable resources (spooling)\n2. Hold & Wait: Request all resources at once\n3. No Preemption: Preempt resources\n4. Circular Wait: Impose total ordering on resources\n\nPractical trade-off: reduced utilization', topic: 'Deadlocks', difficulty: 'medium' },
  { id: 'fl18', front: "Banker's Algorithm: Safety Algorithm", back: '1. Work = Available, Finish[i] = false\n2. Find i: Finish[i]=false AND Need[i]≤Work\n3. If found: Work += Allocation[i], Finish[i]=true, goto 2\n4. If all Finish[i]=true → SAFE\n\nSafe Sequence: order of execution', topic: 'Deadlocks', difficulty: 'hard' },
  { id: 'fl19', front: 'Prevention vs Avoidance', back: 'Prevention:\n• Ensure conditions never hold\n• Restrictive, reduces resource utilization\n• No runtime check needed\n\nAvoidance:\n• Banker\'s Algorithm\n• Check if request leads to safe state\n• Less restrictive, better utilization\n• Requires advance knowledge (Max)', topic: 'Deadlocks', difficulty: 'medium' },
  // Memory Management
  { id: 'fl20', front: 'Paging: Key Terms', back: 'Page: Fixed-size block of logical memory\nFrame: Fixed-size block of physical memory\nPage Table: Maps page numbers to frame numbers\nOffset: Position within page/frame\n\nPA = (Frame# × PageSize) + Offset\nPages = LogicalSpace / PageSize', topic: 'Memory Management', difficulty: 'easy' },
  { id: 'fl21', front: 'Address Translation Steps', back: '1. Extract page number (p) and offset (d) from logical address\n2. Look up frame number (f) from page table[p]\n3. Physical Address = f × page_size + d\n\nBits for page# = log2(#pages)\nBits for offset = log2(page_size)', topic: 'Memory Management', difficulty: 'medium' },
  { id: 'fl22', front: 'FIFO vs LRU vs Optimal', back: 'FIFO: Replace oldest page\n• Simple, may have Belady\'s Anomaly\n\nLRU: Replace least recently used page\n• Good approximation of optimal, no Belady\'s Anomaly\n\nOptimal: Replace page not used for longest in future\n• Best but impossible to implement (needs future knowledge)', topic: 'Memory Management', difficulty: 'easy' },
  { id: 'fl23', front: "Belady's Anomaly", back: 'In FIFO page replacement:\nMore frames → MORE page faults!\n\nExample: 1,2,3,4,1,2,5,1,2,3,4,5\n• 3 frames: 9 faults\n• 4 frames: 10 faults!\n\nOnly happens in FIFO.\nLRU and Optimal are stack algorithms → immune.', topic: 'Memory Management', difficulty: 'medium' },
  { id: 'fl24', front: 'Virtual Memory & Thrashing', back: 'Virtual Memory: Execute processes not completely in memory\n• Demand Paging: Load pages only when needed\n• Page Fault: Referenced page not in memory\n\nThrashing: Excessive paging activity\n• Process spends more time paging than executing\n• CPU utilization drops sharply\n• Cause: too many processes, insufficient frames\n• Solution: Working Set Model', topic: 'Memory Management', difficulty: 'medium' },
  // Disk Scheduling
  { id: 'fl25', front: '6 Disk Scheduling Algorithms', back: 'FCFS: First come first served\nSSTF: Shortest Seek Time First (nearest)\nSCAN: Elevator algorithm (goes to end, reverses)\nC-SCAN: Circular SCAN (one direction only)\nLOOK: SCAN but only to last request\nC-LOOK: C-SCAN but only to last request', topic: 'Disk Scheduling', difficulty: 'easy' },
  { id: 'fl26', front: 'SCAN vs LOOK', back: 'SCAN: Head moves to END of disk, then reverses\n• Services all requests in path\n• Services requests at disk end even if no requests\n\nLOOK: Head goes only to LAST REQUEST in direction\n• More efficient — doesn\'t go to disk end unnecessarily\n• "Looks" ahead for requests', topic: 'Disk Scheduling', difficulty: 'medium' },
  // OS Basics
  { id: 'fl27', front: '5 Types of Operating Systems', back: '1. Batch OS: Jobs collected, processed in batches\n2. Multiprogramming OS: Multiple jobs in memory, CPU always busy\n3. Time-Sharing OS: CPU switches between users rapidly\n4. Distributed OS: Multiple machines appear as one\n5. Real-Time OS: Guaranteed response times (Hard/Soft)', topic: 'OS Basics', difficulty: 'easy' },
  { id: 'fl28', front: '5 Categories of System Calls', back: '1. Process Control: fork(), exit(), wait()\n2. File Management: open(), read(), write(), close()\n3. Device Management: ioctl(), read(), write()\n4. Information Maintenance: getpid(), alarm(), time()\n5. Communication: pipe(), shmget(), mmap()', topic: 'OS Basics', difficulty: 'easy' },
  { id: 'fl29', front: 'Kernel Mode vs User Mode', back: 'Kernel Mode (privileged):\n• Full hardware access\n• All instructions available\n• OS runs in kernel mode\n\nUser Mode (restricted):\n• Limited hardware access\n• Subset of instructions\n• User applications run here\n• System call → mode switch → kernel mode', topic: 'OS Basics', difficulty: 'easy' },
  { id: 'fl30', front: 'Monolithic vs Microkernel', back: 'Monolithic: All OS services in kernel space\n• Fast (no IPC needed)\n• Large kernel, harder to maintain\n• Example: Linux\n\nMicrokernel: Minimal kernel, services in user space\n• Slower (IPC overhead)\n• More modular, reliable\n• Example: MINIX, Mach', topic: 'OS Basics', difficulty: 'medium' },
];

/* ─────────── REVISION NOTES ─────────── */
export const revisionNotes = {
  '5min': {
    title: '5-Minute Quick Revision',
    items: [
      { heading: 'Formulas', points: ['TAT = CT − AT', 'WT = TAT − BT', 'PA = (Frame# × PageSize) + Offset', 'Need = Max − Allocation'] },
      { heading: 'Key Facts', points: ['SJF causes starvation, FCFS causes convoy effect', 'Belady\'s Anomaly only in FIFO', 'Paging eliminates external fragmentation', 'All 4 Coffman conditions needed for deadlock', 'Peterson\'s Solution: 2 processes only'] },
      { heading: 'Most Asked', points: ['CPU Scheduling numerical (RR, SJF)', 'Banker\'s Algorithm safe sequence', 'Producer-Consumer semaphore solution', 'Page Replacement (FIFO, LRU) step-by-step', 'Disk Scheduling total seek time'] },
    ]
  },
  '15min': {
    title: '15-Minute Revision',
    sections: [
      { title: 'Process Management', points: ['Process vs Thread: Process is heavyweight, thread is lightweight. Threads share code/data/heap', '5 states: New → Ready → Running → Waiting → Terminated', 'FCFS: Simple but convoy effect. SJF: Optimal avg WT but starvation', 'RR: Fair, time quantum critical. Priority: Can cause starvation (aging helps)', 'Always draw Gantt chart in exam. Calculate CT → TAT → WT'] },
      { title: 'Synchronization', points: ['CS Problem: Mutual Exclusion + Progress + Bounded Waiting', 'Peterson\'s: turn + flag variables. Works for 2 processes', 'Semaphore: wait(S)/signal(S). Binary (0,1) vs Counting', 'Producer-Consumer: empty, full, mutex semaphores', 'Readers-Writers: Multiple readers OR one writer', 'Dining Philosophers: Resource ordering to prevent deadlock'] },
      { title: 'Deadlocks', points: ['4 Coffman Conditions: ME + Hold&Wait + No Preemption + Circular Wait', 'Prevention: Negate conditions. Avoidance: Banker\'s Algorithm', 'Banker\'s: Need = Max − Allocation. Find safe sequence', 'Safety: Work=Available, find process where Need≤Work'] },
      { title: 'Memory', points: ['Paging: No external fragmentation, possible internal fragmentation', 'Address translation: Extract page# and offset, lookup frame#', 'FIFO: Oldest page out. LRU: Recent history. Optimal: Future knowledge', 'Virtual Memory: Demand paging, page faults, thrashing', 'TLB: Speeds up address translation, hit ratio matters'] },
      { title: 'Disk & I/O', points: ['FCFS: Simple, high seek. SSTF: Greedy nearest, may starve', 'SCAN: Elevator, goes to end. C-SCAN: One direction only', 'LOOK: Stop at last request. C-LOOK: Circular + LOOK'] },
    ]
  },
  '30min': {
    title: '30-Minute Deep Revision',
    note: 'Review all formulas, practice numerical problems, and go through PYQ solutions.'
  },
  'nightBefore': {
    title: 'Night Before Exam',
    priorities: [
      'Master CPU Scheduling numericals (FCFS, SJF, RR) — 10 marks guaranteed',
      'Practice Banker\'s Algorithm step-by-step — 10 marks',
      'Memorize Producer-Consumer semaphore solution — 10 marks',
      'Practice Page Replacement (FIFO, LRU) — 10 marks',
      'Learn Disk Scheduling calculations — 10 marks',
      'Revise 4 Coffman conditions and prevention/avoidance — 5-10 marks',
      'Know Process vs Thread differences — 5 marks',
      'Know System Call categories with examples — 5 marks',
      'Understand Virtual Memory and Thrashing — 5 marks',
      'Revise OS Types and Kernel types — 5 marks',
    ]
  }
};
