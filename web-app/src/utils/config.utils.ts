export const SESSION_KEY = <const>'nianexa-session'
export const getSessionToken = () => localStorage.getItem(SESSION_KEY)?.trim()

export const ACTIONS = <const>{
  POST_HTTP_DOCUMENT: '/embedding/post-document',
}

export const PATHS = <const>{
  HOME: '/',
  CUSTOMIZATION: '/customization',
  HISTORY: '/history',
  CHATBOT: '/chatbot',
  SCRAP: '/scrap',
}

export const logger = {
  info(item: unknown) {
    if (process.env.NODE_ENV === 'development') console.info(item) // eslint-disable-line
    return item
  },
  error(item: unknown) {
    if (process.env.NODE_ENV === 'development') console.error(item) // eslint-disable-line
    return item
  },
}
