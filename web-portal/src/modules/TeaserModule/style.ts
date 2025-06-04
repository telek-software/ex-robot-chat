import { ResponsiveStyle } from "~lib/styled-components";

/**
 * style
 * @module TeaserModule
 * @description
 * Style with mediasQueries (xs, sm, md, lg, xl)
 */
const style: Record<string, ResponsiveStyle> = <const>{
  intro: {
    width: "100%",
    paddingTop: "1rem",
    paddingBottom: "1rem",
    marginBottom: "1rem",
    fontSize: "1.2em",
    md: {
      marginBottom: "2em",
      paddingTop: "3rem",
      fontSize: "2em",
    },
  },
  introContent: {
    padding: "0 0 0 4%",
    flexFlow: "column",
    margin: "auto",
    rowGap: "2em",
    lg: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      columnGap: "3rem",
    },
  },
  introTitle: {
    flexShrink: 0,
    width: "90%",
    maxWidth: "97vw",
    lg: {
      width: "40rem",
      position: "relative",
      top: "2rem",
    },
  },
  introImg: {
    lg: {
      position: "relative",
    },
  },

  presenting: {
    flexDirection: "column",
    alignItems: "center",
    rowGap: "3rem",
    width: "100%",
    sm: {
      width: "auto",
      borderRadius: "var(--radius)",
    },
  },
  presentingMedia: {
    width: "100%",
    maxWidth: "100%",
    height: "10em",
    placeContent: "center",
    placeItems: "center",
    borderRadius: "var(--radius)",
    md: {
      width: "30em",
      maxWidth: "60em",
      height: "20em",
    },
  },
  presentingDesc: {
    borderRadius: "var(--radius)",
    padding: "1rem 2rem 2.5rem",
    fontSize: "1.2em",
    flexFlow: "column",
    placeContent: "center",
    placeItems: "center",
    rowGap: "0.5rem",
    maxWidth: "90vw",
    md: {
      rowGap: "2rem",
    },
  },
  cards: {
    textAlign: "center",
    flexFlow: "row wrap",
    maxWidth: "90vw",
    columnGap: "1rem",
    width: "auto",
    lg: {
      columnGap: "2rem",
    },
  },
  cardImage: {
    position: "relative",
    width: "100%",
    height: "100%",
  },
  cardItem: {
    width: "15rem",
    height: "17rem",
    margin: "0 1rem",
  },

  example: {
    marginTop: "5em",
    placeContent: "center",
    flexFlow: "column",
    width: "100vw",
    maxWidth: "60em",
    rowGap: "1rem",
    md: {
      rowGap: "6em",
    },
  },
  exampleSection: {
    placeContent: "space-evenly",
  },
  exampleRobot: {
    position: "relative",
    height: "18em",
    width: "18em",
    transform: "scaleX(-1)",
  },
  exampleDesc: {
    fontSize: "1.4rem",
    margin: "auto",
    maxWidth: "90vw",
    padding: "1rem 1rem",
    borderRadius: "var(--radius)",
    lg: {
      padding: "1rem 5rem",
    },
  },
  exampleAside: {
    fontSize: "1.2em",
    padding: "0.5rem 1rem",
    maxWidth: "90vw",
    width: "30em",
    md: {
      padding: "1rem 2rem",
    },
  },
  exampleImg: {
    position: "relative",
    height: "20em",
    margin: "4rem auto",
    width: "90vw",
    borderRadius: "var(--radius)",
    boxShadow: "0px 0px 9px -1px",
    md: {
      maxWidth: "60em",
      height: "30em",
    },
  },
  exampleTease: {
    fontSize: "1.8rem",
    maxWidth: "97vw",
    margin: "auto",
    md: {
      fontSize: "2.5rem",
    },
  },
  exampleBtn: {
    maxWidth: "90vw",
    md: {
      fontSize: "1.2em",
    },
  },
};

export default style;
