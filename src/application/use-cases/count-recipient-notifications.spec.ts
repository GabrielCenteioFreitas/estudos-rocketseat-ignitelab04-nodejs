import { makeNotification } from "@test/factories/make-notification"
import { InMemoryNotificationsRepository } from "@test/repositories/in-memory-notifications-repository"
import { CountRecipientNotificationsUseCase } from "./count-recipient-notifications"

describe('Count recipient notifications - Use Case', () => {
  it('should be able to count recipient notifications', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository()
    const cancelNotification = new CountRecipientNotificationsUseCase(notificationsRepository)

    await notificationsRepository.create(
      makeNotification({ recipientId: 'recipient-01' })
    )
    await notificationsRepository.create(
      makeNotification({ recipientId: 'recipient-01' })
    )
    await notificationsRepository.create(
      makeNotification({ recipientId: 'recipient-02' })
    )

    const { count } = await cancelNotification.execute({
      recipientId: 'recipient-01'
    })

    expect(count).toEqual(2)
  })
})