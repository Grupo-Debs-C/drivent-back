import { prisma, redis } from "@/config";
import { Event } from "@prisma/client";

async function findFirst() {
  let eventCache = JSON.parse(await redis.get("event"));
  if (!eventCache) {
    let event = await prisma.event.findFirst();
    await redis.set('event', JSON.stringify(event))
    return event
  }

  return eventCache as Event;
}

const eventRepository = {
  findFirst,
};

export default eventRepository;
