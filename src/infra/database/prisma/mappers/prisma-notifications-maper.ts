import { Notification } from "@application/entities/notification";
import { Prisma } from "@prisma/client";

export class PrismaNotificationsMapper {
  static toPrisma(notification: Notification): Prisma.NotificationCreateInput {
    return {
      id: notification.id,
      content: notification.content,
      category: notification.category,
      recipientId: notification.recipientId,
      readAt: notification.readAt,
      createdAt: notification.createdAt,
    }
  }
}