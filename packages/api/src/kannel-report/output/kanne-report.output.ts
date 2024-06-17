import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class KannelReport {
  @Field()
  bearerBoxReport: boolean;

  @Field()
  sMSBoxReport: boolean;
}
