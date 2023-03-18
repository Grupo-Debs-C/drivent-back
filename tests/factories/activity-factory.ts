import faker from "@faker-js/faker";
import { prisma } from "@/config";
import dayjs from "dayjs";

export function createActivity(eventId: number, localityId: number) {
  return prisma.activities.create({
    data: {
        Name: faker.name.findName(), 
        eventId, 
        localityId, 
        startAt: dayjs().toDate(), 
        endsAt: dayjs().add(1, "hours").toDate(), 
        vacancyLimit: faker.datatype.number()
    }
  });
}

