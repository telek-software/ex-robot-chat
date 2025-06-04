import { RefObject } from "react";

import useScroll from "~hooks/useScroll";
import { fireEvent, renderHook } from "~utils/test.utils";

test("useScroll", () => {
  const htmlElement = document.createElement("div");

  const ref: RefObject<HTMLDivElement> = {
    current: htmlElement,
  };

  const { result } = renderHook(() => useScroll({ ref, trigger: 50 }));
  expect(result.current.isScrolling).toBeFalsy();
  fireEvent.scroll(ref.current as Element, {
    target: { scrollTop: 700 },
  });
  expect(result.current.isScrolling).toBeTruthy();
});
