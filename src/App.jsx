import React, { useEffect, useMemo, useState } from 'react';
import {
  ArrowRight,
  BookOpenText,
  CheckCircle2,
  RotateCcw,
  Trophy,
  XCircle,
} from 'lucide-react';

const QUESTIONS = [
  {
    id: 1,
    prompt: 'Choisissez la forme négative correcte : « Elle boit quelque chose. »',
    options: ['Elle ne boit jamais.', 'Elle ne boit rien.', 'Elle ne boit personne.'],
    answer: 'Elle ne boit rien.',
    explanation: 'Pour nier une chose, on utilise « ne ... rien ».',
  },
  {
    id: 2,
    prompt: 'Choisissez la forme négative correcte : « Je connais quelqu’un ici. »',
    options: ['Je ne connais rien ici.', 'Je ne connais personne ici.', 'Je ne connais plus ici.'],
    answer: 'Je ne connais personne ici.',
    explanation: 'Pour nier une personne, on utilise « ne ... personne ».',
  },
  {
    id: 3,
    prompt: 'Choisissez la forme négative correcte : « Nous allons souvent au cinéma. »',
    options: ['Nous n’allons jamais au cinéma.', 'Nous n’allons plus au cinéma.', 'Nous ne voyons rien au cinéma.'],
    answer: 'Nous n’allons jamais au cinéma.',
    explanation: 'Pour nier une habitude ou une fréquence, on utilise « ne ... jamais ».',
  },
  {
    id: 4,
    prompt: 'Choisissez la forme négative correcte : « Il travaille encore ici. »',
    options: ['Il ne travaille jamais ici.', 'Il ne travaille plus ici.', 'Il ne travaille rien ici.'],
    answer: 'Il ne travaille plus ici.',
    explanation: 'Pour exprimer un changement de situation, on utilise « ne ... plus ».',
  },
  {
    id: 5,
    prompt: 'Choisissez la forme négative correcte : « J’ai déjà vu ce film. »',
    options: ['Je n’ai plus vu ce film.', 'Je n’ai jamais vu ce film.', 'Je n’ai vu personne.'],
    answer: 'Je n’ai jamais vu ce film.',
    explanation: 'Ici, « déjà » se transforme avec « ne ... jamais ».',
  },
  {
    id: 6,
    prompt: 'Complétez la négation à partir de la phrase de départ : « Je mange quelque chose. » → « Je ne mange _____. »',
    options: ['jamais', 'personne', 'rien'],
    answer: 'rien',
    explanation: 'On utilise « rien » pour nier une chose : « quelque chose » → « rien ».',
  },
  {
    id: 7,
    prompt: 'Complétez la négation à partir de la phrase de départ : « Nous connaissons quelqu’un dans cette ville. » → « Nous ne connaissons _____ dans cette ville. »',
    options: ['personne', 'rien', 'plus'],
    answer: 'personne',
    explanation: 'On utilise « personne » pour nier une personne : « quelqu’un » → « personne ».',
  },
  {
    id: 8,
    prompt: 'Complétez la négation à partir de la phrase de départ : « Il regarde souvent la télévision. » → « Il ne regarde _____ la télévision. »',
    options: ['plus', 'rien', 'jamais'],
    answer: 'jamais',
    explanation: 'On utilise « jamais » pour nier une fréquence ou une habitude : « souvent » → « jamais ».',
  },
  {
    id: 9,
    prompt: 'Complétez la négation à partir de la phrase de départ : « Elle habite encore à Bogotá. » → « Elle n’habite _____ à Bogotá. »',
    options: ['personne', 'plus', 'rien'],
    answer: 'plus',
    explanation: 'On utilise « plus » pour exprimer un changement de situation : « encore » → « ne ... plus ».',
  },
  {
    id: 10,
    prompt: 'Complétez la négation à partir de la phrase de départ : « Vous avez rencontré quelqu’un hier. » → « Vous n’avez rencontré _____ hier. »',
    options: ['jamais', 'personne', 'plus'],
    answer: 'personne',
    explanation: 'Ici, on nie la présence d’une personne : « quelqu’un » → « personne ».',
  },
  {
    id: 11,
    prompt: 'Choisissez la phrase correcte.',
    options: ['Je ne vois rien personne.', 'Je ne vois personne.', 'Je vois ne personne.'],
    answer: 'Je ne vois personne.',
    explanation: 'La structure correcte est « ne ... personne ».',
  },
  {
    id: 12,
    prompt: 'Choisissez la phrase correcte.',
    options: ['Nous ne allons jamais au parc.', 'Nous allons ne jamais au parc.', 'Nous n’allons jamais au parc.'],
    answer: 'Nous n’allons jamais au parc.',
    explanation: 'Au présent, la négation encadre le verbe conjugué.',
  },
  {
    id: 13,
    prompt: 'Choisissez la phrase correcte.',
    options: ['Il ne travaille plus pas ici.', 'Il ne travaille plus ici.', 'Il plus ne travaille ici.'],
    answer: 'Il ne travaille plus ici.',
    explanation: 'Ici, « ne ... plus » suffit.',
  },
  {
    id: 14,
    prompt: 'Choisissez la phrase correcte.',
    options: ['Elle n’a mangé rien.', 'Elle n’a rien mangé.', 'Elle ne rien a mangé.'],
    answer: 'Elle n’a rien mangé.',
    explanation: 'Au passé composé, « rien » se place après l’auxiliaire.',
  },
  {
    id: 15,
    prompt: 'Choisissez la phrase correcte.',
    options: ['Personne ne est venu.', 'Personne n’est venu.', 'Ne personne est venu.'],
    answer: 'Personne n’est venu.',
    explanation: 'Quand « personne » est sujet, il se place avant le verbe.',
  },
  {
    id: 16,
    prompt: 'Choisissez la phrase correcte au présent :',
    options: ['Je ne danse pas.', 'Je danse ne pas.', 'Je ne pas danse.'],
    answer: 'Je ne danse pas.',
    explanation: 'Au présent, la négation encadre le verbe conjugué.',
  },
  {
    id: 17,
    prompt: 'Choisissez la phrase correcte au passé composé :',
    options: ['Il n’a pas mangé.', 'Il a ne pas mangé.', 'Il n’a mangé pas.'],
    answer: 'Il n’a pas mangé.',
    explanation: 'Au passé composé, la négation encadre l’auxiliaire.',
  },
  {
    id: 18,
    prompt: 'Choisissez la phrase correcte quand « personne » est sujet :',
    options: ['Personne n’est là.', 'Ne personne est là.', 'Personne est ne là.'],
    answer: 'Personne n’est là.',
    explanation: '« Personne » sujet se place avant le verbe.',
  },
  {
    id: 19,
    prompt: 'Choisissez la phrase correcte quand « personne » est COD :',
    options: ['Je ne personne connais.', 'Je ne connais personne.', 'Je connais ne personne.'],
    answer: 'Je ne connais personne.',
    explanation: 'Quand « personne » est COD, il se place après le verbe.',
  },
  {
    id: 20,
    prompt: 'Choisissez la phrase correcte au passé composé :',
    options: ['Nous n’avons jamais vu ce film.', 'Nous avons ne jamais vu ce film.', 'Nous n’avons vu jamais ce film.'],
    answer: 'Nous n’avons jamais vu ce film.',
    explanation: 'Avec « jamais », la négation se place autour de l’auxiliaire.',
  },
];

