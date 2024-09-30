import { Injectable } from "@nestjs/common";
import { Notification } from "@application/entities/notification";
import { NotificationsRepository } from "@application/repositories/notifications-repository";
import { PrismaService } from "../prisma.service";
import { PrismaNotificationsMapper } from "../mappers/prisma-notifications-maper";

@Injectable()
export class PrismaNotificationsRepository implements NotificationsRepository {
  constructor(
    private prisma: PrismaService,
  ) {}

  async create(notification: Notification): Promise<void> {
    const data = PrismaNotificationsMapper.toPrisma(notification)

    await this.prisma.notification.create({
      data,
    })
  }

  async save(notification: Notification): Promise<void> {
    const data = PrismaNotificationsMapper.toPrisma(notification)

    await this.prisma.notification.update({
      where: {
        id: data.id,
      },
      data,
    })
  }

  async findById(notificationId: string): Promise<Notification | null> {
    const notification = await this.prisma.notification.findUnique({
      where: {
        id: notificationId,
      }
    })

    if (!notification) {
      return null
    }

    return PrismaNotificationsMapper.toDomain(notification)
  }
  
  async findManyByRecipientId(recipientId: string): Promise<Notification[]> {
    const notifications = await this.prisma.notification.findMany({
      where: {
        recipientId,
      }
    })

    return notifications.map(PrismaNotificationsMapper.toDomain)
  }

  async countManyByRecipientId(recipientId: string): Promise<number> {
    const count = await this.prisma.notification.count({
      where: {
        recipientId,
      }
    })

    return count
  }
}