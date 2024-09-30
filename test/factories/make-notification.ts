import { Content } from "@application/entities/content";
import { Notification, NotificationProps } from "@application/entities/notification";

export function makeNotification(
  override: Partial<NotificationProps> = {}
) {
  return new Notification({
    category: 'Category',
    content: new Content('Content'),
    recipientId: 'recipient-id',
    ...override,
  })
}