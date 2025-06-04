import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'

import { Flex, Icon, Image, Link } from '~components'
import { PATHS } from '~utils/config.utils'
import { DefaultProps } from '~utils/type.utils'

import style from './style'

function Side(props: DefaultProps) {
  const { id } = props
  const { t } = useTranslation()
  const { pathname: loc } = useLocation()
  const iconSize = '2.5em'
  return (
    <Flex id={id} flexStyle={style.side} className="bg-reverse">
      <Flex href="/" flexStyle={style.sideTitle} className="color-secondary">
        <Image
          className="show-sm"
          src="/nianexa2-light-xs.png"
          style={{ margin: 'auto', width: '70%' }}
        />
        <Image
          className="hide-sm"
          src="/nianexa2-light-md.png"
          style={{ margin: 'auto', width: '90%' }}
        />
      </Flex>
      <Flex>
        <Flex as="ul" flexStyle={style.sideList}>
          <Flex
            as="li"
            className={`${loc === PATHS.HOME && 'bg-secondary'}`}
            flexStyle={style.sideItem}>
            <Link href={PATHS.HOME} flexStyle={style.sideLink}>
              <Flex flexStyle={style.sideIcon}>
                <Icon name="Home" size={iconSize} />
              </Flex>
              <Flex flexStyle={style.sideLink} className="hide-md">
                {t('HOME')}
              </Flex>
            </Link>
          </Flex>
          <hr style={{ width: '100%' }} />
          <Flex as="li" flexStyle={style.sideItem} className="disabled">
            <Link flexStyle={style.sideLink}>
              <Flex flexStyle={style.sideIcon}>
                <Icon name="Dashboard" size={iconSize} />
              </Flex>
              <Flex flexStyle={style.sideLink} className="hide-md">
                {t('DASHBOARD')}
              </Flex>
            </Link>
          </Flex>
          <hr style={{ width: '100%' }} />
          <Flex
            as="li"
            className={`${loc.startsWith(PATHS.CHATBOT) && 'bg-secondary'}`}
            flexStyle={style.sideItem}>
            <Link href={PATHS.CHATBOT} flexStyle={style.sideLink}>
              <Flex flexStyle={style.sideIcon}>
                <Icon name="SmartToy" size={iconSize} />
              </Flex>
              <Flex flexStyle={style.sideLink} className="hide-md">
                {t('CHATBOT')}
              </Flex>
            </Link>
          </Flex>
          <hr style={{ width: '100%' }} />
          <Flex
            as="li"
            className={`${
              loc.startsWith(PATHS.CUSTOMIZATION) && 'bg-secondary'
            }`}
            flexStyle={style.sideItem}>
            <Link href={PATHS.CUSTOMIZATION} flexStyle={style.sideLink}>
              <Flex flexStyle={style.sideIcon}>
                <Icon name="Settings" size={iconSize} />
              </Flex>
              <Flex flexStyle={style.sideLink} className="hide-md">
                {t('SETTINGS')}
              </Flex>
            </Link>
          </Flex>
          <hr style={{ width: '100%' }} />
        </Flex>
      </Flex>
    </Flex>
  )
}
export default Side
