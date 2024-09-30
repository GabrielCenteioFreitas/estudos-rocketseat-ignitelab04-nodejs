import { CancelNotificationUseCase } from '@application/use-cases/cancel-notification';
import { CountRecipientNotificationsUseCase } from '@application/use-cases/count-recipient-notifications';
import { GetRecipientNotificationsUseCase } from '@application/use-cases/get-recipient-notifications';
import { ReadNotificationUseCase } from '@application/use-cases/read-notification';
import { UnreadNotificationUseCase } from '@application/use-cases/unread-notification';
import { Module } from "@nestjs/common";
import { SendNotificationUseCase } from "src/application/use-cases/send-notification";
import { DatabaseModule } from "../database/database.module";
import { NotificationsController } from "./controllers/notifications.controller";

@Module({
  imports: [
    DatabaseModule,
  ],
  controllers: [
    NotificationsController,
  ],
  providers: [
    SendNotificationUseCase,
    CancelNotificationUseCase,
    ReadNotificationUseCase,
    UnreadNotificationUseCase,
    GetRecipientNotificationsUseCase,
    CountRecipientNotificationsUseCase,
  ],
})
export class HttpModule {}