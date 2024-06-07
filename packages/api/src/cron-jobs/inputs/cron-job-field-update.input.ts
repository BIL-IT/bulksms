import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CronJobNewFielUpdateInput {
  @Field()
  id: string;

  @Field()
  to: string;

  @Field()
  message: string;
}
