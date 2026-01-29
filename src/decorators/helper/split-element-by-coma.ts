export const splitElementByComa = ({ value }: { value?: string }) => {
  if (!value) {
    return undefined;
  }

  return value
    .split(',')
    .map((label) => label.trim())
    .filter((label) => label.length);
};
