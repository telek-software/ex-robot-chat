"use client";

import useEnsafe from "~hooks/useEnsafe";
import { StyledButton } from "~lib/styled-components";
import { enClassname } from "~utils/dom.utils";
import { Size, Status } from "~utils/enum.utils";
import { DefaultProps } from "~utils/type.utils";

import Icon, { IconNameType } from "./Icon";

type ButtonProps = DefaultProps & {
  href?: string;
  icon?: IconNameType;
  label?: string;
  onClick?: () => void;
  size?: Size;
  status?: Status;
};

/**
 * Button
 * @component
 */
function Button(props: ButtonProps) {
  const { className, flexStyle, href, icon, id, label = "", ...rest } = props;
  const { onClick = () => {}, size = Size.md, ...more } = rest;
  const { status, testId, style } = more;
  const { ensafe } = useEnsafe();

  const handleClick = () => {
    const safeClick = ensafe(onClick);
    safeClick();
  };

  let classed = enClassname([size], className);
  if (status) classed.concat(` bg-light-${status}`);

  return (
    <StyledButton
      id={id}
      $responsive={flexStyle}
      as={href ? "a" : undefined}
      className={classed}
      data-testid={testId}
      href={href}
      onClick={href ? undefined : handleClick}
      role="button"
      style={style}
      type="button"
    >
      {icon && <Icon name={icon} size="1.2em" />}
      {label && <span>{label}</span>}
      {props.children && props.children}
    </StyledButton>
  );
}

export default Button;
