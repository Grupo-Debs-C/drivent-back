import {  PrismaClient } from "@prisma/client";
import dayjs from "dayjs";
const prisma = new PrismaClient();

async function main() {
  let event = await prisma.event.findFirst();

  if (!event) {
    event = await prisma.event.create({
      data: {
        title: "Driven.t",
        logoImageUrl: "https://files.driveneducation.com.br/images/logo-rounded.png",
        backgroundImageUrl: "linear-gradient(to right, #FA4098, #FFD77F)",
        startsAt: dayjs().add(1, "days").hour(6).minute(0).second(0).millisecond(0).toDate(),
        endsAt: dayjs().add(3, "days").hour(20).minute(59).second(59).millisecond(599).toDate(),
      },
    });
  }

  console.log({ event });

  await prisma.ticketType.createMany({
    data: [
      {
        name: 'basic',
        price: 200,
        isRemote: true,
        includesHotel: false,
        updatedAt: dayjs().toDate()
      },
      {
        name: 'intermediate',
        price: 230,
        isRemote: false,
        includesHotel: false,
        updatedAt: dayjs().toDate()
      },
      {
        name: 'advanced',
        price: 300,
        isRemote: false,
        includesHotel: true,
        updatedAt: dayjs().toDate()
      }
    ]
  })

  await prisma.locality.createMany({
      data: [
          { name: "Auditório Principal" },
          { name: "Auditório Lateral" },
          { name: "Sala de Workshop" }
        ]
    })

  const loc1 = await prisma.locality.findFirst({
    where: {
      name: "Auditório Principal"
    }
  })

  const loc2 = await prisma.locality.findFirst({
    where: {
      name: "Auditório Lateral"
    }
  })

  const loc3 = await prisma.locality.findFirst({
    where: {
      name: "Sala de Workshop"
    }
  })

  await prisma.activities.createMany({
    data:[
        {
          eventId: event.id,
          localityId: loc1?.id || 0,
          Name: "Passeio",
          startAt: dayjs().add(1, "days").hour(6).minute(0).second(0).millisecond(0).toDate(),
          endsAt: dayjs().hour(6).minute(0).second(0).millisecond(0).add(1, "days").add(2, "hours").toDate(),
          vacancyLimit: 30
        },
        {
          eventId: event.id,
          localityId: loc2?.id || 0,
          Name: "Dinâmica",
          startAt: dayjs().add(1, "days").hour(6).minute(0).second(0).millisecond(0).toDate(),
          endsAt: dayjs().hour(6).minute(0).second(0).millisecond(0).add(1, "days").add(2, "hours").toDate(),
          vacancyLimit: 20
        },
        {
          eventId: event.id,
          localityId: loc3?.id || 0,
          Name: "Palestra",
          startAt: dayjs().add(1, "days").hour(6).minute(0).second(0).millisecond(0).toDate(),
          endsAt: dayjs().hour(6).minute(0).second(0).millisecond(0).add(1, "days").add(2, "hours").toDate(),
          vacancyLimit: 60
        }
    ]
  })
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
