import { InMemoryNotificationsRepository } from "../../../test/repositories/in-memory-notifications-repository"
import { SendNotificationUseCase } from "./send-notification"

describe('Send notification - Use Case', () => {
  it('should be able to send a notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository()
    const sendNotification = new SendNotificationUseCase(notificationsRepository)

    const { notification } = await sendNotification.execute({
      content: 'Content',
      category: 'Category',
      recipientId: 'recipient-id'
    })

    expect(notificationsRepository.items).toHaveLength(1)
    expect(notificationsRepository.items[0]).toEqual(notification)
  })
})