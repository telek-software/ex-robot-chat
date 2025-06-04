import {
  ResponsiveStyle,
  StyledBreadcrumb,
  StyledBreadItem,
} from '~lib/styled-components'

type BreadcrumbType = {
  path?: { label: string; url: string }[]
  flexStyle?: ResponsiveStyle
}

/**
 * Breadcrumb
 * @component
 */
function Breadcrumb(props: BreadcrumbType) {
  const { flexStyle, path } = props
  return (
    <StyledBreadcrumb $responsive={flexStyle}>
      {path &&
        path.map((item, index) => (
          <StyledBreadItem key={item.label}>
            {index === path.length - 1 ? (
              <span className="current">{item.label}</span>
            ) : (
              <a href={item.url} className="item">
                {item.label}
              </a>
            )}
          </StyledBreadItem>
        ))}
    </StyledBreadcrumb>
  )
}

export default Breadcrumb
