import { join, sep } from 'path';
import { inTimeZone } from 'time-keeper/in-time-zone';
import { parseUNIXTime } from 'time-keeper/parse-unix-time';
import { parseISOString } from 'time-keeper/parse-iso-string';
import { toISOString } from 'time-keeper/to-iso-string';
import { toUNIXTime } from 'time-keeper/to-unix-time';
import { DateTime } from 'time-keeper/types/date-time';

interface BID {
  type: 'BID';
  value: number; // unix time (s)
}

// YYYYMMDDTHHMMSSZ -> id
const fromString = (s: string): BID | null => {
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

const toDirectoryPath = (rootDirectory: string, id: BID): string => {
  // YYYY-MM-DD -> root/YYYY/MM/DD
  const isoDateString = toISODateString(parseUNIXTime(id.value));
  return join(rootDirectory, isoDateString.split('-').join(sep));
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
  fromString,
  toBaseName,
  toContentFilePath,
  toDirectoryPath,
  toMetaFilePath,
  toString
};
