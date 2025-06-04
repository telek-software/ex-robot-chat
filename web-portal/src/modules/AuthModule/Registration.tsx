import { useTranslations } from "next-intl";

import { Icon, Link } from "~components";
import { navLinks } from "~utils/navigation.utils";
/**
 * Registration
 * @description
 * Ask for a registration to use the App
 *
 */
function Registration() {
  const t = useTranslations();
  const contactLink = navLinks.contact;
  return (
    <Link href={contactLink.url} className="boxed bg">
      <Icon name={contactLink.icon} className="hide-md" size="1em" />
      <span>{t("ASK_DEMO")}</span>
    </Link>
  );
}

export default Registration;
