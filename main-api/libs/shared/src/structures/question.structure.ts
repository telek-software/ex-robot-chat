export interface QuestionStructure {
  prompt: string;
  user_id: number;
  chat_uuid?: string;
  context?: string;
  api: string;
  max_tokens: number;
  model: string;
  temperature: number;
}
