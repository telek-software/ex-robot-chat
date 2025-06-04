import { useTranslations } from "next-intl";

import { Icon, Link } from "~components";

import style from "./style";

/**
 * Login
 * @description
 * Login Component
 *
 */
function Login() {
  const t = useTranslations();
  return (
    <Link flexStyle={style.login} className="bg hollow boxed">
      <Icon name="Person" className="hide-md" size="1em" />
      <span>{t("LOGIN")}</span>
    </Link>
  );
}
export default Login;
