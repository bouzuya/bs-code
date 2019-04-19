import {
  BID,
  fromContentFilePath as bidFromContentFilePath,
  fromString as bidFromString,
  toDirectoryPath as bidToDirectoryPath,
  between
} from './bid';
import { getFilePaths } from './get-file-paths';
import { toISOString } from 'time-keeper/to-iso-string';
import { now } from 'time-keeper/now';

const dateRange = (date: string): { sinceId: BID; untilId: BID; } | null => {
  const datePattern = /^(\d{4})-([01][0-9])-([0-3][0-9])$/;
  const matches = date.match(datePattern);
  if (matches === null) return null;
  const year = matches[1];
  const month = matches[2];
  const dayOfMonth = matches[3];
  const timeZone = toISOString(now()).substring('YYYY-MM-DDTHH:MM:SS'.length);
  const since = [year, month, dayOfMonth].join('-') + 'T00:00:00' + timeZone;
  const until = [year, month, dayOfMonth].join('-') + 'T23:59:59' + timeZone;
  const sinceId = bidFromString(since);
  if (sinceId === null) return null;
  const untilId = bidFromString(until);
  if (untilId === null) return null;
  return { sinceId, untilId };
};

const findIds = (flowDirectory: string, date: string): BID[] => {
  const range = dateRange(date);
  if (range === null) return [];
  const { sinceId, untilId } = range;
  return findIds1(flowDirectory, sinceId, untilId);
};

const findIds1 = (
  flowDirectory: string,
  sinceId: BID,
  untilId: BID
): BID[] => {
  const sinceDir = bidToDirectoryPath(flowDirectory, sinceId);
  const sinceFilePaths = getFilePaths(sinceDir);
  const untilDir = bidToDirectoryPath(flowDirectory, untilId);
  const untilFilPaths = getFilePaths(untilDir);
  const filePaths = sinceFilePaths.concat(untilFilPaths);
  const ids = filePaths
    .map((i) => bidFromContentFilePath(i))
    .filter((i): i is BID => i !== null && between(sinceId, untilId, i));
  return ids;
};

export { findIds };
