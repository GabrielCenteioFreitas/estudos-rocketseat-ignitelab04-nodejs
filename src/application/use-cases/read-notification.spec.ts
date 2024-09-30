import { makeNotification } from "@test/factories/make-notification"
import { InMemoryNotificationsRepository } from "@test/repositories/in-memory-notifications-repository"
import { ReadNotificationUseCase } from "./read-notification"
import { NotificationNotFoundError } from "./errors/notification-not-found-error"

describe('Read notification - Use Case', () => {
  it('should be able to read a notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository()
    const readNotification = new ReadNotificationUseCase(notificationsRepository)

    const notification = makeNotification()

    await notificationsRepository.create(notification)

    await readNotification.execute({
      notificationId: notification.id,
    })

    expect(notificationsRepository.items[0].readAt).toEqual(expect.any(Date))
  })

  it('should not be able to read a non existing notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository()
    const readNotification = new ReadNotificationUseCase(notificationsRepository)

    expect(() =>
      readNotification.execute({
        notificationId: 'non-existing-id',
      })
    ).rejects.toThrow(NotificationNotFoundError)
  })
})