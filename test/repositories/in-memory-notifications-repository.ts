import { Notification } from "../../src/application/entities/notification";
import { NotificationsRepository } from "../../src/application/repositories/notifications-repository";

export class InMemoryNotificationsRepository implements NotificationsRepository {
  public items: Notification[] = []

  async create(notification: Notification): Promise<void> {
    this.items.push(notification)
  }
}