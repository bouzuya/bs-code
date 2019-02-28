import { join, sep } from 'path';
import { BID, fromString } from './bid';
import { getBaseName } from './get-base-name';
import { getExtension } from './get-extension';
import { getFilePaths } from './get-file-paths';
import { parseISOString } from 'time-keeper/parse-iso-string';
import { toISOString } from 'time-keeper/to-iso-string';
import { now } from 'time-keeper/now';
import { inTimeZone } from 'time-keeper/in-time-zone';

const findIds = (flowDirectory: string, date: string): BID[] => {
  const datePattern = /^(\d{4})-([01][0-9])-([0-3][0-9])$/;
  const matches = date.match(datePattern);
  if (matches === null) return [];
  const year = matches[1];
  const month = matches[2];
  const dayOfMonth = matches[3];
  const timeZone = toISOString(now()).substring('YYYY-MM-DDTHH:MM:SS'.length);
  const since = [year, month, dayOfMonth].join('-') + 'T00:00:00' + timeZone;
  const until = [year, month, dayOfMonth].join('-') + 'T23:59:59' + timeZone;
  const utcSince = toISOString(inTimeZone(parseISOString(since), 'Z'));
  const utcUntil = toISOString(inTimeZone(parseISOString(until), 'Z'));
  const utcSinceId = utcSince.replace(/[-:]/g, '');
  const utcUntilId = utcUntil.replace(/[-:]/g, '');
  const sinceDir =
    utcSince.substring(0, 'YYYY-MM-DD'.length).split('-').join(sep);
  const sinceFilePaths = getFilePaths(join(flowDirectory, sinceDir));
  const untilDir =
    utcUntil.substring(0, 'YYYY-MM-DD'.length).split('-').join(sep);
  const untilFilPaths = getFilePaths(join(flowDirectory, untilDir));
  const filePaths = sinceFilePaths.concat(untilFilPaths);
  const ids = filePaths
    .filter((i) => getExtension(i) === '.md')
    .map((i) => getBaseName(i))
    .filter((i) => utcSinceId <= i && i <= utcUntilId);
  return ids
    .map((id) => fromString(id))
    .filter((i): i is BID => i !== null);
};

export { findIds };
