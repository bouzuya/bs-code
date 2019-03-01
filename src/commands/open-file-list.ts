import { getCursorText } from './_/get-cursor-text';
import { getSelectedText } from './_/get-selected-text';
import * as utils from './_/open-file-list';

const openFileList = (): void => {
  const selectedText = getSelectedText();
  const cursorText = getCursorText(/[-0-9]+/);
  const date = selectedText !== null ? selectedText : cursorText;
  if (date === null) return;
  utils.openFileList(date);
};

export { openFileList };
