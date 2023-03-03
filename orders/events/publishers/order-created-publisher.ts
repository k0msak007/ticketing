import { OrderCreatedEvent, Publisher, Subjects } from "@sgtickets007/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
    subject: Subjects.OrderCreated = Subjects.OrderCreated;
}