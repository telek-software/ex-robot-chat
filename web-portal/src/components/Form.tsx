import { StyledForm } from "~lib/styled-components";
import { enClassname } from "~utils/dom.utils";
import { Size } from "~utils/enum.utils";
import { DefaultProps } from "~utils/type.utils";

type FormProps = DefaultProps & {
  size?: Size;
};

/**
 * Form
 * @component
 */
function Form(props: FormProps) {
  const { children, className, flexStyle, id, size = Size.md } = props;
  const classed = enClassname([size], className);
  return (
    <StyledForm id={id} className={classed} $responsive={flexStyle}>
      {children}
    </StyledForm>
  );
}

export default Form;
