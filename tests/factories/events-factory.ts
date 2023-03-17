import dayjs from "dayjs";
import faker from "@faker-js/faker";
import { Event } from "@prisma/client";
import { prisma } from "@/config";

export function createEvent(params: Partial<Event> = {}): Promise<Event> {
  return prisma.event.create({
    data: {
      title: params.title || faker.lorem.sentence(),
      backgroundImageUrl: params.backgroundImageUrl || faker.image.imageUrl(),
      logoImageUrl: params.logoImageUrl || faker.image.imageUrl(),
      startsAt: params.startsAt || dayjs().subtract(1, "day").toDate(),
      endsAt: params.endsAt || dayjs().add(5, "days").toDate(),
    },
  });
}

export function createEvent2() {
  return prisma.event.create({
    data: {
      title: faker.name.findName(),
      logoImageUrl: faker.internet.avatar(),
      backgroundImageUrl: "linear-gradient(to right, #FA4098, #FFD77F)",
      startsAt: dayjs().toDate(),
      endsAt: dayjs().add(21, "days").toDate(),
    }})
}
