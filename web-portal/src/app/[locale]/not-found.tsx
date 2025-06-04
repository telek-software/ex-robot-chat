import { useTranslations } from "next-intl";

import { Button } from "~components";

/**
 * NotFound
 * @description
 * Main not found page
 */
export default function NotFound() {
  const t = useTranslations();
  return (
    <div>
      <h2>{t("ERROR_404")}</h2>
      <p>{t("ERROR_404_MESSAGE")}</p>
      <Button className="bg hollow" href="/" label="Back" />
    </div>
  );
}
