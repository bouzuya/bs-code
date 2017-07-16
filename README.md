# bs-code

[bouzuya/bs][] for Visual Studio Code

[bouzuya/bs]: https://github.com/bouzuya/bs

## Features

- create and open b (`bs-code: Create And Open B`)
- expand markdown anchors (`bs-code: Insert Markdown Anchors`)
- open pair file (`bs-code: Open Pair File`)
- open next/prev file (`bs-code: Open Next File` / `bs-code: Open Prev File`)

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

### Example (open pair file)

`20160101T000000Z.json` <-> `20161001T000000Z.md`

### Supported format

- `USER/REPO` -> `https://github.com/USER/REPO`
- `USER/REPO#NUM` -> `https://github.com/USER/REPO/issues/NUM`
- `asin:ASIN` -> `https://www.amazon.co.jp/dp/ASIN/`
- `npm:PKG` -> `https://www.npmjs.com/package/PKG`
- `YYYY-MM-DD` -> `http://blog.bouzuya.net/YYYY/MM/DD/`

## Release Notes

### 1.5.1

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
