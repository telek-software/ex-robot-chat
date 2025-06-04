"use client";

import { Children, useEffect, useRef, useState } from "react";

import {
  Styled,
  StyledSlide,
  StyledSlideContent,
} from "~lib/styled-components";
import { Size } from "~utils/enum.utils";
import { DefaultProps } from "~utils/type.utils";

import Icon from "./Icon";

type SlideType = DefaultProps & {
  range?: number;
  hideAfter?: Size;
  duration?: number;
};

/**
 * Slide
 * @component
 * @description
 * Component to display elements using a slide animation
 */
function Slide(props: SlideType) {
  const ref = useRef<HTMLDivElement>(null);
  const { className, children, duration, flexStyle, ...rest } = props;
  const { hideAfter, range = 5 } = rest;
  const [index, setIndex] = useState(0);
  const [width, setWidth] = useState("100%");
  const count = Children.count(children);
  const getRef = (ind: number) => (ind === 0 ? { ref } : {});

  const smaller = (className || "").concat(
    !!hideAfter ? ` hide-${hideAfter}` : ""
  );
  const larger = (className || "").concat(
    !!hideAfter ? ` show-${hideAfter}` : ""
  );
  const listener = (e: Event) => {
    setWidth(`${ref.current?.clientWidth}px` || "");
  };

  useEffect(() => {
    window.addEventListener("resize", listener);
    return () => {
      window.removeEventListener("resize", listener);
    };
  }, []);

  useEffect(() => {
    if (ref.current?.clientWidth) {
      setWidth(`${ref.current.clientWidth}px`);
    }
  }, [ref.current?.clientWidth]); // eslint-disabled-line

  return (
    <>
      {!!hideAfter && <Styled className={smaller}>{children}</Styled>}
      <StyledSlide
        className={larger}
        $responsive={flexStyle}
        $range={range}
        $width={width}
        $duration={duration}
        style={{ width: `calc(${width} * ${range})` }}
      >
        <StyledSlideContent
          style={{
            right: `calc(${index} * ${width})`,
          }}
        >
          {Children.map(children, (child, ind) => (
            <div className="item" {...getRef(ind)}>
              {child}
            </div>
          ))}
          {Children.map(children, (child, ind) => (
            <div className="item" {...getRef(ind)}>
              {child}
            </div>
          ))}
        </StyledSlideContent>
        <button
          type="button"
          className="prev"
          disabled={index === 0}
          onClick={() => setIndex(index - 1)}
        >
          <Icon name="NavigateBefore" size="1.4em" />
        </button>

        <button
          type="button"
          className="next"
          disabled={index === count - range}
          onClick={() => setIndex(index + 1)}
        >
          <Icon name="NavigateNext" size="1.4em" />
        </button>
      </StyledSlide>
    </>
  );
}
export default Slide;
