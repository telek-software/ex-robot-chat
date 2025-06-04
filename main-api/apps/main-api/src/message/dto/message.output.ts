import { Field, ObjectType } from '@nestjs/graphql';

import { AnswerStructure, QuestionStructure } from '~[shared]/structures';

import { AnswerOutput } from './answer.output';
import { QuestionOutput } from './question.output';

@ObjectType()
export class MessageOutput {
  constructor(data: AnswerStructure | QuestionStructure) {
    if ('prompt' in data) this.question = new QuestionOutput(data);
    else this.answer = new AnswerOutput(data);
  }

  @Field(() => QuestionOutput, { nullable: true })
  question?: QuestionStructure;

  @Field(() => AnswerOutput, { nullable: true })
  answer?: AnswerStructure;
}
