import { Body, Controller, Post } from '@nestjs/common'
import { CreateNotificationBody } from '../dtos/create-notification-body';
import { SendNotificationUseCase } from 'src/application/use-cases/send-notification';

@Controller('notifications')
export class NotificationsController {
  constructor(
    private sendNotification: SendNotificationUseCase,
  ) {}

  @Post()
  async create(
    @Body() body: CreateNotificationBody
  ) {
    const { content, category, recipientId } = body

    const { notification } = await this.sendNotification.execute({
      recipientId,
      category,
      content,
    })

    return {
      notification,
    }
  }
}
