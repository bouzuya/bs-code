import {
  BID,
  between,
  fromContentFilePath as bidFromContentFilePath,
  fromString as bidFromString,
  toDirectoryPath as bidToDirectoryPath
} from './bid';
import { getFilePathsRecursive, getDirectoryPaths } from './get-file-paths';
import { toISOString } from 'time-keeper/to-iso-string';
import { now } from 'time-keeper/now';
import { getBaseName } from './get-base-name';

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

const toYMD = (id: BID): { y: string; m: string; d: string; } => {
  const [y, m, d] = bidToDirectoryPath('/', id).split('/').slice(1, 4);
  return { y, m, d };
};

const findIds1 = (
  flowDirectory: string,
  sinceId: BID,
  untilId: BID
): BID[] => {
  const since = toYMD(sinceId);
  const until = toYMD(untilId);

  const yearDirs =
    getDirectoryPaths(flowDirectory)
      .filter((i) => {
        const y = getBaseName(i);
        return (since.y <= y) && (y <= until.y);
      });
  const ids = [];
  yearDirs.forEach((yearDir, yearDirIndex) => {
    const isFirstYear = yearDirIndex === 0;
    const isLastYear = yearDirIndex === yearDirs.length - 1;
    const monthDirs = getDirectoryPaths(yearDir)
      .filter((d) => {
        const n = getBaseName(d);
        return (!isFirstYear || since.m <= n) &&
          (!isLastYear || n <= until.m);
      });
    monthDirs.forEach((monthDir, monthDirIndex) => {
      const isFirstMonth = isFirstYear && monthDirIndex === 0;
      const isLastMonth = isLastYear && monthDirIndex === monthDir.length - 1;
      const dayOfMonthDirs = getDirectoryPaths(monthDir)
        .filter((d) => {
          const n = getBaseName(d);
          return (!isFirstMonth || since.d <= n) &&
            (!isLastMonth || n <= until.d);
        });
      dayOfMonthDirs.forEach((dayOfMonthDir) => {
        ids.push.apply(
          ids,
          getFilePathsRecursive(dayOfMonthDir)
            .map((i) => bidFromContentFilePath(i))
            .filter((i): i is BID => {
              return i !== null && between(sinceId, untilId, i);
            })
        );
      });
    });
  });
  return ids;
};

export { findIds };
