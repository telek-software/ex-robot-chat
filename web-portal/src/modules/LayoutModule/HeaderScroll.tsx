"use client";
import { useDeferredValue, useEffect, useState } from "react";

import { Flex } from "~components";
import { DefaultProps } from "~utils/type.utils";

import style from "./style";

/**
 * HeaderScroll
 * @module LayoutModule
 * @description
 * The header of the layout
 */
function HeaderScroll(props: DefaultProps) {
  const { children } = props;
  const [isScrolling, setScrollingState] = useState(false);
  const hasScrolled = useDeferredValue(isScrolling);
  const listener = (ev: Event) => {
    setScrollingState((oldState) => {
      if (window.scrollY > 150 && !oldState) return true;
      if (window.scrollY <= 150 && oldState) return false;
      return oldState;
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", listener);
    return () => {
      window.removeEventListener("scroll", listener);
    };
  }, []);

  return (
    <Flex
      style={
        hasScrolled
          ? {
              backgroundColor: "var(--color-fg)",
              boxShadow: "0 1px 6px -3px var(--color-secondary)",
              opacity: "0.99",
            }
          : {}
      }
      flexStyle={style.header}
    >
      {children}
    </Flex>
  );
}

export default HeaderScroll;
