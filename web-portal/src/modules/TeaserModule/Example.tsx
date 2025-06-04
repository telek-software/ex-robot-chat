import { useTranslations } from "next-intl";

import { Button, Flex, Icon, Image, Title } from "~components";
import { I18N_KEY } from "~lib/i18n";
import { Size } from "~utils/enum.utils";
import { formatSentence } from "~utils/string.utils";

import { exampleWork } from "./constant";
import style from "./style";

/**
 * Example
 * @description
 * Provide an example of the use of the app (position 3)
 *
 */
function Example() {
  const t = useTranslations();
  const sentence = useTranslations(I18N_KEY.LONG);
  return (
    <Flex as="section" flexStyle={style.example}>
      <Flex className="radius" flexStyle={style.exampleSection}>
        <Flex
          as="section"
          flexStyle={style.exampleAside}
          className="linear shadow-hight column"
        >
          <Title as="h2">{t("IM_NOT_ONLY_CHATBOT")}</Title>
          <Flex as="p" className="column">
            {formatSentence(sentence("PREPARE_TO_TAKE_YOUR_COMPANY_TO"))}
          </Flex>
        </Flex>
        <Flex className="hide-md" flexStyle={style.exampleRobot}>
          <Image src="/bot.svg" fill alt="hello-bot" size="300px" />
        </Flex>
      </Flex>

      <Flex className="radius" flexStyle={style.exampleSection}>
        <Icon
          src="/affordable.svg"
          className="linear-secondary hide-md"
          flexStyle={{ width: "15rem" }}
        />
        <Flex
          as="section"
          flexStyle={style.exampleAside}
          className="linear shadow-hight column"
        >
          <Title as="h2">{t("AFFORDABLE_SOLUTION")}</Title>
          <Flex as="p" className="column center">
            {formatSentence(sentence("SMALL_AND_MEDIUMSIZED_BUSINESSES"))}
            <br />
            {formatSentence(sentence("ADDRESS_THIS_CHALLENGE"))}
          </Flex>
        </Flex>
      </Flex>

      <Flex className="radius" flexStyle={style.exampleSection}>
        <Flex
          as="section"
          flexStyle={style.exampleAside}
          className="linear shadow-hight column"
        >
          <Title as="h2">{t("PRIVACY_MASK_OF_DATA")}</Title>
          <Flex as="p" className="column">
            {formatSentence(sentence("EMPLOY_PRIVACY"))}
            <br />
            {formatSentence(sentence("ENSURE_PRIVACY"))}
          </Flex>
        </Flex>
        <Icon
          src="/privacy.svg"
          className="linear-secondary hide-md"
          flexStyle={{ width: "15rem" }}
        />
      </Flex>

      <Flex className="column" flexStyle={{ rowGap: "2rem" }}>
        <Flex
          className="color-secondary font-cool"
          flexStyle={style.exampleTease}
        >
          {t("ARE_YOU_READY")}
        </Flex>
        <Flex className="center">
          <Button
            className="bg-secondary shadow-hight"
            size={Size.xl}
            flexStyle={style.exampleBtn}
            icon="CursorArrowRays"
          >
            <b>{t("GET_YOUR_ASSISTANT")}</b>
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default Example;
