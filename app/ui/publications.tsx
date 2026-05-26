'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ClipboardDocumentIcon, CheckIcon, PhotoIcon } from '@heroicons/react/24/outline';
import type { Publication } from '@/app/lib/publications';

const VENUE_COLORS: Record<string, string> = {
  NeurIPS:  'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300',
  ICLR:     'bg-red-100    dark:bg-red-900/30    text-red-800    dark:text-red-300',
  ACL:      'bg-blue-100   dark:bg-blue-900/30   text-blue-800   dark:text-blue-300',
  AAAI:     'bg-green-100  dark:bg-green-900/30  text-green-800  dark:text-green-300',
  SLT:      'bg-teal-100   dark:bg-teal-900/30   text-teal-800   dark:text-teal-300',
  ASRU:     'bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300',
  Preprint: 'bg-gray-100   dark:bg-gray-800      text-gray-600   dark:text-gray-400',
};

function venueStyle(tag: string) {
  const key = Object.keys(VENUE_COLORS).find(k => tag.includes(k)) ?? 'Preprint';
  return VENUE_COLORS[key];
}

const MY_NAME = 'Liang-Hsuan Tseng';

function Authors({ text }: { text: string }) {
  const parts = text.split(MY_NAME);
  return (
    <span>
      {parts.map((part, i) => (
        <span key={i}>
          {part}
          {i < parts.length - 1 && (
            <span className="underline underline-offset-2 decoration-gray-400 dark:decoration-gray-500">
              {MY_NAME}
            </span>
          )}
        </span>
      ))}
    </span>
  );
}

function Thumbnail({ src, title }: { src?: string; title: string }) {
  return (
    <div className="w-32 sm:w-36 self-stretch flex-shrink-0 rounded-md overflow-hidden bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center relative min-h-[80px]">
      {src
        ? <Image src={src} fill alt={title} className="object-contain" sizes="(min-width: 640px) 576px, 512px" quality={100} />
        : <PhotoIcon className="h-8 w-8 text-gray-300 dark:text-gray-600" />
      }
    </div>
  );
}

function LinkChip({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
    >
      {label}
    </a>
  );
}

function PubCard({
  pub, bibtexOpen, onToggleBibtex, copied, onCopy,
}: {
  pub: Publication;
  bibtexOpen: boolean;
  onToggleBibtex: () => void;
  copied: boolean;
  onCopy: () => void;
}) {
  const links = pub.links ?? {};
  const hasLinks = links.arxiv || links.page || links.code || links.slides || links.bibtex;

  return (
    <div className="flex gap-3 sm:gap-4">
      <Thumbnail src={pub.thumbnail} title={pub.title} />
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base leading-snug">
          {pub.title}
        </p>
        <div className="mt-1">
          <span className={`inline-block text-xs font-medium px-2 py-0.5 rounded-full ${venueStyle(pub.venueTag)}`}>
            {pub.venueTag}
          </span>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">
          <Authors text={pub.authors} />
        </p>
        {hasLinks && (
          <div className="flex flex-wrap gap-1.5 mt-2">
            {links.arxiv   && <LinkChip href={links.arxiv}   label="arXiv"  />}
            {links.page    && <LinkChip href={links.page}    label="page"   />}
            {links.code    && <LinkChip href={links.code}    label="code"   />}
            {links.slides  && <LinkChip href={links.slides}  label="slides" />}
            {links.bibtex && (
              <button
                onClick={onToggleBibtex}
                className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                bibtex
              </button>
            )}
          </div>
        )}
        {bibtexOpen && links.bibtex && (
          <div className="mt-2 relative rounded-md bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-3">
            <pre className="text-xs text-gray-700 dark:text-gray-300 whitespace-pre-wrap font-mono leading-relaxed overflow-x-auto">
              {links.bibtex}
            </pre>
            <button
              onClick={onCopy}
              className="absolute top-2 right-2 p-1 rounded text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
              aria-label="Copy bibtex"
            >
              {copied
                ? <CheckIcon className="h-4 w-4 text-green-500" />
                : <ClipboardDocumentIcon className="h-4 w-4" />
              }
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Publications({ pubs }: { pubs: Publication[] }) {
  const [tab, setTab] = useState<'selected' | 'all'>('selected');
  const [bibtexOpenId, setBibtexOpenId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const displayed = tab === 'selected' ? pubs.filter(p => p.selected) : pubs;

  const handleCopy = async (id: string, text: string) => {
    try { await navigator.clipboard.writeText(text); } catch (_) {}
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section id="publications" className="mb-12">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">
        Publications
      </h2>
      <div className="flex gap-1 mb-6 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg w-fit">
        {(['selected', 'all'] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors capitalize ${
              tab === t
                ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            {t}
          </button>
        ))}
      </div>
      <div className="space-y-6">
        {displayed.map(pub => (
          <PubCard
            key={pub.id}
            pub={pub}
            bibtexOpen={bibtexOpenId === pub.id}
            onToggleBibtex={() => setBibtexOpenId(bibtexOpenId === pub.id ? null : pub.id)}
            copied={copiedId === pub.id}
            onCopy={() => handleCopy(pub.id, pub.links?.bibtex ?? '')}
          />
        ))}
      </div>
    </section>
  );
}
