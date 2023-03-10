import { redis } from "@/config";
import { Event } from "@prisma/client";

async function findFirst() {
  let event: Event = JSON.parse((await redis.get("event"))).data;
  return event
}

const eventRepository = {
  findFirst,
};

export default eventRepository;
