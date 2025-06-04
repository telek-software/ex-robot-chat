"use client";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

import { Dropdown, Flex, Image } from "~components";
import { Lang, languageNames, languages } from "~lib/i18n";

/**
 * export LanguageSwitcher
 * @description
 * Language switcher
 *
 */
export default function LanguageSwitcher() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  const nextPath = segments.slice(1).join("/");
  const locale = segments[0];
  const router = useRouter();
  const handleClick = (locale: Lang) => {
    router.replace(`/${locale}/${nextPath}`);
  };
  return (
    <Dropdown className="bg hollow" icon="Language">
      {(ItemContainer) =>
        languages
          .filter((v) => v !== locale)
          .map((lang) => (
            <ItemContainer
              className="bg"
              key={lang}
              onClick={() => handleClick(lang)}
            >
              <Flex flexStyle={{ placeItems: "center" }}>
                <Image src={`/${lang}.svg`} alt="uk" width={36} height={30} />
                :&nbsp;{languageNames[lang]}
              </Flex>
            </ItemContainer>
          ))
      }
    </Dropdown>
  );
}
