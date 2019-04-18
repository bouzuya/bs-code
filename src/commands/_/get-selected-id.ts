import { getCursorText } from '../_/get-cursor-text';
import { getSelectedText } from '../_/get-selected-text';
import { BID, fromString } from '../../bs/bid';

const getSelectedId = (): BID | null => {
  const alt = (s1: string | null, s2: string | null): string | null => {
    return s1 !== null ? s1 : s2;
  };
  const selectedText = alt(getSelectedText(), getCursorText(/[0-9TZ+:-]+/));
  if (selectedText === null) return null;
  return fromString(selectedText);
};

export { getSelectedId };
