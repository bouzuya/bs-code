# bs-code

[bouzuya/bs][] for Visual Studio Code

[bouzuya/bs]: https://github.com/bouzuya/bs

## Features

- expand markdown anchors (`bs-code: Insert Markdown Anchors`)

### Example

before:

```
[bouzuya/bouzuya.net][]
```

after:

```
[bouzuya/bouzuya.net][]
[bouzuya/bouzuya.net]: https://github.com/bouzuya/bouzuya.net
```

### Supported format

- `USER/REPO` -> `https://github.com/USER/REPO`
- `USER/REPO#NUM` -> `https://github.com/USER/REPO/issues/NUM`
- `asin:ASIN` -> `https://www.amazon.co.jp/dp/ASIN/`
- `npm:PKG` -> `https://www.npmjs.com/package/PKG`
- `YYYY-MM-DD` -> `http://blog.bouzuya.net/YYYY/MM/DD/`

## Release Notes

### 1.0.0

Initial release
