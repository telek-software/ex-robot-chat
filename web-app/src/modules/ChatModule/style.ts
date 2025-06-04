import { ResponsiveStyle } from '~lib/styled-components'

const style: Record<string, ResponsiveStyle> = <const>{
  content: {
    padding: '0.5rem 0.5rem',
    width: 'fit-content',
    borderRadius: '1rem',
    minWidth: '3rem',
  },
  contentSender: {
    placeItems: 'center',
    marginBottom: '0.5rem',
  },
  contentSenderIcon: {
    borderRadius: '100%',
  },
  context: {
    flexFlow: 'column',
  },
  contextCollapse: {
    width: '100%',
    flexFlow: 'column',
  },
  contextText: {
    flexGrow: '1',
    width: '100%',
    minHeight: '6rem',
  },
  chat: {
    flexFlow: 'column',
    minHeight: '5rem',
    margin: 'auto',
    padding: '1rem 0 0',
    width: '96%',
    maxWidth: '50rem',
    rowGap: '0.8rem',
  },
  chatInput: {
    width: '100%',
    columnGap: '0.5rem',
    placeItems: 'center',
    placeContent: 'center',
  },
  discussion: {
    flexFlow: 'column',
    padding: '1rem 1.2rem',
    rowGap: '0.5rem',
    maxHeight: '20rem',
    minHeight: '12rem',
    overflowY: 'auto',
  },
  history: {
    width: '100%',
    height: '100%',
  },
  historyList: {
    padding: '1rem 0.1rem',
    margin: '0 1rem 0',
    placeItems: 'center',
    borderRadius: '1rem',
    width: '12rem',
    height: '100%',
    flexFlow: 'column',
    rowGap: '0.5rem',
    md: {
      width: '16rem',
    },
  },
  historyLink: {
    height: '2.4rem',
    placeItems: 'center',
    display: 'flex',
    placeContent: 'center',
    width: '100%',
  },
  historyChat: {
    width: '100%',
    placeContent: 'center',
    placeItems: 'center',
  },
  historyChatContent: {
    width: '100%',
    flexFlow: 'column',
    placeItems: 'center',
  },
  message: { flexFlow: 'column' },
  sourceData: {
    flexFlow: 'column',
    placeItems: 'center',
    placeContent: 'center',
    rowGap: '0rem',
    maxWidth: '50rem',
  },
  sourceTypes: {
    columnGap: '1rem',
  },
  text: {
    width: '100%',
    height: '3rem',
  },
  upload: {
    flexFlow: 'column',
    width: '100%',
  },
  uploadArea: {
    width: '100%',
    height: '4rem',
  },
}

export default style
