import { useState } from 'react'
import i18n, { changeLanguage } from 'i18next'

import { Dropdown, Flex, Image } from '~components'
import { Lang, languageNames, languages } from '~lib/i18n'

/**
 * export LanguageSwitcher
 * @description
 * Language switcher
 *
 */
export default function LanguageSwitcher() {
  const [cur, setCur] = useState(i18n.language)
  const change = (lang: Lang) => {
    setCur(lang)
    void changeLanguage(lang)
  }
  return (
    <Dropdown className="bg hollow" icon="Language">
      {(ItemContainer) =>
        languages
          .filter((v) => v !== cur)
          .map((lang) => (
            <ItemContainer
              className="bg"
              key={lang}
              onClick={() => change(lang)}>
              <Flex flexStyle={{ placeItems: 'center' }}>
                <Image src={`/${lang}.svg`} alt="uk" width={36} height={30} />
                :&nbsp;{languageNames[lang]}
              </Flex>
            </ItemContainer>
          ))
      }
    </Dropdown>
  )
}
