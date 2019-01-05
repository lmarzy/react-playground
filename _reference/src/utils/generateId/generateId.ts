const generateId = (tokens: string[]): string => {
  return tokens
    .join()
    .replace(/[,\/,\s]/g, '-')
    .toLowerCase();
};

export default generateId;
