// Deep import/export
const regexLink = /from\s*"(.+?)"/;

export const deepEntry = (content: string) => {
  const deep = regexLink.exec(content);

  return (deep && deep[1]) || null;
};
