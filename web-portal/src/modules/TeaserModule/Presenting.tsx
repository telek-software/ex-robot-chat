import { useTranslations } from "next-intl";

import { Button, Card, Flex, Icon, Slide } from "~components";
import { I18N_KEY } from "~lib/i18n";
import { Size } from "~utils/enum.utils";

import { infosLinks } from "./constant";
import style from "./style";

/**
 * Presenting
 * @description
 * Show more details for the teaser (position 2)
 *
 */
function Presenting() {
  const t = useTranslations();
  const sentence = useTranslations(I18N_KEY.LONG);
  return (
    <Flex as="section" flexStyle={style.presenting}>
      <Flex flexStyle={style.cards}>
        <Slide
          range={2}
          hideAfter={Size.xl}
          duration={12}
          className="bg-secondary hollow infinite"
        >
          {infosLinks.map(({ key, url }) => (
            <Card
              key={url}
              className="bg-secondary hollow shadow"
              flexStyle={style.cardItem}
            >
              <Icon
                src={url}
                className="linear-secondary"
                flexStyle={style.cardImage}
              />
              <Flex
                as="strong"
                className="color-secondary"
                flexStyle={{ minHeight: "2rem" }}
              >
                {t(key)}
              </Flex>
            </Card>
          ))}
        </Slide>
      </Flex>
      <Flex
        as="section"
        className="linear shadow-hight"
        flexStyle={style.presentingDesc}
      >
        <Flex as="h3">{sentence("TRY_OUR_PRODUCT")} </Flex>
        <Flex className="bg-reverse" flexStyle={style.presentingMedia}>
          Video
        </Flex>
        <Button className="bg hollow" icon="Fire">
          <Flex as="b">{t("GET_STARTED")}</Flex>
        </Button>
      </Flex>
    </Flex>
  );
}
export default Presenting;
