import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { SendOtpService } from './send-otp.service';

@Resolver()
export class SendOtpResolver {
  constructor(private sendOtpService: SendOtpService) {}

  @Mutation(() => String)
  async sendOTP(@Args('phoneNumber') phoneNumber: string): Promise<string> {
    const code = await this.sendOtpService.sendOTP(phoneNumber);
    return code;
  }
}
