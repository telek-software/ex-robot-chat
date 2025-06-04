import { AnyObject } from "~utils/type.utils";

import "server-only";

import { Lang } from "./settings";

const getTranslations: (l: Lang) => Promise<AnyObject<string>> = (lang: Lang) =>
  import(`./dictionaries/${lang}.json`).then((module) => module.default);

async function getDictionary(locale: Lang) {
  return getTranslations(locale);
}
export default getDictionary;
