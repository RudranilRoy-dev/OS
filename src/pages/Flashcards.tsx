import { useState, useCallback } from 'react';
import { flashcards } from '../data/examData';
import { Layers, Shuffle, ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react';

export default function Flashcards() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [topicFilter, setTopicFilter] = useState('all');
  const [reviewed, setReviewed] = useState<Set<string>>(new Set());

  const topics = [...new Set(flashcards.map(f => f.topic))];
  const filtered = topicFilter === 'all' ? flashcards : flashcards.filter(f => f.topic === topicFilter);
  const card = filtered[currentIndex];

  const next = useCallback(() => {
    setFlipped(false);
    setCurrentIndex(i => (i + 1) % filtered.length);
  }, [filtered.length]);

  const prev = useCallback(() => {
    setFlipped(false);
    setCurrentIndex(i => (i - 1 + filtered.length) % filtered.length);
  }, [filtered.length]);

  const shuffle = () => {
    setFlipped(false);
    setCurrentIndex(Math.floor(Math.random() * filtered.length));
  };

  const markReviewed = () => {
    if (card) {
      setReviewed(prev => new Set(prev).add(card.id));
    }
    next();
  };

  if (!card) return <div className="text-center py-12 text-slate-500">No cards found for this topic.</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2"><Layers className="w-6 h-6 text-amber-500" /> Flashcards</h1>
          <p className="text-sm text-slate-500 mt-1">Flip cards to reveal answers — test your memory</p>
        </div>
        <select value={topicFilter} onChange={e => { setTopicFilter(e.target.value); setCurrentIndex(0); setFlipped(false); }} className="text-sm px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800">
          <option value="all">All Topics ({flashcards.length})</option>
          {topics.map(t => <option key={t} value={t}>{t} ({flashcards.filter(f => f.topic === t).length})</option>)}
        </select>
      </div>

      {/* Progress */}
      <div className="flex items-center gap-3">
        <div className="flex-1 h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-emerald-500 to-green-500 rounded-full transition-all duration-300" style={{ width: `${(reviewed.size / filtered.length) * 100}%` }} />
        </div>
        <span className="text-xs text-slate-500">{reviewed.size}/{filtered.length} reviewed</span>
      </div>

      {/* Card */}
      <div className="flex justify-center">
        <div className="w-full max-w-2xl flashcard" style={{ minHeight: '320px' }}>
          <div
            className={`flashcard-inner relative w-full cursor-pointer ${flipped ? 'flipped' : ''}`}
            onClick={() => setFlipped(!flipped)}
            style={{ minHeight: '320px' }}
          >
            {/* Front */}
            <div className="flashcard-front absolute inset-0 p-8 rounded-2xl bg-white dark:bg-slate-800/80 border-2 border-primary-200 dark:border-primary-500/30 shadow-xl flex flex-col justify-center items-center text-center">
              <div className="flex items-center gap-2 mb-4">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                  card.difficulty === 'easy' ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400' :
                  card.difficulty === 'medium' ? 'bg-amber-100 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400' :
                  'bg-rose-100 text-rose-600 dark:bg-rose-500/20 dark:text-rose-400'
                }`}>{card.difficulty.toUpperCase()}</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-700 text-slate-500">{card.topic}</span>
              </div>
              <h3 className="text-lg font-bold mb-4">{card.front}</h3>
              <p className="text-xs text-slate-400">Click to reveal answer</p>
            </div>

            {/* Back */}
            <div className="flashcard-back absolute inset-0 p-8 rounded-2xl bg-gradient-to-br from-primary-500 to-violet-600 text-white shadow-xl flex flex-col justify-center">
              <p className="text-sm leading-relaxed whitespace-pre-line">{card.back}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-3">
        <button onClick={prev} className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-sm">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button onClick={shuffle} className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-sm" title="Random card">
          <Shuffle className="w-5 h-5" />
        </button>
        <div className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-sm font-medium">
          {currentIndex + 1} / {filtered.length}
        </div>
        <button onClick={markReviewed} className="p-2.5 rounded-xl bg-emerald-100 dark:bg-emerald-500/20 border border-emerald-200 dark:border-emerald-500/30 hover:bg-emerald-200 dark:hover:bg-emerald-500/30 transition-colors" title="Mark as reviewed & next">
          <CheckCircle className="w-5 h-5 text-emerald-500" />
        </button>
        <button onClick={next} className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-sm">
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Card List */}
      <div className="p-4 rounded-xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60">
        <h3 className="font-semibold text-sm mb-3">All Cards in This Set</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2">
          {filtered.map((c, i) => (
            <button
              key={c.id}
              onClick={() => { setCurrentIndex(i); setFlipped(false); }}
              className={`p-2 rounded-lg text-xs text-left transition-all ${
                i === currentIndex ? 'bg-primary-100 dark:bg-primary-500/20 border-primary-300 dark:border-primary-500 border-2 font-semibold' :
                reviewed.has(c.id) ? 'bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20' :
                'bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/40'
              }`}
            >
              <span className="text-[10px] text-slate-400 block">{c.topic}</span>
              <span className="truncate block">{c.front.slice(0, 30)}...</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
