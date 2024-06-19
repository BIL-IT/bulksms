import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { MessagesService } from './messages.service';
import { MessageInput } from './input/message.input';
import { SuccessMessageInput } from './output/success-message.model';
import { AllMessages } from './output/all-messages.model';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { CurrentUserDetail } from 'src/auth/output/current-user.model';
import { CurrentUser } from 'src/auth/curret-user.decorator';

@UseGuards(AuthGuard)
@Resolver()
export class MessagesResolver {
  constructor(private messagesService: MessagesService) {}

  @Query(() => [AllMessages])
  async GetAllSMS(): Promise<AllMessages[]> {
    const messages = await this.messagesService.GetAllSMS();

    return messages;
  }

  @Query(() => [AllMessages])
  async GetAllDemoSMS(): Promise<AllMessages[]> {
    const messages = await this.messagesService.GetAllDemoSMS();

    return messages;
  }

  @UseGuards(AuthGuard)
  @Mutation(() => SuccessMessageInput)
  async SendSMS(
    @Args('messageInput') messageInput: MessageInput,
    @CurrentUser() { user }: { user: CurrentUserDetail },
  ): Promise<SuccessMessageInput> {
    const message = await this.messagesService.SendSMS(
      messageInput.phone,
      messageInput.content,
      user.username,
    );

    return {
      message,
    };
  }
}
