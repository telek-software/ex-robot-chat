import { Size } from "~utils/enum.utils";

import { media, toStylesheet } from "../mediaQueries";

test("media", () => {
  Object.values(Size).map((size) =>
    expect(media[size]).toEqual(
      expect.stringMatching(/@media \(min-width: \d{3,4}px\)/)
    )
  );
});

test("toStylesheet", () => {
  const exampleCSS = {
    width: "5em",
    sm: {
      cursor: "pointer",
    },
    md: {
      backgroundColor: "#fff",
      color: "#ffa",
    },
    lg: {
      backgroundColor: "#aaa",
      color: "#aab",
      width: "4em",
    },
  };
  const { sm, md, lg } = exampleCSS;
  const result = toStylesheet({ sm, md, lg });
  expect(result).toEqual(
    expect.objectContaining({
      [media.sm]: exampleCSS.sm,
      [media.md]: exampleCSS.md,
      [media.lg]: exampleCSS.lg,
    })
  );
});
