import { getCursorText } from '../_/get-cursor-text';
import { getSelectedText } from '../_/get-selected-text';
import { BID, fromString } from '../../bs/bid';

const bidFromString = (s: string): BID | null => {
  const date = dateFromString(s.trim());
  if (date === null) return null;
  const text = date
    .toISOString()
    .replace(/\.\d{3}Z$/, 'Z')
    .replace(/[-:+]/g, '');
  return fromString(text);
};

const dateFromString = (s: string): Date | null => {
  const p = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:Z|[-+]\d{2}:\d{2})$/;
  const m = s.match(p);
  if (m !== null) {
    return new Date(s);
  } else {
    const p = /^(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})Z$/;
    const m = s.match(p);
    if (m !== null) {
      const d = [m[1], m[2], m[3]].join('-');
      const t = [m[4], m[5], m[6]].join(':');
      return new Date(d + 'T' + t + 'Z')
    } else {
      return null;
    }
  }
};

const getSelectedId = (): BID | null => {
  const alt = (s1: string | null, s2: string | null): string | null => {
    return s1 !== null ? s1 : s2;
  };
  const selectedText = alt(getSelectedText(), getCursorText(/[0-9TZ+:-]+/));
  if (selectedText === null) return null;
  return bidFromString(selectedText);
};

export { getSelectedId };
