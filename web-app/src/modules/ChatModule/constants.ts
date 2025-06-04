import { ValueOf } from '~utils/type.utils'

export const SOURCE_TYPES = <const>{
  FILES: 'files',
  URL: 'url',
  TEXT: 'text',
  DATABASE: 'database',
}

export const FILES_TYPE = <const>{
  JSON: 'application/json',
  PDF: 'application/pdf',
  CSV: 'text/csv',
}

export type FileType = Exclude<
  ValueOf<typeof SOURCE_TYPES> | ValueOf<typeof FILES_TYPE>,
  'files'
>

export function isFileType(fileType: string): fileType is FileType {
  return (
    Object.values(FILES_TYPE).some((v) => v === fileType) ||
    Object.values(SOURCE_TYPES).some(
      (v) => v !== SOURCE_TYPES.FILES && v === fileType,
    )
  )
}

export const DEFAULT_CONTEXT = `You are an AI assistant for answering questions about the below context. You are given the following extracted parts of a long document and a question. Provide a conversational answer. If you don't know the answer, just say "Hmm, I'm not sure." Don't try to make up an answer. If the question is not about the context, politely inform them that you are tuned to only answer questions about the context.`
