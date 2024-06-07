import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CronJobNewFieldInput {
  @Field()
  number: string;

  @Field()
  message: string;
}
