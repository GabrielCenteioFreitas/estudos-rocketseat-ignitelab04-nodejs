import { CancelNotificationUseCase } from '@application/use-cases/cancel-notification';
import { CountRecipientNotificationsUseCase } from '@application/use-cases/count-recipient-notifications';
import { GetRecipientNotificationsUseCase } from '@application/use-cases/get-recipient-notifications';
import { ReadNotificationUseCase } from '@application/use-cases/read-notification';
import { UnreadNotificationUseCase } from '@application/use-cases/unread-notification';
import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { SendNotificationUseCase } from 'src/application/use-cases/send-notification';
import { CreateNotificationBody } from '../dtos/create-notification-body';
import { NotificationViewModel } from '../view-models/notification-view-model';

@Controller('notifications')
export class NotificationsController {
  constructor(
    private sendNotification: SendNotificationUseCase,
    private cancelNotification: CancelNotificationUseCase,
    private readNotification: ReadNotificationUseCase,
    private unreadNotification: UnreadNotificationUseCase,
    private getRecipientNotifications: GetRecipientNotificationsUseCase,
    private countRecipientNotifications: CountRecipientNotificationsUseCase,
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
      notification: NotificationViewModel.toHTTP(notification),
    }
  }

  @Patch(':notificationId/cancel')
  async cancel(
    @Param('notificationId') notificationId: string
  ) {
    await this.cancelNotification.execute({
      notificationId,
    })
  }

  @Patch(':notificationId/read')
  async read(
    @Param('notificationId') notificationId: string
  ) {
    await this.readNotification.execute({
      notificationId,
    })
  }

  @Patch(':notificationId/unread')
  async unread(
    @Param('notificationId') notificationId: string
  ) {
    await this.unreadNotification.execute({
      notificationId,
    })
  }

  @Get('count/from/:recipientId')
  async countFromRecipient(
    @Param('recipientId') recipientId: string
  ) {
    const { count } = await this.countRecipientNotifications.execute({
      recipientId,
    })

    return {
      count,
    }
  }

  @Get('from/:recipientId')
  async getFromRecipient(
    @Param('recipientId') recipientId: string
  ) {
    const { notifications } = await this.getRecipientNotifications.execute({
      recipientId,
    })

    return {
      notifications: notifications.map(NotificationViewModel.toHTTP),
    }
  }
}
