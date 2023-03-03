import { ExpirationCompleteEvent, Publisher, Subjects } from "@sgtickets007/common";

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
    subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;

}