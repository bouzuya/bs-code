import { expand } from 'expand-markdown-anchors';

const isExpanded = (s: string): boolean => {
  const expanded = s.match(/^\[[^\]]+\]:\s+.*$/);
  return expanded !== null;
};

const newExpanded = (each: (f: (line: string) => void) => void): string[] => {
  const all = [];
  const old = [];
  each((line) => {
    if (isExpanded(line)) {
      old.push(line);
    }
    expand(line).forEach((anchor) => {
      all.push(anchor);
    });
  });
  return all
    .filter((expanded) => !old.some((i) => i === expanded))
    .reduce((a, i) => a.some((j) => i === j) ? a : a.concat([i]), []);
};

export { newExpanded };
