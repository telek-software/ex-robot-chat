import NextImage from "next/image";

import { enClassname } from "~utils/dom.utils";
import { keysToString } from "~utils/object.utils";
import { DefaultProps } from "~utils/type.utils";

type ImageProps = DefaultProps & {
  alt?: string;
  blur?: boolean;
  fill?: boolean;
  height?: number;
  radius?: boolean;
  size?: string;
  src: string;
  width?: number;
};

/**
 * Image
 * @component
 * @description
 * It only uses NextImage component
 */
function Image(props: ImageProps) {
  const { alt = "Image", className, fill = false, height, ...rest } = props;
  const { radius = false, blur, size, src, style, width } = rest;

  const stringProps = keysToString({ radius }).split(" ");
  const propsClass = enClassname(stringProps, className);

  return (
    <NextImage
      sizes={size}
      alt={alt}
      blurDataURL={blur ? "/blur.svg" : undefined}
      className={propsClass}
      fill={fill}
      height={height}
      placeholder={blur ? "blur" : undefined}
      src={src}
      style={style}
      width={width}
    />
  );
}

export default Image;
