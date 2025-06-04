import { useTranslations } from "next-intl";

import { Flex, Icon, Link, Menu } from "~components";
import { navLinks } from "~utils/navigation.utils";
import { DefaultProps } from "~utils/type.utils";

import HeaderScroll from "./HeaderScroll";
import style from "./style";

/**
 * Header
 * @module LayoutModule
 * @description
 * The header of the layout
 */
function Header(props: DefaultProps) {
  const { children } = props;
  const t = useTranslations();
  const headerNavs = [navLinks.privacy, navLinks.AIChatbot];

  return (
    <Flex as="header" flexStyle={{ height: "4rem" }}>
      <HeaderScroll>
        <Link
          href="/"
          flexStyle={{ display: "flex" }}
          className="color-secondary"
        >
          <Flex as="h1" flexStyle={style.headerTitle}>
            Chappygo
          </Flex>
          <Icon
            src="/logo-c-1.svg"
            className="bg-secondary"
            flexStyle={style.headerBrand}
          />
        </Link>
        <Menu flexStyle={style.headerMenu}>
          {(MenuBtn) => (
            <>
              <Flex as="nav" flexStyle={style.headerNav}>
                {headerNavs.map(({ key, url, icon }) => (
                  <Link
                    key={url}
                    className="color-secondary"
                    flexStyle={style.headerNavItem}
                    href={url}
                  >
                    <Icon name={icon} size="1rem" />
                    <span>{t(key)}</span>
                  </Link>
                ))}
                {children}
              </Flex>
              <MenuBtn className="bg-reverse">
                <Icon
                  name="Menu"
                  style={{ color: "var(--color-secondary)" }}
                  className="menu"
                  size="2rem"
                />
              </MenuBtn>
            </>
          )}
        </Menu>
      </HeaderScroll>
    </Flex>
  );
}

export default Header;
