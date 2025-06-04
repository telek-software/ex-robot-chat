import { AnswerStructure } from './answer.structure';
import { QuestionStructure } from './question.structure';

/**
 */
export interface MessageStructure {
  question?: QuestionStructure;
  answer?: AnswerStructure;
}
