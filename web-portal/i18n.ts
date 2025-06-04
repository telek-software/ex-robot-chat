import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async ({ locale }) => ({
  messages: {
    ...(await import(`./src/lib/i18n/dictionaries/${locale}.json`)).default,
    long: (await import(`./src/lib/i18n/dictionaries/long/${locale}.json`))
      .default,
  },
}));
