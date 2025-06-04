import { ResponsiveStyle } from "~lib/styled-components";

const style: Record<string, ResponsiveStyle> = <const>{
  AI: {
    margin: "1rem 0",
    padding: "1rem 3%",
    maxWidth: "90vw",
    rowGap: "4rem",
    lg: {
      fontSize: "1.2em",
      margin: "5rem 0",
      padding: "3rem",
      maxWidth: "80rem",
    },
  },
  AISection: {
    flexFlow: "column",
    md: {
      display: "grid",
      gridTemplateRows: "3em 1fr",
    },
  },
  AISentence: {
    flexFlow: "column",
    padding: "0 1.5rem",
  },
  AIList: {
    padding: "0 1.5rem",
    rowGap: "1.5rem",
    flexFlow: "column",
  },
  AIListItem: {
    flexFlow: "column",
    md: {
      display: "grid",
      gridTemplateColumns: "18rem 1fr",
      columnGap: "2rem",
    },
  },
  AIListItemLeft: {
    fontWeight: "bold",
    margin: "0 0 0.5rem 0",
    md: {
      textAlign: "right",
      justifyContent: "flex-end",
    },
  },
  QA: {
    paddingTop: "2rem",
    paddingBottom: "4rem",
    rowGap: "3rem",
  },
  QAItem: {
    placeItems: "flex-start",
    flexFlow: "column",
  },

  privacy: {
    margin: "1rem 0",
    padding: "1rem 3%",
    maxWidth: "90vw",
    rowGap: "4rem",
    lg: {
      fontSize: "1.1em",
      margin: "5rem 0",
      padding: "3rem",
      maxWidth: "60rem",
    },
  },
  privacySection: {
    flexFlow: "column",
    md: {
      display: "grid",
      gridTemplateRows: "3em 1fr",
    },
  },
  privacySentence: {
    flexFlow: "column",
    padding: "0 1.5rem",
  },
  privacyList: {
    padding: "0 1.5rem",
    rowGap: "1.5rem",
    flexFlow: "column",
  },
  privacyListItem: {
    flexFlow: "column",
    md: {
      display: "grid",
      gridTemplateColumns: "12rem 1fr",
      columnGap: "2rem",
    },
  },
  privacyRowLeft: {
    fontWeight: "bold",
    margin: "0 0 0.5rem 0",
    md: {
      textAlign: "right",
      justifyContent: "flex-end",
    },
  },
};

export default style;
