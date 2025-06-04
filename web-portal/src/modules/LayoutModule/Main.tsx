import { Flex } from "~components";
import { DefaultProps } from "~utils/type.utils";

import style from "./style";

/**
 * Main
 * @module LayoutModule
 * @description
 * The whole page of the App
 */
function Main(props: DefaultProps) {
  const { children } = props;
  return (
    <Flex as="main" flexStyle={style.main}>
      {children}
    </Flex>
  );
}

export default Main;
