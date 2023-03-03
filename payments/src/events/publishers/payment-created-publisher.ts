import { PaymentCreatedEvent, Publisher, Subjects } from "@sgtickets007/common";

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
    subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
    
}