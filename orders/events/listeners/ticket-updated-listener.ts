import { Listener, Subjects, TicketUpdatedEvent } from "@sgtickets007/common";
import { Message } from "node-nats-streaming";
import { queueGroupName } from "./queue-group-name";
import { Ticket } from "../../src/models/ticket";

export class TicketUpdatedListener extends Listener<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
  queueGroupName = queueGroupName;
  async onMessage(data: TicketUpdatedEvent["data"], msg: Message) {
    const ticket = await Ticket.findByEvent(data)

    if (!ticket) {
      throw new Error("Ticket Not Found");
    }

    const { title, price } = data;
    ticket.set({ title, price });

    await ticket.save()

    msg.ack()
  }
}
