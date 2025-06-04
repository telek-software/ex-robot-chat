import { useTranslations } from "next-intl";

import { Flex, Title } from "~components";
import { I18N_KEY } from "~lib/i18n";
import { formatSentence } from "~utils/string.utils";

import style from "./style";

/**
 * Privacy
 * @module InformationModule
 * @description
 * Privacy Page Informations
 *
 */
function Privacy() {
  const t = useTranslations();
  const sentence = useTranslations(I18N_KEY.LONG);
  return (
    <Flex flexStyle={style.privacy} className="bg-reverse column radius shadow">
      <Title className="center">{t("PROTECTING_USER_DATA")}</Title>

      <Flex as="section" flexStyle={style.privacySection}>
        <Title as="h2">{t("PRIVACY_MASK_OF_DATA")}</Title>
        <Flex as="p" flexStyle={style.privacySentence}>
          {formatSentence(sentence("EMPLOY_PRIVACY_MASK"))}
        </Flex>
      </Flex>

      <Flex as="section" flexStyle={style.privacySection}>
        <Title as="h2">{t("DATA_PROTECTION_MEASURES")}</Title>
        <Flex as="ul" flexStyle={style.privacyList}>
          <Flex as="li" flexStyle={style.privacyListItem}>
            <Flex flexStyle={style.privacyRowLeft}>{t("ENCRYPTION")}:</Flex>
            <Flex>{formatSentence(sentence("ALL_DATA_TRANSMITTED"))}</Flex>
          </Flex>
          <Flex as="li" flexStyle={style.privacyListItem}>
            <Flex flexStyle={style.privacyRowLeft}>{t("SECURE_STORAGE")}:</Flex>
            <Flex>{formatSentence(sentence("USER_DATA_IS_STORED"))}</Flex>
          </Flex>
          <Flex as="li" flexStyle={style.privacyListItem}>
            <Flex flexStyle={style.privacyRowLeft}>{t("ANONYMIZATION")}:</Flex>
            <Flex>{t("ANONYMIZE_DATA")}</Flex>
          </Flex>
          <Flex as="li" flexStyle={style.privacyListItem}>
            <Flex flexStyle={style.privacyRowLeft}>{t("REGULAR_AUDIT")}:</Flex>
            <Flex>{formatSentence(sentence("CONDUCT_AUDITS_ASSESMENTS"))}</Flex>
          </Flex>
          <Flex as="li" flexStyle={style.privacyListItem}>
            <Flex flexStyle={style.privacyRowLeft}>
              {t("COMPLIANCE_REGULATIONS")}:
            </Flex>
            <Flex>{formatSentence(sentence("ADHERE_DATA_PROTECTION"))}</Flex>
          </Flex>
        </Flex>
      </Flex>

      <Flex as="section" flexStyle={style.privacySection}>
        <Title as="h2">{t("USER_CONSENT")}</Title>
        <Flex as="p" flexStyle={style.privacySentence}>
          {formatSentence(sentence("RESPECT_USER_CONSENT"))}
        </Flex>
      </Flex>

      <Flex as="section" flexStyle={style.privacySection}>
        <Title as="h2">{t("THIRD_PARTY_DATA_SHARING")}</Title>
        <Flex as="p" flexStyle={style.privacySentence}>
          {formatSentence(sentence("UNAUTHORIZED_SHARING_ENGAGEMENT"))}
        </Flex>
      </Flex>

      <Flex as="section" flexStyle={style.privacySection}>
        <Title as="h2">{t("CONTINUOUS_IMPROVEMENT")}</Title>
        <Flex as="p" flexStyle={style.privacySentence}>
          {formatSentence(sentence("CONTINUOUSLY_IMPROVING_DATA"))}
        </Flex>
      </Flex>
    </Flex>
  );
}
export default Privacy;
