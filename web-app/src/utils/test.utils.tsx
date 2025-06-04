import { ReactElement } from 'react'
import {
  render,
  renderHook,
  RenderHookOptions,
  RenderOptions,
} from '@testing-library/react'

import { ContextsProviders } from '~main'

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return <ContextsProviders>{children}</ContextsProviders>
}

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, { wrapper: AllTheProviders, ...options })

function customRenderHook<T, P = unknown>(
  renderFn: (initialProps: P) => T,
  options?: Omit<RenderHookOptions<P>, 'wrapper'>,
) {
  return renderHook<T, P>(renderFn, { wrapper: AllTheProviders, ...options })
}

export * from '@testing-library/react'
export { customRender as render, customRenderHook as renderHook }
