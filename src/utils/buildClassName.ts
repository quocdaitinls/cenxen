export type Part = (string | false | undefined)[];

const buildClassName = (...parts: Part) => {
  return parts.filter(Boolean).join(" ");
};

export default buildClassName;
