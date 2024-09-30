import { SendNotificationUseCase } from "@application/use-cases/send-notification";
import { Controller } from "@nestjs/common";
import { EventPattern, Payload } from "@nestjs/microservices";

interface SendNotificationpayload {
  content: string;
  category: string;
  recipientId: string;
}

@Controller()
export class NotificationsController {
  constructor(
    private sendNotification: SendNotificationUseCase
  ) {}

  @EventPattern('notifications.send_notification')
  async handleSendNotification(
    @Payload() payload: SendNotificationpayload
  ) {
    const { category, content, recipientId } = payload

    await this.sendNotification.execute({
      category,
      content,
      recipientId,
    })
  }
}