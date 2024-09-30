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
}