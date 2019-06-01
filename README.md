# bs-code

[bouzuya/bs][] for Visual Studio Code

[bouzuya/bs]: https://github.com/bouzuya/bs

## Features

### Commands

- create and open b (`bs-code: Create And Open B`)
- expand markdown anchors (`bs-code: Insert Markdown Anchors`)
- open b or bs (`bs-code: Open B Or Bs`)
- open file list (`bs-code: Open File List`)
- open file list today (`bs-code: Open File List Today`)
- open pair file (`bs-code: Open Pair File`)
- open next/prev file (`bs-code: Open Next File` / `bs-code: Open Prev File`)
- open selected file (`bs-code: Open Selected File` / `bs-code: Open Selected File Beside`)
- quote selected file (`bs-code: Quote Selected File`)
- send to slack (`bs-code: Send To Slack`)

### Example (open pair file)

create `20160101T000000Z.json` and `20161001T000000Z.md`, and open them.

### Example (expand markdown anchors)

before:

```
[bouzuya/bouzuya.net][]
```

after:

```
[bouzuya/bouzuya.net][]
[bouzuya/bouzuya.net]: https://github.com/bouzuya/bouzuya.net
```

See: [bouzuya/expand-markdown-anchors][]

[bouzuya/expand-markdown-anchors]: https://github.com/bouzuya/expand-markdown-anchors

### Example (open pair file)

`20160101T000000Z.json` <-> `20161001T000000Z.md`

## Release Notes

### 2.5.1

- Fix main property.

### 2.5.0

- Update @bouzuya/expand-markdown-anchors package to 1.3.0.
  - `[pursuit:pkg][]` -> `https://pursuit.purescript.org/packages/pkg`

### 2.4.0

- Improve the following commands (support ambiguous format).
  - `bsCode.openBOrBs`
  - `bsCode.openFileList`
  - `bsCode.openFileListToday`
  - `bsCode.openSelectedFile`
  - `bsCode.openSelectedFileBeside`
  - `bsCode.quoteSelectedFile`

### 2.3.0

- Add `bsCode.openBOrBs`
- Add `bsCode.openSelectedFileBeside`
- Add `bsCode.quoteSelectedFile`

### 2.2.0

- Add `bsCode.openFileList`
- Add `bsCode.openFileListToday` header.
- Change `bsCode.openFileListToday` language.

### 2.1.1

- Update `@bouzuya/bs`.

### 2.1.0

- Update dependencies.

### 2.0.2

- Improve `bsCode.openFileListToday` performance.

### 2.0.1

- Update dependencies.

### 2.0.0

- Change minimum vscode version to 1.11.0.
- Change `bsCode.openSelectedFile` command to match ambiguous date format.
- Change `bsCode.open*` command to open in current view column.
- Add `bsCode.openFileListToday` command.

### 1.5.4

- Fix a bug.

### 1.5.3

- Fix a `bsCode.insertMarkdownAnchors` command bug.

### 1.5.0

- Add `bsCode.sendToSlack` command.
- Add `bsCode.slackChannel` config.
- Add `bsCode.slackToken` config.

### 1.4.0

- Add `bsCode.openNextFile` command.
- Add `bsCode.openPrevFile` command.

### 1.3.1

- Fix `bsCode.rootDirectory` config.

### 1.3.0

- Add `bsCode.createAndOpenB` command.

### 1.2.0

- Add `bsCode.openPairFile` command.

### 1.1.0

- Fix a duplicate bug.
- ... and I made a mistake the version up (this is a patch update).

### 1.0.0

Initial release
