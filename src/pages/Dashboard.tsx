import { useApp } from '../context/AppContext';
import { topicAnalysis, pyqData } from '../data/examData';
import { Cpu, Lock, AlertTriangle, MemoryStick, HardDrive, Terminal, Target, TrendingUp, BookOpen, Clock, Flame, Zap, ChevronRight, Award, BarChart3, FileQuestion } from 'lucide-react';

const topics = [
  { id: 'process-management' as const, title: 'Process Management', icon: Cpu, color: 'from-blue-500 to-indigo-600', bgLight: 'bg-blue-50', bgDark: 'bg-blue-500/10', desc: 'CPU Scheduling, Process States, Threads', marks: 40 },
  { id: 'synchronization' as const, title: 'Synchronization', icon: Lock, color: 'from-violet-500 to-purple-600', bgLight: 'bg-violet-50', bgDark: 'bg-violet-500/10', desc: 'Semaphores, Critical Section, Classic Problems', marks: 35 },
  { id: 'deadlocks' as const, title: 'Deadlocks', icon: AlertTriangle, color: 'from-red-500 to-rose-600', bgLight: 'bg-red-50', bgDark: 'bg-red-500/10', desc: "Banker's Algorithm, Prevention, Avoidance", marks: 30 },
  { id: 'memory-management' as const, title: 'Memory Management', icon: MemoryStick, color: 'from-emerald-500 to-green-600', bgLight: 'bg-emerald-50', bgDark: 'bg-emerald-500/10', desc: 'Paging, Page Replacement, Virtual Memory', marks: 28 },
  { id: 'file-io' as const, title: 'File & I/O Management', icon: HardDrive, color: 'from-amber-500 to-orange-600', bgLight: 'bg-amber-50', bgDark: 'bg-amber-500/10', desc: 'Disk Scheduling, Directory Structure', marks: 24 },
  { id: 'system-calls' as const, title: 'OS & System Calls', icon: Terminal, color: 'from-cyan-500 to-teal-600', bgLight: 'bg-cyan-50', bgDark: 'bg-cyan-500/10', desc: 'OS Types, Kernel, System Calls', marks: 20 },
];

export default function Dashboard() {
  const { navigate, progress } = useApp();

  const totalMarks = topics.reduce((s, t) => s + t.marks, 0);
  const completedTopics = Object.keys(progress).filter(k => progress[k] >= 100).length;

  return (
    <div className="space-y-8">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary-600 via-primary-700 to-indigo-800 p-6 md:p-8 text-white">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 text-primary-200 text-sm font-medium mb-2">
            <Flame className="w-4 h-4" />
            <span>Semester IV — Operating Systems</span>
          </div>
          <h1 className="text-2xl md:text-4xl font-bold mb-2">Exam Preparation Hub</h1>
          <p className="text-primary-200 text-sm md:text-base max-w-xl">
            Your complete OS exam prep platform. Master concepts, practice numericals, analyze PYQs, and score maximum marks.
          </p>
          <div className="flex flex-wrap gap-3 mt-5">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/15 text-sm">
              <Target className="w-4 h-4" />
              <span>Exam in <strong>2 Days</strong></span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/15 text-sm">
              <BookOpen className="w-4 h-4" />
              <span>{totalMarks}+ marks coverage</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/15 text-sm">
              <FileQuestion className="w-4 h-4" />
              <span>{pyqData.length} PYQs analyzed</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: 'Total Topics', value: '6', icon: BookOpen, color: 'text-primary-500' },
          { label: 'PYQ Questions', value: String(pyqData.length), icon: FileQuestion, color: 'text-amber-500' },
          { label: 'Formulas', value: '17', icon: Zap, color: 'text-emerald-500' },
          { label: 'Completed', value: `${completedTopics}/6`, icon: Award, color: 'text-violet-500' },
        ].map(stat => (
          <div key={stat.label} className="p-4 rounded-xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60">
            <stat.icon className={`w-5 h-5 ${stat.color} mb-2`} />
            <p className="text-2xl font-bold">{stat.value}</p>
            <p className="text-xs text-slate-500">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* PYQ Analysis Summary */}
      <div className="p-5 rounded-xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-primary-500" />
            <h3 className="font-semibold">PYQ Topic Frequency</h3>
          </div>
          <button onClick={() => navigate('pyq-dashboard')} className="text-xs text-primary-500 hover:text-primary-400 font-medium flex items-center gap-1">
            View All <ChevronRight className="w-3 h-3" />
          </button>
        </div>
        <div className="space-y-2">
          {topicAnalysis.slice(0, 6).map(t => (
            <div key={t.topic} className="flex items-center gap-3">
              <span className="text-xs w-36 truncate font-medium">{t.topic}</span>
              <div className="flex-1 h-5 bg-slate-100 dark:bg-slate-700/50 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${t.importance === 'Critical' ? 'bg-gradient-to-r from-red-500 to-rose-500' : t.importance === 'High' ? 'bg-gradient-to-r from-amber-500 to-orange-500' : 'bg-gradient-to-r from-primary-500 to-violet-500'}`}
                  style={{ width: `${(t.frequency / 20) * 100}%` }}
                />
              </div>
              <span className="text-xs text-slate-500 w-8 text-right">{t.frequency}</span>
            </div>
          ))}
        </div>
        <div className="flex gap-4 mt-3 text-[10px] text-slate-500">
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500" /> Critical</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-500" /> High</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-primary-500" /> Medium</span>
        </div>
      </div>

      {/* Topics Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold">Study Topics</h2>
          <span className="text-xs text-slate-500">Click to start studying</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {topics.map(topic => {
            const Icon = topic.icon;
            const prog = progress[topic.id] || 0;
            return (
              <button
                key={topic.id}
                onClick={() => navigate(topic.id)}
                className="card-hover text-left p-5 rounded-xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 group"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${topic.color} flex items-center justify-center shadow-lg`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-primary-500 transition-colors" />
                </div>
                <h3 className="font-semibold text-sm mb-1">{topic.title}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">{topic.desc}</p>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">~{topic.marks} marks</span>
                  <span className={prog >= 100 ? 'text-emerald-500 font-medium' : 'text-slate-400'}>{prog}%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full mt-1.5 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-primary-500 to-violet-500 rounded-full topic-progress-bar" style={{ width: `${prog}%` }} />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: 'Quick Revision', desc: '5-15 min revision', page: 'revision' as const, icon: Clock, gradient: 'from-violet-500 to-purple-600' },
          { label: 'Formula Sheet', desc: 'All formulas at once', page: 'formulas' as const, icon: Zap, gradient: 'from-emerald-500 to-green-600' },
          { label: 'Flashcards', desc: 'Quick Q&A practice', page: 'flashcards' as const, icon: TrendingUp, gradient: 'from-amber-500 to-orange-600' },
          { label: 'Quiz Mode', desc: 'Test your knowledge', page: 'quiz' as const, icon: Target, gradient: 'from-cyan-500 to-teal-600' },
        ].map(action => (
          <button
            key={action.page}
            onClick={() => navigate(action.page)}
            className="card-hover text-left p-4 rounded-xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60"
          >
            <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${action.gradient} flex items-center justify-center mb-2`}>
              <action.icon className="w-4 h-4 text-white" />
            </div>
            <h4 className="font-semibold text-sm">{action.label}</h4>
            <p className="text-xs text-slate-500">{action.desc}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
