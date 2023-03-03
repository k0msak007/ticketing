import { Publisher, Subjects, TicketCreatedEvent } from "@sgtickets007/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
    subject: Subjects.TicketCreated = Subjects.TicketCreated;
}