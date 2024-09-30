import { makeNotification } from "@test/factories/make-notification"
import { InMemoryNotificationsRepository } from "@test/repositories/in-memory-notifications-repository"
import { UnreadNotificationUseCase } from "./unread-notification"
import { NotificationNotFoundError } from "./errors/notification-not-found-error"

describe('Unread notification - Use Case', () => {
  it('should be able to unread a notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository()
    const unreadNotification = new UnreadNotificationUseCase(notificationsRepository)

    const notification = makeNotification({
      readAt: new Date()
    })

    await notificationsRepository.create(notification)

    await unreadNotification.execute({
      notificationId: notification.id,
    })

    expect(notificationsRepository.items[0].readAt).toBeNull()
  })

  it('should not be able to unread a non existing notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository()
    const unreadNotification = new UnreadNotificationUseCase(notificationsRepository)

    expect(() =>
      unreadNotification.execute({
        notificationId: 'non-existing-id',
      })
    ).rejects.toThrow(NotificationNotFoundError)
  })
})