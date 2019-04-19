import { join, sep } from 'path';
import { inTimeZone } from 'time-keeper/in-time-zone';
import { parseUNIXTime } from 'time-keeper/parse-unix-time';
import { parseISOString } from 'time-keeper/parse-iso-string';
import { toISOString } from 'time-keeper/to-iso-string';
import { toUNIXTime } from 'time-keeper/to-unix-time';
import { DateTime } from 'time-keeper/types/date-time';
import { getBaseName } from './get-base-name';
import { getExtension } from './get-extension';

interface BID {
  type: 'BID';
  value: number; // unix time (s)
}

const between = (min: BID, max: BID, x: BID): boolean => {
  return (compare(min, x) <= 0) && (compare(x, max) <= 0);
};

const compare = ({ value: a }: BID, { value: b }: BID): number => {
  return a === b ? 0 : a < b ? -1 : 1;
};

const fromContentFilePath = (contentFilePath: string): BID | null => {
  if (getExtension(contentFilePath) !== '.md') return null;
  return fromString(getBaseName(contentFilePath));
};

// YYYYMMDDTHHMMSSZ -> id
// YYYY-MM-DDTHH:MM:SSZ -> id
// YYYY-MM-DDTHH:MM:SS+HH:MM -> id
// YYYY-MM-DDTHH:MM:SS-HH:MM -> id
const fromString = (s: string): BID | null => {
  const t = s.trim();
  const p = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:Z|[-+]\d{2}:\d{2})$/;
  const u =
    t.match(p) !== null
      ? new Date(t)
        .toISOString()
        .replace(/\.\d{3}Z$/, 'Z')
        .replace(/[-:+]/g, '')
      : t;
  return fromStringStrict(u);
};

// YYYYMMDDTHHMMSSZ -> id
const fromStringStrict = (s: string): BID | null => {
  const matches = s.match(/^(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})Z$/);
  if (matches === null) return null;
  const d = [matches[1], matches[2], matches[3]].join('-');
  const t = [matches[4], matches[5], matches[6]].join(':');
  const date = d + 'T' + t + 'Z';
  try {
    const dt = parseISOString(date);
    const value = toUNIXTime(dt);
    return { type: 'BID', value };
  } catch (_) { // parseISOString throws Error
    return null;
  }
};

const toBaseName = (id: BID): string => {
  return toString(id);
};

const toContentFilePath = (rootDirectory: string, id: BID): string => {
  const dir = toDirectoryPath(join(rootDirectory, 'flow'), id);
  const path = join(dir, toBaseName(id) + '.md');
  return path;
};

const toDirectoryPath = (flowDirectory: string, id: BID): string => {
  // YYYY-MM-DD -> root/YYYY/MM/DD
  const isoDateString = toISODateString(parseUNIXTime(id.value));
  return join(flowDirectory, isoDateString.split('-').join(sep));
};

const toISODateString = (dt: DateTime): string => {
  const isoString = toISOString(inTimeZone(dt, 'Z'));
  return isoString.replace(/T.*Z$/, '');
};

const toMetaFilePath = (rootDirectory: string, id: BID): string => {
  const dir = toDirectoryPath(join(rootDirectory, 'flow'), id);
  const path = join(dir, toBaseName(id) + '.json');
  return path;
};

// id -> YYYYMMDDTHHMMSSZ
const toString = (id: BID): string => {
  const isoString = toISOString(inTimeZone(parseUNIXTime(id.value), 'Z'));
  return isoString.replace(/[-:]/g, '');
};

export {
  BID,
  between,
  compare,
  fromContentFilePath,
  fromString,
  toBaseName,
  toContentFilePath,
  toDirectoryPath,
  toMetaFilePath,
  toString
};
