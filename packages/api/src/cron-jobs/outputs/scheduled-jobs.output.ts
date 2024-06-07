import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ScheduledJobsOutput {
  @Field()
  id: string;

  @Field()
  createdAt: Date;

  @Field()
  to: string;

  @Field()
  message: string;
}
