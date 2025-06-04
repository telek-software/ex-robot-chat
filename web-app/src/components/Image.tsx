import { Styled } from '~lib/styled-components'
import { enClassname } from '~utils/dom.utils'
import { keysToString } from '~utils/object.utils'
import { DefaultProps } from '~utils/type.utils'

type ImageProps = DefaultProps & {
  alt?: string
  blur?: boolean
  fill?: boolean
  height?: string | number
  rounded?: boolean
  size?: string
  src: string
  width?: number | string
}

/**
 * Image
 * @component
 * @description
 * It only uses NextImage component
 */
function Image(props: ImageProps) {
  const { alt = 'Image', className, height, ...rest } = props
  const { rounded = false, src, style, width } = rest

  const stringProps = keysToString({ rounded }).split(' ')
  const propsClass = enClassname(stringProps, className)

  return (
    <Styled
      as="img"
      alt={alt}
      className={propsClass}
      src={src}
      style={style}
      width={width}
      height={height}
    />
  )
}

export default Image
