import { useState } from 'react'

import { logger } from '~utils/config.utils'

import { FileType, isFileType, SOURCE_TYPES } from './constants'

type EmbbededType = {
  id: number
  media?: string
  error?: string
  type: string
}

/**
 * useEmbbed
 * @module ChatModule
 * @description
 * Manage the state of emmbeded documents in a chat
 *
 */
function useEmbbed() {
  const [embbededList, setEmbbededList] = useState<EmbbededType[]>([])

  return {
    ...embbededList,
    addEmbbed(embbeded: EmbbededType) {
      let fileType: FileType = SOURCE_TYPES.TEXT
      if (isFileType(embbeded.type)) {
        fileType = embbeded.type
      } else logger.error(`[useEmbbed] bad type: ${embbeded.type} `)
      setEmbbededList((state) => [...state, { ...embbeded, type: fileType }])
    },
    removeEmbbed(id: number) {
      setEmbbededList((state) => state.filter((s) => s.id !== id))
    },
  }
}
export default useEmbbed
