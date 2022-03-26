export type BEMOptions = {
  block: string;
  elem: string;
  modifier: string;
  value: string;
};

export enum Prefix {
  ELEM = "elem",
  MODIFIER = "modifier",
  VALUE = "value",
}

type PrefixType = Record<Prefix, string>;

const LINK_PREFIX: PrefixType = {
  [Prefix.ELEM]: "__",
  [Prefix.MODIFIER]: "_",
  [Prefix.VALUE]: "_",
};

const START_PREFIX: PrefixType = {
  [Prefix.ELEM]: "e_",
  [Prefix.MODIFIER]: "m_",
  [Prefix.VALUE]: "v_",
};

const isEmpty = (value: string) => value === "";

const buildStartPrefixRegex = (prefix: Prefix) =>
  new RegExp(`^${START_PREFIX[prefix]}`);

const checkStartPrefix = (value: string, prefix: Prefix) =>
  buildStartPrefixRegex(prefix).test(value);

export const removeStartPrefix = (value: string, prefix: Prefix) =>
  checkStartPrefix(value, prefix)
    ? value.replace(buildStartPrefixRegex(prefix), "")
    : null;

const checkName = (value: string) => {
  const regex = new RegExp("w-");
  return regex.test(value);
};

export const checkValue = (value: string, prefix: Prefix) => {
  const valueHandledStartPrefix = removeStartPrefix(value, prefix);
  return checkName(valueHandledStartPrefix);
};

export const addLinkPrefix = (value: string, prefix: Prefix) =>
  isEmpty(value) ? value : `${LINK_PREFIX[prefix]}${value}`;

const parseArgs = () => {};

export function BEM(block: string): string;
export function BEM(block: string, elemOrModifier?: string): string;
export function BEM(block: string, elem?: string, modifier?: string): string;
export function BEM(options: BEMOptions): string;
export function BEM(
  options: string | BEMOptions,
  elem?: string,
  modifier?: string
): string {
  // const {block, elem, modifier} = options;
  // const _elem = elem === "" ? elem : `__${elem}`;
  // const _modifier = modifier === "" ? modifier : `--${modifier}`;
  // const result = `${block}${_elem}${_modifier}`;
  // return result;
  return "";
}
