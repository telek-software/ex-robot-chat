import { useTranslations } from "next-intl";

import { Button, Flex, Link, Title } from "~components";
import { I18N_KEY } from "~lib/i18n";
import { Size } from "~utils/enum.utils";
import { formatSentence } from "~utils/string.utils";

import style from "./style";

const table_keys = [
  "INTRO_TO_AI",
  "HOW_AI_WORKS",
  "TYPES_OF_AI_CHATBOT",
  "RULE_BASED_CHATBOTS",
  "SELF_LEARNING_CHATBOT",
  "BENEFITS_OF_AI",
  "AI_CHATBOT_IN_CUSTOMER",
  "AI_CHATBOT_IN_ECOMMERCE",
  "AI_CHATBOT_IN_HEALTH",
  "AI_CHATBOT_IN_FINANCE",
  "CHALLENGEOF_IA",
  "FUTUR_OF_AI_CHATBOT",
  "CONCLUSION",
  "FAQ",
];

/**
 * AIDetails
 * @description
 * Provide details for AI Chatbot
 *
 */
function AIDetails() {
  const t = useTranslations();
  const sentence = useTranslations(I18N_KEY.LONG);
  return (
    <Flex flexStyle={style.AI} className="column color-bg">
      <Title className="center">{t("WHAT_IS_A_CHATBOT")}</Title>

      <Flex as="p" className="column">
        {formatSentence(sentence("IN_TODAY_DIGITAL_AGE"))}
      </Flex>

      <Flex as="section" className="column">
        <Title as="h2">{t("TABLE_OF_CONTENTS")}</Title>
        <Flex as="ul" className="column">
          {table_keys.map((key) => (
            <Flex key={key} as="li">
              <Link href={`#${key.toLowerCase()}`}>{t(key)} </Link>
            </Flex>
          ))}
        </Flex>
      </Flex>

      <Flex as="section" flexStyle={style.AISection}>
        <Title as="h2" id="intro_to_ai">
          {t("INTRO_TO_AI")}
        </Title>
        <Flex as="p" flexStyle={style.AISentence}>
          {formatSentence(sentence("AN_AI_CHATBOT_IS_AN"))}
        </Flex>
      </Flex>

      <Flex as="section" flexStyle={style.AISection}>
        <Title as="h2" id="how_ai_works">
          {t("HOW_AI_WORKS")}
        </Title>
        <Flex as="p" flexStyle={style.AISentence}>
          {formatSentence(sentence("AI_CHATBOT_UTILIZES"))}
        </Flex>
      </Flex>

      <Flex as="section" flexStyle={style.AISection}>
        <Title as="h2" id="types_of_ai_chatbot">
          {t("TYPES_OF_AI_CHATBOT")}
        </Title>
        <Flex as="p" flexStyle={style.AISentence}>
          {formatSentence(sentence("THERE_ARE_MAINLY_TWO_TYPES"))}
        </Flex>
      </Flex>

      <Flex as="section" flexStyle={style.AISection}>
        <Title as="h2" id="rule_based_chatbots">
          {t("RULE_BASED_CHATBOTS")}
        </Title>
        <Flex as="p" flexStyle={style.AISentence}>
          {formatSentence(sentence("RULES_BASED_CHATBOT_FOLLOWS"))}
        </Flex>
      </Flex>

      <Flex as="section" flexStyle={style.AISection}>
        <Title as="h2" id="self_learning_chatbot">
          {t("SELF_LEARNING_CHATBOT")}
        </Title>
        <Flex as="p" flexStyle={style.AISentence}>
          {formatSentence(sentence("SELF_LEARNING_CHATBOT_ALSO_KNOWN"))}
        </Flex>
      </Flex>

      <Flex as="section" flexStyle={style.AISection}>
        <Title as="h2" id="benefits_of_ai">
          {t("BENEFITS_OF_AI")}
        </Title>
        <Flex as="p">{sentence("AI_CHATBOT_OFFERS_BENEFITS")}</Flex>
        <Flex as="ul" flexStyle={style.AIList}>
          <Flex as="li" flexStyle={style.AIListItem}>
            <Flex flexStyle={style.AIListItemLeft}>
              {t("24_7_AVAILABILITY")}:
            </Flex>
            <Flex flexStyle={style.AISentence}>
              {formatSentence(sentence("AI_CHATBOT_CAN_OPERATE"))}
            </Flex>
          </Flex>

          <Flex as="li" flexStyle={style.AIListItem}>
            <Flex flexStyle={style.AIListItemLeft}>{t("COST_EFFECTIVE")}:</Flex>
            <Flex flexStyle={style.AISentence}>
              {formatSentence(sentence("CHAT_BOT_CAN_HANDLE"))}
            </Flex>
          </Flex>
          <Flex as="li" flexStyle={style.AIListItem}>
            <Flex flexStyle={style.AIListItemLeft}>
              {t("IMPROVED_CUSTOMER_EXPERIENCE")}:
            </Flex>
            <Flex flexStyle={style.AISentence}>
              {formatSentence(sentence("CHAT_BOT_CAN_HANDLE"))}
            </Flex>
          </Flex>
          <Flex as="li" flexStyle={style.AIListItem}>
            <Flex flexStyle={style.AIListItemLeft}>
              {t("EFFICIENT_TASK_AUTOMATION")}:
            </Flex>
            <Flex flexStyle={style.AISentence}>
              {formatSentence(sentence("AI_CHATBOT_CAN_PERFORM_REPETITIVE"))}
            </Flex>
          </Flex>
          <Flex as="li" flexStyle={style.AIListItem}>
            <Flex flexStyle={style.AIListItemLeft}>
              {t("DATA_COLLECTION_AND_ANALYSIS")}:
            </Flex>
            <Flex flexStyle={style.AISentence}>
              {formatSentence(sentence("CHATBOT_CAN_COLLECT"))}
            </Flex>
          </Flex>
        </Flex>
      </Flex>

      <Flex as="section" flexStyle={style.AISection}>
        <Title as="h2" id="ai_chatbot_in_customer">
          {t("AI_CHATBOT_IN_CUSTOMER")}
        </Title>
        <Flex as="p" flexStyle={style.AISentence}>
          {formatSentence(sentence("ONE_OF_THE_PRIMARY"))}
        </Flex>
        <Flex as="p" flexStyle={style.AISentence}>
          {formatSentence(sentence("CHAT_BOT_CAN_HANDLE"))}
        </Flex>
      </Flex>

      <Flex as="section" flexStyle={style.AISection}>
        <Title as="h2" id="ai_chatbot_in_ecommerce">
          {t("AI_CHATBOT_IN_ECOMMERCE")}
        </Title>
        <Flex as="p" flexStyle={style.AISentence}>
          {formatSentence(sentence("IN_THE_ECOMMER_INDUSTRY"))}
        </Flex>
      </Flex>

      <Flex as="section" flexStyle={style.AISection}>
        <Title as="h2" id="ai_chatbot_in_health">
          {t("AI_CHATBOT_IN_HEALTH")}
        </Title>
        <Flex as="p" flexStyle={style.AISentence}>
          {formatSentence(sentence("AI_CHATBOT_ARE_MAKING"))}
        </Flex>
      </Flex>

      <Flex as="section" flexStyle={style.AISection}>
        <Title as="h2" id="ai_chatbot_in_finance">
          {t("AI_CHATBOT_IN_FINANCE")}
        </Title>
        <Flex as="p" flexStyle={style.AISentence}>
          {formatSentence(sentence("THE_FINANCE_INDUSTRY_HAS_EMBRACED"))}
        </Flex>
      </Flex>

      <Flex as="section" flexStyle={style.AISection}>
        <Title as="h2" id="benefits_of_ai">
          {t("BENEFITS_OF_AI")}
        </Title>
        <Flex as="p">{sentence("WHILE_AI_CHATBOT_OFFERS")}</Flex>
        <Flex as="ul" flexStyle={style.AIList}>
          <Flex as="li" flexStyle={style.AIListItem}>
            <Flex flexStyle={style.AIListItemLeft}>
              {t("NATURAL_LANGUAGE_UNDERSTANDING")}:
            </Flex>
            <Flex as="p" flexStyle={style.AISentence}>
              {formatSentence(sentence("CHATBOTS_NEED_TO_UNDERSTAND"))}
            </Flex>
          </Flex>

          <Flex as="li" flexStyle={style.AIListItem}>
            <Flex flexStyle={style.AIListItemLeft}>
              {t("HANDLING_AMBIGUITY")}:
            </Flex>
            <Flex as="p" flexStyle={style.AISentence}>
              {formatSentence(sentence("SOME_USER_QUERIES_MAY"))}
            </Flex>
          </Flex>
          <Flex as="li" flexStyle={style.AIListItem}>
            <Flex flexStyle={style.AIListItemLeft}>
              {t("EMOTIONAL_INTELLIGENCE")}:
            </Flex>
            <Flex as="p" flexStyle={style.AISentence}>
              {formatSentence(sentence("UNDERSTANDING_AND_RESPONDING_TO"))}
            </Flex>
          </Flex>
        </Flex>
      </Flex>

      <Flex as="section" flexStyle={style.AISection}>
        <Title as="h2" id="futur_of_ai_chatbot">
          {t("FUTUR_OF_AI_CHATBOT")}
        </Title>
        <Flex as="p" flexStyle={style.AISentence}>
          {formatSentence(sentence("THE_FUTURE_AI_CHATBOT_PROMISING"))}
        </Flex>
      </Flex>

      <Flex as="section" flexStyle={style.AISection}>
        <Title as="h2" id="conclusion">
          {t("CONCLUSION")}
        </Title>
        <Flex as="p" flexStyle={style.AISentence}>
          {formatSentence(sentence("AI_CHATBOT_HAVE_REVOLUTIONARIZED"))}
        </Flex>
      </Flex>

      <Flex as="section" flexStyle={style.AISection}>
        <Title as="h2" id="faq">
          {t("FAQ")}
        </Title>
        <Flex flexStyle={style.QA} className="column">
          <Flex as="aside" flexStyle={style.QAItem}>
            <Flex flexStyle={style.AIListItemLeft}>
              Q1:{sentence("ARE_AI_CHATBOTS_BETTER")}:
            </Flex>
            <Flex as="p" flexStyle={style.AISentence}>
              {formatSentence(sentence("AI_CHATBOTS_OFFER_ADVANTAGE"))}
            </Flex>
          </Flex>

          <Flex as="aside" flexStyle={style.QAItem}>
            <Flex flexStyle={style.AIListItemLeft}>
              Q2:{sentence("CAN_AI_CHATBOTS_UNDERSTAND")}:
            </Flex>
            <Flex flexStyle={style.AISentence}>
              {formatSentence(sentence("YES_AI_CHATBOTS_CAN"))}
            </Flex>
          </Flex>

          <Flex as="aside" flexStyle={style.QAItem}>
            <Flex flexStyle={style.AIListItemLeft}>
              Q3:{sentence("HOW_SECURE_ARE_AI_CHATBOTS")}:
            </Flex>
            <Flex flexStyle={style.AISentence}>
              {formatSentence(sentence("AI_CHATBOTS_CAN_BE_DESIGNED"))}
            </Flex>
          </Flex>

          <Flex as="aside" flexStyle={style.QAItem}>
            <Flex flexStyle={style.AIListItemLeft}>
              Q4:{sentence("CAN_AI_CHATBOTS_LEARN")}:
            </Flex>
            <Flex flexStyle={style.AISentence}>
              {formatSentence(sentence("YES_AI_CHATBOTS_CAN_LEARN"))}
            </Flex>
          </Flex>

          <Flex as="aside" flexStyle={style.QAItem}>
            <Flex flexStyle={style.AIListItemLeft}>
              Q5:{sentence("HOW_CAN_BUSINESSES_IMPLEMENT")}:
            </Flex>
            <Flex flexStyle={style.AISentence}>
              {formatSentence(sentence("TO_IMPLEMENT_AI_CHATBOTS"))}
            </Flex>
          </Flex>
        </Flex>
      </Flex>

      <Flex className="column center">
        <Flex as="b">{t("ARE_YOU_READY")}</Flex>
        <br />
        <Button className="bg-secondary" size={Size.xl}>
          <b>{t("MAKE_IT_HAPPENS")}</b>
        </Button>
      </Flex>
    </Flex>
  );
}
export default AIDetails;
