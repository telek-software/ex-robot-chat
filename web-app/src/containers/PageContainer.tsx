import { useEffect } from 'react'

import { useApp } from '~contexts/AppProvider'
import { DefaultProps } from '~utils/type.utils'

type PageContainerType = DefaultProps & {
  breadcrumb?: { label: string; url: string }[]
}

/**
 * PageContainer
 * @module LayoutModule
 * @description
 * Default Layout PageContainer, the goal is to set the common behaviour
 * for each page
 */
function PageContainer(props: PageContainerType) {
  const { breadcrumb, children } = props
  const { setBreadcrumb } = useApp()

  useEffect(() => {
    if (breadcrumb) setBreadcrumb(breadcrumb)
  }, []) // eslint-disable-line

  return <>{children}</>
}

export default PageContainer
