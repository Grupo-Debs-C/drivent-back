import { prisma, redis } from "@/config";
import { Event } from "@prisma/client";

async function findFirst() {
  let eventCache: Event = JSON.parse((await redis.get("event"))).data;

  if (!eventCache) {
    let event = await prisma.event.findFirst();
    await redis.set('event', JSON.stringify(event))
    return event
  }

  return eventCache
}

const eventRepository = {
  findFirst,
};

export default eventRepository;
