'use client';

import { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';

interface ExperienceItem {
  role: string;
  organization: string;
  period: string;
  location?: string;
  bullets?: string[];
}

const items: ExperienceItem[] = [
  {
    role: 'Deep Learning Intern',
    organization: 'MediaTek Research',
    period: '2024 – 2025',
    location: 'Taipei, Taiwan',
    bullets: [
      "Proposed TASTE: Text-Aligned Speech Tokenization and Embedding for Spoken Language Modeling [ICLR'26]",
      'First hybrid text-speech tokenization tailored for spoken language modeling.',
    ],
  },
  {
    role: 'Ph.D. Student',
    organization: 'Speech Processing and Machine Learning Lab, NTU',
    period: '2022 – present',
    location: 'Taipei, Taiwan',
    bullets: [
      'Advisor: Prof. Hung-yi Lee',
      "Derived SOTA unsupervised ASR framework based on reinforcement learning and iterative training. [NeurIPS'24]",
      "Improved code-switching ASR with self-supervised speech models. [AAAI SAS'22]",
    ],
  },
  {
    role: 'Research and Development Intern',
    organization: 'Center of Teaching and Learning Development, NTU',
    period: '2021 – present',
    location: 'Taipei, Taiwan',
    bullets: [
      'Developed and deployed the course subtitle generator for National Taiwan University.',
      "New model is 2× smaller, 5× faster, and 20% better than Whisper Large-v2 in code-switching ASR. [SLT'24]",
      'System has transcribed over 80,000 lecture videos for university faculty.',
    ],
  },
  {
    role: 'Ph.D. in Graduate Institute of Electrical Engineering',
    organization: 'National Taiwan University',
    period: '2022 – present',
    bullets: ['GPA: 4.14 / 4.30'],
  },
  {
    role: 'Bachelor of Electrical Engineering',
    organization: 'National Taiwan University',
    period: '2018 – 2022',
    bullets: ['GPA: 3.82 / 4.30'],
  },
];

const VISIBLE = 3;

export default function Experience() {
  const [showAll, setShowAll] = useState(false);
  const [openItems, setOpenItems] = useState<Set<number>>(new Set());

  const displayed = showAll ? items : items.slice(0, VISIBLE);
  const hiddenCount = items.length - VISIBLE;

  const toggle = (i: number) => {
    setOpenItems(prev => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });
  };

  return (
    <section id="experience" className="mb-12">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 pb-2 border-b border-gray-200 dark:border-gray-700">
        Experience
      </h2>
      <div className="space-y-1">
        {displayed.map((item, i) => {
          const isOpen = openItems.has(i);
          const hasBullets = !!item.bullets?.length;

          return (
            <div key={i} className="flex gap-4">
              {/* timeline spine */}
              <div className="flex flex-col items-center pt-2">
                <div className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0" />
                {i < displayed.length - 1 && (
                  <div className="w-px flex-1 bg-gray-200 dark:bg-gray-700 mt-1" />
                )}
              </div>

              {/* content */}
              <div className="flex-1 pb-5">
                <div
                  className={`flex items-start justify-between gap-3 ${hasBullets ? 'cursor-pointer select-none group' : ''}`}
                  onClick={() => hasBullets && toggle(i)}
                >
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {item.role}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                      {item.organization}
                      {item.location && ` · ${item.location}`}
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 flex-shrink-0 pt-0.5">
                    <span className="text-sm text-gray-400 dark:text-gray-500 whitespace-nowrap">
                      {item.period}
                    </span>
                    {hasBullets && (
                      <ChevronDownIcon
                        className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                      />
                    )}
                  </div>
                </div>

                {isOpen && hasBullets && (
                  <ul className="mt-2 space-y-1.5">
                    {item.bullets!.map((b, bi) => (
                      <li key={bi} className="text-sm text-gray-600 dark:text-gray-400 flex gap-2">
                        <span className="text-blue-400 flex-shrink-0 mt-0.5">–</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <button
        onClick={() => setShowAll(!showAll)}
        className="mt-1 flex items-center gap-1 text-sm text-blue-600 dark:text-blue-400 hover:underline"
      >
        {showAll ? (
          <><ChevronUpIcon className="h-4 w-4" />Show less</>
        ) : (
          <><ChevronDownIcon className="h-4 w-4" />Show {hiddenCount} more</>
        )}
      </button>
    </section>
  );
}
