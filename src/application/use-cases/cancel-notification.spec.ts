import { InMemoryNotificationsRepository } from "@test/repositories/in-memory-notifications-repository"
import { CancelNotificationUseCase } from "./cancel-notification"
import { Content } from "@application/entities/content"
import { Notification } from "@application/entities/notification"
import { NotificationNotFoundError } from "./errors/notification-not-found-error"

describe('Cancel notification - Use Case', () => {
  it('should be able to cancel a notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository()
    const cancelNotification = new CancelNotificationUseCase(notificationsRepository)

    const notification = new Notification({
      category: 'Category',
      content: new Content('Content'),
      recipientId: 'recipient-id',
    })

    await notificationsRepository.create(notification)

    await cancelNotification.execute({
      notificationId: notification.id,
    })

    expect(notificationsRepository.items[0].canceledAt).toEqual(expect.any(Date))
  })
  it('should not be able to cancel a non existing notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository()
    const cancelNotification = new CancelNotificationUseCase(notificationsRepository)

    expect(() =>
      cancelNotification.execute({
        notificationId: 'non-existing-id',
      })
    ).rejects.toThrow(NotificationNotFoundError)
  })
})