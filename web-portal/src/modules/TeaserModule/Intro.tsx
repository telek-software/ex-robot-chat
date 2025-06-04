import { useTranslations } from "next-intl";

import { Button, Flex, Image } from "~components";

import { exampleWork } from "./constant";
import style from "./style";

/**
 * TeaserIntro
 * @description
 * Intro for the teaser (position 1)
 *
 */
function TeaserIntro() {
  const t = useTranslations();
  return (
    <Flex as="section" flexStyle={style.intro}>
      <Flex flexStyle={style.introContent}>
        <Flex className="column">
          <Flex
            flexStyle={style.introTitle}
            as="h1"
            className="font-cool color-secondary text-shadow"
          >
            {t("INTRO")}
          </Flex>
          <Button className="bg" icon="Fire">
            <Flex as="b">{t("GET_STARTED")}</Flex>
          </Button>
        </Flex>
        <Flex flexStyle={style.introImg}>
          {/* <Image src="/bot.svg" fill alt="hello-bot" size="400px" /> */}
          <Image
            className="img-size-auto"
            radius
            alt="Chappygo app"
            src={exampleWork}
            width={850}
            height={500}
            style={{
              height: "auto",
              boxShadow: "0rem 0.4rem 1rem 0rem black",
            }}
            blur
          />
        </Flex>
      </Flex>
    </Flex>
  );
}
export default TeaserIntro;
