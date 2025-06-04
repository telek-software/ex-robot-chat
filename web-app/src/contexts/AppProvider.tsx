import { createContext, useContext, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { logger } from '~utils/config.utils'
import { DefaultProps } from '~utils/type.utils'

type AppData = {
  breadcrumb: { label: string; url: string }[]
}

type AppContextType = {
  breadcrumb?: AppData['breadcrumb']
  setBreadcrumb: (value: AppData['breadcrumb']) => void
  save: (key: string, value: unknown) => void
  getSession: (key: string) => unknown
}

const AppContext = createContext<AppContextType | null>(null)

/**
 * AppProvider
 * @context
 * @description
 * This context will provide common features for the components
 */
function AppProvider(props: DefaultProps) {
  const { children } = props
  const { t } = useTranslation()
  const [session, setSession] = useState<Record<string, unknown>>({})
  const initialInfos = {
    breadcrumb: [{ label: t('HOME'), url: '/' }],
  }
  const [infos, setInfo] = useState<AppData>(initialInfos)
  const save = (key: string, value: unknown) => {
    logger.info(`[app-context] saving on ${key}`)
    setSession((state) => ({ ...state, [key]: value }))
  }

  const getSession = (key: string) => {
    logger.info(`[app-context] get ${key}`)
    return session[key]
  }

  const setBreadcrumb = (arr: AppData['breadcrumb']) =>
    setInfo((state) => {
      return {
        ...state,
        breadcrumb: [...initialInfos.breadcrumb, ...arr],
      }
    })

  const { breadcrumb } = infos || {}
  const value = useMemo(
    () => ({
      breadcrumb: breadcrumb || [],
      getSession,
      setBreadcrumb,
      save,
    }),
    [...breadcrumb.map((v) => v.url), session], // eslint-disable-line
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export default AppProvider

/** @hook */
export const useApp = () => {
  const context = useContext(AppContext)
  if (!context) throw new Error('useApp must be called inside AppProvider')
  return context
}
