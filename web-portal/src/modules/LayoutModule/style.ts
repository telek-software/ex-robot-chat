import { ResponsiveStyle } from "~lib/styled-components";

/**
 * style
 * @module LayoutModule
 * @description
 * Style with mediasQueries (xs, sm, md, lg, xl)
 */
const style: Record<string, ResponsiveStyle> = <const>{
  footer: {
    width: "100%",
    placeContent: "center space-around",
    minHeight: "10em",
  },
  header: {
    alignItems: "center",
    display: "grid",
    flexDirection: "column",
    gridTemplateColumns: "auto 1fr auto",
    margin: "0 auto",
    padding: "0 3%",
    width: "100%",
    position: "fixed",
    transition: "all, .3s",
    zIndex: "1",
  },
  headerTitle: {
    fontSize: "1.5rem",
    md: {
      fontSize: "2rem",
    },
  },
  headerBrand: {
    margin: "auto",
    width: "4rem",
    height: "3rem",
    position: "relative",
    md: {
      width: "5rem",
      height: "4rem",
    },
  },
  headerMenu: {
    placeContent: "center flex-end",
    columnGap: "0.5rem",
    xl: {
      columnGap: "1rem",
    },
  },
  headerNav: {
    placeItems: "center",
    columnGap: "1rem",
  },
  headerNavItem: {
    textDecoration: "underline",
    fontSize: "1.1rem",
  },
  headerUtils: {
    columnGap: "0.5em",
  },
  headerScroll: {
    boxShadow: "0px 1px 1px 1px var(--color-fg)",
    display: "grid",
    gridTemplateColumns: "auto 1fr",
    height: "4rem",
    padding: "1em 3%",
    placeContent: "center",
    placeItems: "center",
    position: "fixed",
    transition: "transform, .5s, ease-out",
    width: "100%",
    maxWidth: "100vw",
    zIndex: 1,
  },
  main: {
    maxWidth: "100%",
    flexDirection: "column",
    alignItems: "center",
    alignContent: "center",
    backgroundImage: 'url("/plan.svg")',
    backgroundSize: "cover",
    paddingBottom: "5rem",
    backgroundOrigin: "padding-box",
    backgroundPosition: "0em",
    backgroundRepeat: "repeat-y",
    overflow: "hidden",
  },
};

export default style;
