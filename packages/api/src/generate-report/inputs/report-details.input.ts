import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ReportDetailsInput {
  @Field()
  startDate: Date;

  @Field()
  endDate: Date;

  @Field(() => [String])
  status: string[];
}
