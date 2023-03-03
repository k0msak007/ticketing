import { OrderCancelledEvent, Publisher, Subjects } from "@sgtickets007/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
    subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
    
}
