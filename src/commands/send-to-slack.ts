import fetch from 'node-fetch';
import { stringify } from 'querystring';
import { window, workspace } from 'vscode';
import { getSelectedText } from './_/get-selected-text';
import { getSlackChannel } from './_/get-slack-channel';
import { getSlackToken } from './_/get-slack-token';

const sendToSlack = (): void => {
  const slackChannel = getSlackChannel();
  if (slackChannel === null) return;
  const slackToken = getSlackToken();
  if (slackToken === null) return;
  const selectedText = getSelectedText();
  if (selectedText === null) return;
  window.showInformationMessage(selectedText);
  const body = stringify({
    as_user: true,
    channel: slackChannel,
    text: selectedText,
    token: slackToken
  });
  fetch('https://slack.com/api/chat.postMessage', {
    body,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'User-Agent': 'bs-code'
    },
    method: 'POST'
  });
};

export { sendToSlack };
