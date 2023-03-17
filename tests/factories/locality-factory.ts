import faker from "@faker-js/faker";
import { prisma } from "@/config";

export function createLocality() {
  return prisma.locality.create({
    data: {
        name: faker.name.findName(), 
    }
  });
}

