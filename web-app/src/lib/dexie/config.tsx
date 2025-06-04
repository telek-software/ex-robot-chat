import { Dexie } from 'dexie'

export interface IChat {
  uuid: string
  api: string
  maxTokens: number
  model: string
  temperature: number
}

/**
 * ClientDatabase
 * @description
 * Client database using IndexeDB
 */
export class ClientDatabase extends Dexie {
  chats!: Dexie.Table<IChat, number>

  constructor() {
    super('ClientDatabase')
    this.version(1).stores({
      contacts: '+id,api,maxTokens,model,temperature',
    })
  }
}
