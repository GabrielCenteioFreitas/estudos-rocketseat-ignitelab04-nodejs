import { makeNotification } from "@test/factories/make-notification"
import { InMemoryNotificationsRepository } from "@test/repositories/in-memory-notifications-repository"
import { GetRecipientNotificationsUseCase } from "./get-recipient-notifications"

describe('Count recipient notifications - Use Case', () => {
  it('should be able to count recipient notifications', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository()
    const cancelNotification = new GetRecipientNotificationsUseCase(notificationsRepository)

    await notificationsRepository.create(
      makeNotification({ recipientId: 'recipient-01' })
    )
    await notificationsRepository.create(
      makeNotification({ recipientId: 'recipient-01' })
    )
    await notificationsRepository.create(
      makeNotification({ recipientId: 'recipient-02' })
    )

    const { notifications } = await cancelNotification.execute({
      recipientId: 'recipient-01'
    })

    expect(notifications).toHaveLength(2)
    expect(notifications).toEqual(expect.arrayContaining([
      expect.objectContaining({
        recipientId: 'recipient-01',
      }),
      expect.objectContaining({
        recipientId: 'recipient-01',
      }),
    ]))
  })
})