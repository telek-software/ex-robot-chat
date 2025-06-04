"use client";

import { HTMLInputTypeAttribute, InputHTMLAttributes } from "react";

import useEnsafe from "~hooks/useEnsafe";
import { ResponsiveStyle, StyledInput } from "~lib/styled-components";
import { enClassname } from "~utils/dom.utils";
import { Size, Status } from "~utils/enum.utils";
import { Primitive } from "~utils/type.utils";
import { checkIsBoolean } from "~utils/typeGuard.utils";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
  flexStyle?: ResponsiveStyle;
  isAsync?: boolean;
  onChange: (value?: Primitive) => void;
  size?: Size;
  status?: Status;
  type?: HTMLInputTypeAttribute;
  testId?: string;
};

/**
 * Input
 * @component
 * @description
 * We can set isAsync at true to improve performance when we want to
 * execute an heavy task on each value update
 */
function Input(props: InputProps) {
  const {
    className,
    defaultValue,
    flexStyle,
    isAsync,
    onChange,
    placeholder,
    id,
    size = Size.md,
    status,
    type = "text",
    value,
    testId,
  } = props;

  const { ensafe } = useEnsafe();
  const safeChange = ensafe((input) => onChange(input as Primitive));

  const eventAdapter = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.type === "checkbox") return event.target.checked;
    return event.target.value;
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!isAsync) safeChange(eventAdapter(event));
  };

  const handleBlur = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (isAsync) safeChange(eventAdapter(event));
  };

  const style = status ? {} : {};
  const classed = enClassname([size], className);

  return (
    <StyledInput
      id={id}
      $responsive={flexStyle}
      checked={checkIsBoolean(value) ? value : undefined}
      className={classed}
      data-testid={testId}
      defaultValue={checkIsBoolean(value) ? undefined : defaultValue}
      onBlur={handleBlur}
      onChange={handleChange}
      placeholder={placeholder}
      style={style}
      type={type}
      value={checkIsBoolean(value) ? undefined : value}
    />
  );
}

export default Input;
