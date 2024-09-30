import { Content } from "./content"
import { Notification } from "./notification"

describe('Notification content', () => {
  it('should be able to create a notification', () => {
    const notification = new Notification({
      content: new Content('Conteúdo'),
      category: 'Categoria',
      recipientId: 'recipient-id',
    })
  
    expect(notification).toBeTruthy()
  })
})