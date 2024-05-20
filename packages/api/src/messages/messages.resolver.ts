import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { MessagesService } from './messages.service';
import { MessageInput } from './input/message.input';
import { SuccessMessageInput } from './output/success-message.model';
import { AllMessages } from './output/all-messages.model';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';

@UseGuards(AuthGuard)
@Resolver()
export class MessagesResolver {
  constructor(private messagesService: MessagesService) {}

  @Query(() => [AllMessages])
  async GetAllSMS(): Promise<AllMessages[]> {
    const messages = await this.messagesService.GetAllSMS();

    return messages;
  }

  @Mutation(() => SuccessMessageInput)
  async SendSMS(
    @Args('messageInput') messageInput: MessageInput,
  ): Promise<SuccessMessageInput> {
    const message = await this.messagesService.SendSMS(
      messageInput.phone,
      messageInput.content,
    );

    return {
      message,
    };
  }
}
