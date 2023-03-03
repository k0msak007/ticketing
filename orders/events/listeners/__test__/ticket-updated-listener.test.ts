import mongoose from "mongoose";
import { TicketUpdatedListener } from "../ticket-updated-listener";
import { natsWrapper } from "../../../src/nats-wrapper";
import { Ticket } from "../../../src/models/ticket";
import { TicketUpdatedEvent } from "@sgtickets007/common";
import { Message } from "node-nats-streaming";

const setup = async () => {
  // Create a listener
  const listener = new TicketUpdatedListener(natsWrapper.client);
  // Create and save a ticket
  const ticket = Ticket.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    title: "Concer",
    price: 20,
  });
  await ticket.save();
  // Create a fake data object
  const data: TicketUpdatedEvent["data"] = {
    id: ticket.id,
    version: ticket.version + 1,
    title: "new Concert",
    price: 999,
    userId: "abcdefg",
  };

  // Create a fake msg object
  // @ts-ignore
  const msg: Message = {
    ack: jest.fn()
  }

  // return all of this stuff
  return {msg, data, listener, ticket}
};

it("finds, updates, and saves tickets", async () => {
    const {msg, data, listener, ticket} = await setup()

    await listener.onMessage(data, msg)

    const updatedTicket = await Ticket.findById(ticket.id)

    expect(updatedTicket?.title).toEqual(data.title)
    expect(updatedTicket?.price).toEqual(data.price)
    expect(updatedTicket?.version).toEqual(data.version)
});

it("acks the message", async () => {
    const {msg, data, listener} = await setup()

    await listener.onMessage(data, msg)

    expect(msg.ack).toHaveBeenCalled()
});

it('does not call ack if the event has a skipped version number', async () => {
    const {msg, data, listener, ticket} = await setup()

    data.version = 10
    try {
        await listener.onMessage(data, msg)
    } catch (error) {
        
    }

    expect(msg.ack).not.toHaveBeenCalled()
})
