import { Notification } from "@application/entities/notification";
import { NotificationsRepository } from "@application/repositories/notifications-repository";

export class InMemoryNotificationsRepository implements NotificationsRepository {
  public items: Notification[] = []

  async create(notification: Notification): Promise<void> {
    this.items.push(notification)
  }

  async save(notification: Notification): Promise<void> {
    const notificationIndex = this.items.findIndex(item => item.id === notification.id)

    this.items[notificationIndex] = notification
  }

  async findById(notificationId: string): Promise<Notification | null> {
    const notification = this.items.find(item => item.id === notificationId)

    return notification ?? null
  }

  async countManyByRecipientId(recipientId: string): Promise<number> {
    return this.items.filter(item => item.recipientId === recipientId).length
  }

  async findManyByRecipientId(recipientId: string): Promise<Notification[]> {
    return this.items.filter(item => item.recipientId === recipientId)
  }
}