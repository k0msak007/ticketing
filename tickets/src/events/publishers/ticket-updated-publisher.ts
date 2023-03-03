import { Publisher, Subjects, TicketUpdatedEvent } from "@sgtickets007/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
    subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}