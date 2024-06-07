import { Query, Resolver, Mutation, Args } from '@nestjs/graphql';
import { ScheduledJobsOutput } from './outputs/scheduled-jobs.output';
import { PrismaService } from 'src/prisma/prisma.service';
import { CronJobNewFieldInput } from './inputs/cron-job-new-field.input';

@Resolver()
export class CronJobsResolver {
  constructor(private prisma: PrismaService) {}

  @Query(() => [ScheduledJobsOutput])
  async getAllScheduledJobs(): Promise<ScheduledJobsOutput[]> {
    try {
      const scheduledJobs = await this.prisma.cron.findMany();
      if (!scheduledJobs) throw new Error('Unable to find scheduled messages');
      return scheduledJobs;
    } catch (error) {
      throw new Error(error);
    }
  }

  @Mutation(() => String)
  async deleteJob(@Args('id') id: string) {
    try {
      const deleted = await this.prisma.cron.delete({
        where: {
          id,
        },
      });

      if (!deleted) throw new Error('Failed to delete');

      return 'Success';
    } catch (error) {
      throw new Error(error);
    }
  }

  @Mutation(() => String)
  async addNewField(
    @Args('cronJobNewFieldInput') cronJobNewFieldInput: CronJobNewFieldInput,
  ) {
    try {
      const addedField = await this.prisma.cron.create({
        data: {
          message: cronJobNewFieldInput.message,
          to: cronJobNewFieldInput.number,
        },
      });

      if (!addedField) throw new Error('Unable to create a record');

      return 'Success';
    } catch (error) {
      throw new Error(error);
    }
  }
}
