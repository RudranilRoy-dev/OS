import { useState, useMemo } from 'react';
import { quizQuestions } from '../data/examData';
import { HelpCircle, CheckCircle, XCircle, RotateCcw, ArrowRight, Trophy } from 'lucide-react';

export default function QuizMode() {
  const [topicFilter, setTopicFilter] = useState('all');
  const [difficulty, setDifficulty] = useState<'all' | 'easy' | 'medium' | 'hard'>('all');
  const [started, setStarted] = useState(false);
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState<number[]>([]);
  const [finished, setFinished] = useState(false);

  const filtered = useMemo(() => {
    return quizQuestions.filter(q => {
      if (topicFilter !== 'all' && q.topic !== topicFilter) return false;
      if (difficulty !== 'all' && q.difficulty !== difficulty) return false;
      return true;
    });
  }, [topicFilter, difficulty]);

  const topics = [...new Set(quizQuestions.map(q => q.topic))];

  const startQuiz = () => {
    setStarted(true);
    setCurrentQ(0);
    setSelected(null);
    setShowAnswer(false);
    setScore(0);
    setAnswered([]);
    setFinished(false);
  };

  const handleSelect = (idx: number) => {
    if (showAnswer) return;
    setSelected(idx);
    setShowAnswer(true);
    if (idx === filtered[currentQ].correct) {
      setScore(s => s + 1);
    }
    setAnswered(prev => [...prev, idx]);
  };

  const nextQuestion = () => {
    if (currentQ + 1 >= filtered.length) {
      setFinished(true);
    } else {
      setCurrentQ(i => i + 1);
      setSelected(null);
      setShowAnswer(false);
    }
  };

  // Not started: show setup
  if (!started) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2"><HelpCircle className="w-6 h-6 text-cyan-500" /> Quiz Mode</h1>
          <p className="text-sm text-slate-500 mt-1">Test your knowledge with MCQs</p>
        </div>

        <div className="max-w-lg mx-auto space-y-6">
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60">
            <h3 className="font-semibold mb-4">Configure Quiz</h3>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-slate-600 dark:text-slate-300 block mb-1">Topic</label>
                <select value={topicFilter} onChange={e => setTopicFilter(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-sm">
                  <option value="all">All Topics</option>
                  {topics.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>

              <div>
                <label className="text-sm font-medium text-slate-600 dark:text-slate-300 block mb-1">Difficulty</label>
                <select value={difficulty} onChange={e => setDifficulty(e.target.value as any)} className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-sm">
                  <option value="all">All Levels</option>
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>

              <div className="text-sm text-slate-500">
                {filtered.length} questions available
              </div>

              <button
                onClick={startQuiz}
                disabled={filtered.length === 0}
                className="w-full py-3 bg-gradient-to-r from-cyan-500 to-teal-600 text-white rounded-xl font-semibold text-sm shadow-lg shadow-cyan-500/25 hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Start Quiz ({filtered.length} Questions)
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Finished: show results
  if (finished) {
    const percentage = Math.round((score / filtered.length) * 100);
    const grade = percentage >= 90 ? 'A+' : percentage >= 80 ? 'A' : percentage >= 70 ? 'B' : percentage >= 60 ? 'C' : percentage >= 50 ? 'D' : 'F';
    const gradeColor = percentage >= 70 ? 'text-emerald-500' : percentage >= 50 ? 'text-amber-500' : 'text-rose-500';

    return (
      <div className="space-y-6">
        <div className="text-center py-8 max-w-md mx-auto">
          <Trophy className={`w-16 h-16 mx-auto mb-4 ${gradeColor}`} />
          <h2 className="text-3xl font-bold mb-2">Quiz Complete!</h2>
          <div className={`text-6xl font-bold ${gradeColor} mb-2`}>{grade}</div>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            {score} out of {filtered.length} correct ({percentage}%)
          </p>
          <div className="mt-6 space-y-3">
            <button onClick={startQuiz} className="w-full py-3 bg-gradient-to-r from-cyan-500 to-teal-600 text-white rounded-xl font-semibold shadow-lg">
              <RotateCcw className="w-4 h-4 inline mr-2" />Retry Quiz
            </button>
            <button onClick={() => setStarted(false)} className="w-full py-3 bg-slate-100 dark:bg-slate-800 rounded-xl font-semibold text-sm">
              Change Settings
            </button>
          </div>
        </div>

        {/* Review Answers */}
        <div className="space-y-3">
          <h3 className="font-semibold">Review Answers</h3>
          {filtered.map((q, i) => {
            const userAnswer = answered[i];
            const isCorrect = userAnswer === q.correct;
            return (
              <div key={q.id} className={`p-4 rounded-xl border ${isCorrect ? 'bg-emerald-50/50 dark:bg-emerald-500/5 border-emerald-200 dark:border-emerald-500/20' : 'bg-rose-50/50 dark:bg-rose-500/5 border-rose-200 dark:border-rose-500/20'}`}>
                <div className="flex items-start gap-2 mb-2">
                  {isCorrect ? <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" /> : <XCircle className="w-4 h-4 text-rose-500 mt-0.5 flex-shrink-0" />}
                  <p className="text-sm font-medium">{q.question}</p>
                </div>
                <div className="pl-6 text-xs space-y-1">
                  {!isCorrect && <p className="text-rose-500">Your answer: {q.options[userAnswer!]}</p>}
                  <p className="text-emerald-600 dark:text-emerald-400">Correct: {q.options[q.correct]}</p>
                  <p className="text-slate-500 mt-1">{q.explanation}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // Active quiz
  const question = filtered[currentQ];
  const progress = ((currentQ + 1) / filtered.length) * 100;

  return (
    <div className="space-y-6">
      {/* Progress bar */}
      <div className="flex items-center gap-3">
        <div className="flex-1 h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-cyan-500 to-teal-500 rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
        </div>
        <span className="text-xs text-slate-500">{currentQ + 1}/{filtered.length}</span>
        <span className="text-xs font-semibold text-emerald-500">{score} ✓</span>
      </div>

      {/* Question */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60">
        <div className="flex items-center gap-2 mb-4">
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
            question.difficulty === 'easy' ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400' :
            question.difficulty === 'medium' ? 'bg-amber-100 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400' :
            'bg-rose-100 text-rose-600 dark:bg-rose-500/20 dark:text-rose-400'
          }`}>{question.difficulty.toUpperCase()}</span>
          <span className="text-[10px] px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-700 text-slate-500">{question.topic}</span>
        </div>

        <h3 className="text-lg font-bold mb-6">{question.question}</h3>

        {/* Options */}
        <div className="space-y-3">
          {question.options.map((opt, i) => {
            const isSelected = selected === i;
            const isCorrect = i === question.correct;
            let optClass = 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/30 hover:border-primary-300 dark:hover:border-primary-500 cursor-pointer';

            if (showAnswer) {
              if (isCorrect) optClass = 'border-emerald-300 dark:border-emerald-500 bg-emerald-50 dark:bg-emerald-500/10';
              else if (isSelected && !isCorrect) optClass = 'border-rose-300 dark:border-rose-500 bg-rose-50 dark:bg-rose-500/10';
              else optClass = 'border-slate-200 dark:border-slate-700 opacity-50';
            } else if (isSelected) {
              optClass = 'border-primary-300 dark:border-primary-500 bg-primary-50 dark:bg-primary-500/10';
            }

            return (
              <button
                key={i}
                onClick={() => handleSelect(i)}
                disabled={showAnswer}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all ${optClass} flex items-center gap-3`}
              >
                <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0 ${
                  showAnswer && isCorrect ? 'bg-emerald-500 text-white' :
                  showAnswer && isSelected && !isCorrect ? 'bg-rose-500 text-white' :
                  isSelected ? 'bg-primary-500 text-white' :
                  'bg-slate-100 dark:bg-slate-700 text-slate-500'
                }`}>
                  {String.fromCharCode(65 + i)}
                </span>
                <span className="text-sm">{opt}</span>
                {showAnswer && isCorrect && <CheckCircle className="w-5 h-5 text-emerald-500 ml-auto" />}
                {showAnswer && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-rose-500 ml-auto" />}
              </button>
            );
          })}
        </div>

        {/* Explanation */}
        {showAnswer && (
          <div className="mt-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700/40 animate-fade-in">
            <p className="text-xs font-semibold mb-1">Explanation:</p>
            <p className="text-sm text-slate-600 dark:text-slate-400">{question.explanation}</p>
          </div>
        )}

        {/* Next button */}
        {showAnswer && (
          <button onClick={nextQuestion} className="mt-4 px-6 py-2.5 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl font-semibold text-sm shadow-lg shadow-primary-500/25 hover:shadow-xl transition-all flex items-center gap-2">
            {currentQ + 1 >= filtered.length ? 'See Results' : 'Next Question'} <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