const REMINDERS = [
  {
    title: 'ne ... rien',
    note: 'une chose',
    example: 'Elle boit quelque chose. → Elle ne boit rien.',
  },
  {
    title: 'ne ... personne',
    note: 'une personne',
    example: 'Je connais quelqu’un. → Je ne connais personne.',
  },
  {
    title: 'ne ... jamais',
    note: 'le temps / la fréquence',
    example: 'Nous allons souvent au théâtre. → Nous n’allons jamais au théâtre.',
  },
  {
    title: 'ne ... plus',
    note: 'un changement',
    example: 'Il travaille encore ici. → Il ne travaille plus ici.',
  },
];

const DATA_TESTS = [
  QUESTIONS.length === 20,
  REMINDERS.length === 4,
  QUESTIONS.every((question) => Array.isArray(question.options) && question.options.includes(question.answer)),
  QUESTIONS.every((question) => typeof question.prompt === 'string' && question.prompt.length > 0),
];

if (typeof console !== 'undefined' && DATA_TESTS.some((value) => !value)) {
  console.warn('NegationApp data sanity checks failed.', DATA_TESTS);
}

function highlightNegation(text) {
  const tokens = ['ne', "n'", 'n’', 'pas', 'rien', 'personne', 'jamais', 'plus'];
  const value = String(text ?? '');
  const parts = value.split(/(n['’]|\bne\b|\bpas\b|\brien\b|\bpersonne\b|\bjamais\b|\bplus\b)/gi);

  return parts.map((part, index) => {
    if (tokens.includes(part.toLowerCase())) {
      return (
        <strong key={index} className="font-black text-slate-900">
          {part}
        </strong>
      );
    }

    return <React.Fragment key={index}>{part}</React.Fragment>;
  });
}

function buildFeedback(question, answer) {
  const correct = answer === question.answer;

  return {
    correct,
    message: correct
      ? question.explanation
      : `${question.explanation} Bonne réponse : « ${question.answer} ».`,
  };
}

function Header({ started, score, currentIndex, total }) {
  const progress = started ? (currentIndex / total) * 100 : 0;

  return (
    <div className="rounded-[28px] border border-white/15 bg-gradient-to-r from-slate-950 via-blue-950 to-sky-900 px-4 py-3.5 shadow-xl backdrop-blur md:px-5 md:py-4">
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 via-cyan-500 to-blue-700 text-white shadow-lg ring-1 ring-white/30 md:h-12 md:w-12">
            <BookOpenText className="h-5 w-5 md:h-6 md:w-6" />
          </div>
          <div className="min-w-0">
            <h1 className="text-2xl font-black leading-tight tracking-tight text-white md:text-3xl">
              La négation
            </h1>
            <p className="mt-1 max-w-2xl text-[11px] leading-relaxed text-white/80 md:text-sm">
              Objectif : utiliser correctement <strong>ne ... rien</strong>, <strong>ne ... personne</strong>,
              <strong> ne ... jamais</strong> et <strong>ne ... plus</strong>.
            </p>
          </div>
        </div>

        <div className="flex shrink-0 items-start gap-2">
          <div className="min-w-[62px] rounded-xl border border-white/10 bg-white/10 px-2.5 py-1.5 text-center shadow-sm backdrop-blur-sm">
            <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-white/60">Score</p>
            <p className="mt-1 text-sm font-black leading-none text-white md:text-base">{score}</p>
          </div>
          <div className="min-w-[72px] rounded-xl border border-white/10 bg-white/10 px-2.5 py-1.5 text-center shadow-sm backdrop-blur-sm">
            <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-white/60">Question</p>
            <p className="mt-1 text-sm font-black leading-none text-white md:text-base">
              {started ? `${Math.min(currentIndex + 1, total)}/${total}` : `0/${total}`}
            </p>
          </div>
          <div className="min-w-[58px] rounded-xl border border-white/10 bg-white/10 px-2.5 py-1.5 text-center shadow-sm backdrop-blur-sm">
            <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-white/60">XP</p>
            <p className="mt-1 text-sm font-black leading-none text-white md:text-base">{score * 10}</p>
          </div>
        </div>
      </div>

      <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/15">
        <div
          className="h-full rounded-full bg-gradient-to-r from-sky-500 via-cyan-500 to-blue-700 transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

function ModalShell({ open, onClose, title, subtitle, children }) {
  useEffect(() => {
    if (!open) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, onClose]);

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-3 py-4">
      <button
        type="button"
        aria-label="Fermer"
        className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative z-10 w-full max-w-5xl overflow-hidden rounded-[28px] border border-white/70 bg-white/96 shadow-2xl">
        <div className="bg-gradient-to-r from-sky-600 via-cyan-600 to-blue-700 px-4 py-4 text-white md:px-5">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/15 ring-1 ring-white/20">
                <BookOpenText className="h-5 w-5" />
              </div>
              <div>
                <p className="text-lg font-black md:text-xl">{title}</p>
                <p className="mt-0.5 text-xs text-white/85 md:text-sm">{subtitle}</p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="rounded-xl bg-white/15 px-3 py-2 text-xs font-black text-white transition hover:bg-white/20 md:text-sm"
            >
              Fermer
            </button>
          </div>
        </div>

        <div className="max-h-[70vh] overflow-y-auto p-4 md:p-5">{children}</div>
      </div>
    </div>
  );
}

function ReminderModal({ open, onClose }) {
  return (
    <ModalShell
      open={open}
      onClose={onClose}
      title="Rappel"
      subtitle="Les règles essentielles pour comprendre et utiliser la négation."
    >
      <div className="grid gap-3 text-xs leading-relaxed md:grid-cols-2 md:text-sm xl:grid-cols-4">
        {REMINDERS.map((card) => (
          <div key={card.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-3.5 shadow-sm">
            <p className="font-black text-slate-800">{card.title}</p>
            <p className="mt-0.5 text-[11px] font-semibold text-cyan-700 md:text-xs">{card.note}</p>
            <p className="mt-1.5 text-slate-600">{highlightNegation(card.example)}</p>
          </div>
        ))}
      </div>

      <div className="mt-4 grid gap-3 text-sm md:text-[15px] lg:grid-cols-3">
        <div className="rounded-2xl border border-cyan-100 bg-cyan-50 p-3.5">
          <p className="font-black text-slate-800">Au présent</p>
          <p className="mt-1 text-slate-700">
            Les deux parties de la négation se placent juste avant et après le verbe :
            <span className="font-semibold"> Je ne danse pas.</span>
          </p>
        </div>
        <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-3.5">
          <p className="font-black text-slate-800">Au passé composé</p>
          <p className="mt-1 text-slate-700">
            Avec <strong>pas</strong>, <strong>plus</strong>, <strong>rien</strong> et <strong>jamais</strong>, la négation
            encadre l’auxiliaire : <span className="font-semibold">Il n’a rien mangé.</span>
          </p>
        </div>
        <div className="rounded-2xl border border-violet-100 bg-violet-50 p-3.5">
          <p className="font-black text-slate-800">Attention à personne</p>
          <p className="mt-1 text-slate-700">
            <strong>Personne</strong> sujet : <span className="font-semibold">Personne n’est venu.</span>
          </p>
          <p className="mt-1 text-slate-700">
            <strong>Personne</strong> COD : <span className="font-semibold">Je ne connais personne.</span>
          </p>
        </div>
      </div>
    </ModalShell>
  );
}

function AnswersModal({ open, onClose, answers }) {
  return (
    <ModalShell
      open={open}
      onClose={onClose}
      title="Voir les réponses"
      subtitle="Consulte les réponses données et les bonnes réponses pour chaque question."
    >
      <div className="mx-auto max-w-4xl space-y-2.5">
        {QUESTIONS.map((question, index) => {
          const userAnswer = answers[question.id] ?? '—';
          const isCorrect = answers[question.id] === question.answer;

          return (
            <div key={question.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-3 shadow-sm">
              <p className="text-center text-[11px] font-black uppercase tracking-[0.16em] text-cyan-700">Question {index + 1}</p>
              <p className="mt-1 text-center text-sm md:text-[15px] font-black leading-snug text-slate-800">{question.prompt}</p>
              <div className="mx-auto mt-3 grid max-w-3xl gap-2 md:grid-cols-2">
                <div
                  className={`rounded-xl border p-2.5 text-center ${
                    isCorrect ? 'border-emerald-200 bg-emerald-50' : 'border-rose-200 bg-rose-50'
                  }`}
                >
                  <p className="text-[10px] font-black uppercase tracking-wide text-slate-500">Ta réponse</p>
                  <p className={`mt-1 text-sm font-semibold ${isCorrect ? 'text-emerald-800' : 'text-rose-800'}`}>
                    {userAnswer}
                  </p>
                </div>
                <div className="rounded-xl border border-cyan-200 bg-cyan-50 p-2.5 text-center">
                  <p className="text-[10px] font-black uppercase tracking-wide text-slate-500">Bonne réponse</p>
                  <p className="mt-1 text-sm font-semibold text-cyan-900">{question.answer}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </ModalShell>
  );
}

function Home({ hasProgress, onStart, onResetProgress }) {
  return (
    <div className="rounded-[26px] border border-white/15 bg-gradient-to-br from-slate-950 via-blue-950 to-sky-900 p-4 text-white shadow-xl md:p-5">
      <div className="flex items-center gap-2">
        <BookOpenText className="h-5 w-5 text-cyan-300" />
        <h3 className="text-lg font-black text-white md:text-xl">Fonctionnement</h3>
      </div>
      <p className="mt-1 text-sm text-white/70">Les structures essentielles pour bien utiliser la négation.</p>

      <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
        {REMINDERS.map((card) => (
          <div key={card.title} className="rounded-2xl border border-white/10 bg-white/10 p-3 backdrop-blur-sm">
            <p className="font-black text-white">{card.title}</p>
            <p className="mt-0.5 text-[11px] font-semibold text-cyan-200 md:text-xs">{card.note}</p>
            <p className="mt-1.5 text-sm text-white/80">{highlightNegation(card.example)}</p>
          </div>
        ))}
      </div>

      <div className="mt-4 grid gap-2.5 text-sm md:text-[15px]">
        <div className="rounded-2xl border border-cyan-400/15 bg-cyan-400/10 p-3">
          <p className="font-black text-white">Au présent</p>
          <p className="mt-1 text-white/80">
            Les deux parties de la négation se placent juste avant et après le verbe :
            <span className="font-semibold text-white"> Je ne danse pas.</span>
          </p>
        </div>
        <div className="rounded-2xl border border-emerald-400/15 bg-emerald-400/10 p-3">
          <p className="font-black text-white">Au passé composé</p>
          <p className="mt-1 text-white/80">
            Avec <strong className="text-white">pas</strong>, <strong className="text-white">plus</strong>,{' '}
            <strong className="text-white">rien</strong> et <strong className="text-white">jamais</strong>, la négation encadre
            l’auxiliaire : <span className="font-semibold text-white">Il n’a rien mangé.</span>
          </p>
        </div>
        <div className="rounded-2xl border border-violet-400/15 bg-violet-400/10 p-3">
          <p className="font-black text-white">Attention à personne</p>
          <p className="mt-1 text-white/80">
            <strong className="text-white">Personne</strong> sujet :{' '}
            <span className="font-semibold text-white">Personne n’est venu.</span>
          </p>
          <p className="mt-1 text-white/80">
            <strong className="text-white">Personne</strong> COD :{' '}
            <span className="font-semibold text-white">Je ne connais personne.</span>
          </p>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={onStart}
          className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-600 to-blue-600 px-5 py-3 text-sm font-black text-white shadow-lg transition hover:scale-[1.01] md:text-base"
        >
          {hasProgress ? 'Reprendre' : 'S’entraîner'}
          <ArrowRight className="h-4 w-4" />
        </button>

        {hasProgress ? (
          <button
            type="button"
            onClick={onResetProgress}
            className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/10 px-5 py-3 text-sm font-black text-white shadow-lg transition hover:bg-white/15 md:text-base backdrop-blur-sm"
          >
            <RotateCcw className="h-4 w-4" />
            Réinitialiser
          </button>
        ) : null}
      </div>
    </div>
  );
}

function QuestionCard(props) {
  const {
    question,
    currentIndex,
    total,
    selected,
    feedback,
    onSelect,
    onNext,
    onPrevious,
    onGoHome,
    onOpenReminder,
  } = props;

  return (
    <div className="rounded-[26px] border border-white/15 bg-gradient-to-br from-slate-950 via-blue-950 to-sky-900 p-4 shadow-xl md:p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={onGoHome}
          className="inline-flex items-center gap-1.5 rounded-xl border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-black text-white transition hover:bg-white/15 md:text-sm backdrop-blur-sm"
        >
          Accueil
        </button>

        <button
          type="button"
          onClick={onOpenReminder}
          className="inline-flex items-center gap-1.5 rounded-xl border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-black text-white transition hover:bg-white/15 md:text-sm backdrop-blur-sm"
        >
          <BookOpenText className="h-4 w-4" />
          Rappel
        </button>
      </div>

      <h3 className="mt-3 text-center text-lg font-black leading-snug text-white md:text-xl">{question.prompt}</h3>

      <div className="mt-4 grid gap-2.5">
        {question.options.map((option) => {
          const isSelected = selected === option;
          const showCorrect = Boolean(feedback) && option === question.answer;
          const showWrong = Boolean(feedback) && isSelected && option !== question.answer;

          let optionClassName =
            'border-slate-200 bg-white text-slate-800 hover:-translate-y-0.5 hover:scale-[1.01] hover:border-cyan-300 hover:bg-slate-50';

          if (showCorrect) {
            optionClassName = 'border-emerald-300 bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-md';
          } else if (showWrong) {
            optionClassName = 'border-rose-300 bg-gradient-to-r from-rose-500 to-red-600 text-white shadow-md';
          } else if (isSelected) {
            optionClassName =
              'border-cyan-500 bg-white text-slate-800 ring-2 ring-cyan-400/40 hover:-translate-y-0.5 hover:scale-[1.01]';
          }

          return (
            <button
              key={option}
              type="button"
              onClick={() => onSelect(option)}
              disabled={Boolean(feedback)}
              className={`mx-auto w-full max-w-3xl transform rounded-2xl border px-3 py-2.5 text-sm font-semibold transition-all duration-200 md:text-base ${optionClassName}`}
            >
              <div className="relative flex items-center justify-center gap-3">
                <span className="block text-center">{highlightNegation(option)}</span>
                {showCorrect ? <CheckCircle2 className="absolute right-0 h-4 w-4 shrink-0 md:h-5 md:w-5" /> : null}
                {showWrong ? <XCircle className="absolute right-0 h-4 w-4 shrink-0 md:h-5 md:w-5" /> : null}
              </div>
            </button>
          );
        })}
      </div>

      {feedback ? (
        <div
          className={`mt-4 rounded-2xl border p-3.5 ${
            feedback.correct
              ? 'border-emerald-300 bg-gradient-to-r from-emerald-500 to-green-600'
              : 'border-rose-300 bg-gradient-to-r from-rose-500 to-red-600'
          }`}
        >
          <p className="flex items-center gap-2 text-sm font-black text-white md:text-base">
            {feedback.correct ? <CheckCircle2 className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
            {feedback.correct ? 'Bravo !' : 'Attention !'}
          </p>
          <p className="mt-1.5 text-sm text-white/95">{highlightNegation(feedback.message)}</p>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={onPrevious}
              disabled={currentIndex === 0}
              className="rounded-xl bg-cyan-600 px-4 py-2 text-sm font-black text-white transition hover:bg-cyan-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Question précédente
            </button>
            <button
              type="button"
              onClick={onNext}
              className="rounded-xl border border-white/20 bg-white/15 px-4 py-2 text-sm font-black text-white transition hover:bg-white/20 backdrop-blur-sm"
            >
              {currentIndex === total - 1 ? 'Voir le résultat' : 'Question suivante'}
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function ResultScreen({ score, total, onGoHome, onOpenAnswers }) {
  const percent = Math.round((score / total) * 100);

  const message = useMemo(() => {
    if (percent === 100) {
      return 'Excellent ! Tu maîtrises très bien la négation.';
    }
    if (percent >= 80) {
      return 'Très bon travail ! Tu as bien compris les structures principales.';
    }
    if (percent >= 60) {
      return 'Bon effort ! Continue à t’entraîner pour fixer les automatismes.';
    }
    return 'Courage ! Refaire l’activité va t’aider à mieux mémoriser les règles.';
  }, [percent]);

  return (
    <div className="rounded-[26px] border border-white/70 bg-white/94 p-5 text-center shadow-xl md:p-6">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg">
        <Trophy className="h-7 w-7" />
      </div>
      <h2 className="mt-3 text-2xl font-black text-slate-800 md:text-3xl">Résultat</h2>
      <p className="mt-2 text-sm text-slate-600 md:text-base">{message}</p>

      <div className="mx-auto mt-5 max-w-md">
        <div className="h-2.5 overflow-hidden rounded-full bg-slate-200">
          <div className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-500" style={{ width: `${percent}%` }} />
        </div>
      </div>

      <div className="mx-auto mt-5 grid max-w-2xl gap-2.5 sm:grid-cols-3">
        <div className="rounded-2xl border border-cyan-100 bg-cyan-50 p-3">
          <p className="text-[10px] font-black uppercase tracking-wide text-cyan-700">Bonnes réponses</p>
          <p className="mt-1 text-xl font-black text-slate-800">{score}/{total}</p>
        </div>
        <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-3">
          <p className="text-[10px] font-black uppercase tracking-wide text-emerald-700">Pourcentage</p>
          <p className="mt-1 text-xl font-black text-slate-800">{percent}%</p>
        </div>
        <div className="rounded-2xl border border-violet-100 bg-violet-50 p-3">
          <p className="text-[10px] font-black uppercase tracking-wide text-violet-700">XP gagné</p>
          <p className="mt-1 text-xl font-black text-slate-800">{score * 10}</p>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={onGoHome}
          className="inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-4 py-2.5 text-sm font-black text-white transition hover:bg-slate-800 md:text-base"
        >
          Accueil
        </button>
        <button
          type="button"
          onClick={onOpenAnswers}
          className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-600 to-blue-600 px-4 py-2.5 text-sm font-black text-white transition hover:scale-[1.01] md:text-base"
        >
          Voir les réponses
        </button>
      </div>
    </div>
  );
}

export default function NegationApp() {
  const [started, setStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [feedback, setFeedback] = useState(null);
  const [finished, setFinished] = useState(false);
  const [showReminder, setShowReminder] = useState(false);
  const [showAnswers, setShowAnswers] = useState(false);

  const hasProgress = Object.keys(answers).length > 0 || finished;
  const currentQuestion = QUESTIONS[currentIndex];
  const selected = currentQuestion ? answers[currentQuestion.id] ?? null : null;

  const score = useMemo(() => {
    return QUESTIONS.reduce((total, question) => {
      return answers[question.id] === question.answer ? total + 1 : total;
    }, 0);
  }, [answers]);

  const openQuestionAt = (index) => {
    const safeIndex = Math.max(0, Math.min(index, QUESTIONS.length - 1));
    const question = QUESTIONS[safeIndex];
    const existingAnswer = answers[question.id];

    setCurrentIndex(safeIndex);
    setStarted(true);
    setFinished(false);
    setShowAnswers(false);

    if (existingAnswer != null) {
      setFeedback(buildFeedback(question, existingAnswer));
    } else {
      setFeedback(null);
    }
  };

  const startGame = () => {
    if (!hasProgress) {
      setStarted(true);
      setFinished(false);
      setCurrentIndex(0);
      setAnswers({});
      setFeedback(null);
      setShowAnswers(false);
      return;
    }

    if (finished) {
      const firstUnansweredIndex = QUESTIONS.findIndex((question) => answers[question.id] == null);
      const resumeIndex = firstUnansweredIndex === -1 ? QUESTIONS.length - 1 : firstUnansweredIndex;
      openQuestionAt(resumeIndex);
      return;
    }

    openQuestionAt(currentIndex);
  };

  const resetGame = () => {
    setStarted(false);
    setCurrentIndex(0);
    setAnswers({});
    setFeedback(null);
    setFinished(false);
    setShowReminder(false);
    setShowAnswers(false);
  };

  const goHome = () => {
    setStarted(false);
    setFeedback(null);
    setFinished(false);
    setShowReminder(false);
    setShowAnswers(false);
  };

  const handleSelect = (option) => {
    setAnswers((prev) => {
      return {
        ...prev,
        [currentQuestion.id]: option,
      };
    });

    setFeedback(buildFeedback(currentQuestion, option));
  };

  const handleNext = () => {
    if (currentIndex === QUESTIONS.length - 1) {
      setStarted(false);
      setFinished(true);
      setFeedback(null);
      setShowReminder(false);
      return;
    }

    openQuestionAt(currentIndex + 1);
  };

  const handlePrevious = () => {
    if (currentIndex === 0) {
      return;
    }

    openQuestionAt(currentIndex - 1);
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed"
      style={{
        backgroundImage:
          "linear-gradient(rgba(7, 18, 38, 0.42), rgba(7, 18, 38, 0.42)), url('https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1600&q=80')",
      }}
    >
      <div className="mx-auto max-w-6xl px-3 py-3 md:px-4 md:py-5">
        <Header started={started} score={score} currentIndex={currentIndex} total={QUESTIONS.length} />

        <ReminderModal open={showReminder} onClose={() => setShowReminder(false)} />
        <AnswersModal open={showAnswers} onClose={() => setShowAnswers(false)} answers={answers} />

        <div className="mt-3.5">
          {!started && !finished ? (
            <Home hasProgress={hasProgress} onStart={startGame} onResetProgress={resetGame} />
          ) : finished ? (
            <ResultScreen
              score={score}
              total={QUESTIONS.length}
              onGoHome={goHome}
              onOpenAnswers={() => setShowAnswers(true)}
            />
          ) : (
            <QuestionCard
              question={currentQuestion}
              currentIndex={currentIndex}
              total={QUESTIONS.length}
              selected={selected}
              feedback={feedback}
              onSelect={handleSelect}
              onNext={handleNext}
              onPrevious={handlePrevious}
              onGoHome={goHome}
              onOpenReminder={() => setShowReminder(true)}
            />
          )}
        </div>

        <div className="mt-6 pb-2 text-center text-xs font-medium tracking-wide text-white/70 md:text-sm">
          © Felipe LV - Produit Grammaire FLE
        </div>
      </div>
    </div>
  );
}
