import { now } from 'time-keeper/now';
import { toISOString } from 'time-keeper/to-iso-string';
import * as utils from './_/open-file-list';

const openFileListToday = (): void => {
  const date = toISOString(now()).substring(0, 'YYYY-MM-DD'.length);
  utils.openFileList(date);
};

export { openFileListToday };
