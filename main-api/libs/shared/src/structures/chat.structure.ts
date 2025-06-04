export interface ChatStructure {
  uuid?: string;
  initial_message?: string;
  sugested_message?: string;
  user_id?: number;
  // shared with message
  api: string;
  max_tokens?: number;
  model: string;
  temperature?: number;
  // iframe:
  font_family?: string;
  font_size?: string;
  font_weight?: string;
  height?: string;
  iframe_color?: string;
  name?: string;
  picture?: string;
  question_color?: string;
  radius?: string;
  response_color?: string;
  width?: string;
}
