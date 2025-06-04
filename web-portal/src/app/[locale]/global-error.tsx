"use client";

import { useTranslations } from "next-intl";

type GlobalErrorType = {
  error: Error;
  reset: () => void;
};

/**
 * GlobalError
 * @description
 * Main Error page
 */
export default function GlobalError({ error, reset }: GlobalErrorType) {
  const t = useTranslations();
  return (
    <html>
      <body>
        <h2>{t("ERROR_404")}</h2>
      </body>
    </html>
  );
}
