import { IsNotEmpty } from 'class-validator';

import { ChatStructure } from '~[shared]/structures';

export class PostChatInput implements ChatStructure {
  @IsNotEmpty()
  user_id: number;

  api: string;

  model: string;
}
