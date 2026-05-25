import fs from 'fs';
import path from 'path';

export interface PubLinks {
  arxiv?: string;
  page?: string;
  code?: string;
  bibtex?: string;
}

export interface Publication {
  id: string;
  title: string;
  venue: string;
  venueTag: string;
  authors: string;
  thumbnail?: string;
  links?: PubLinks;
  selected?: boolean;
  order?: number;
}

export function loadPublications(): Publication[] {
  const pubsDir = path.join(process.cwd(), 'public', 'publications');
  if (!fs.existsSync(pubsDir)) return [];

  const pubs: Publication[] = [];

  for (const entry of fs.readdirSync(pubsDir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const id = entry.name;
    const dir = path.join(pubsDir, id);

    const metaPath = path.join(dir, 'meta.json');
    if (!fs.existsSync(metaPath)) continue;

    const meta = JSON.parse(fs.readFileSync(metaPath, 'utf-8'));

    const bibtexPath = path.join(dir, 'bibtex.bib');
    const bibtex = fs.existsSync(bibtexPath)
      ? fs.readFileSync(bibtexPath, 'utf-8').trim()
      : undefined;

    let thumbnail: string | undefined;
    for (const ext of ['jpg', 'jpeg', 'png', 'webp']) {
      if (fs.existsSync(path.join(dir, `thumbnail.${ext}`))) {
        thumbnail = `/publications/${id}/thumbnail.${ext}`;
        break;
      }
    }

    pubs.push({
      id,
      ...meta,
      thumbnail,
      links: { ...meta.links, ...(bibtex ? { bibtex } : {}) },
    });
  }

  return pubs.sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
}
