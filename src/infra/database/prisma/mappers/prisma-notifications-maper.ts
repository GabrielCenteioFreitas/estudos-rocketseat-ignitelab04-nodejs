import { Content } from "@application/entities/content";
import { Notification } from "@application/entities/notification";
import { Prisma, Notification as PrismaNotification } from "@prisma/client";

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

  static toDomain(raw: PrismaNotification): Notification {
    return new Notification(
      {
        content: new Content(raw.content),
        category: raw.category,
        recipientId: raw.recipientId,
        readAt: raw.readAt,
        createdAt: raw.createdAt,
      },
      raw.id
    )
  }
}