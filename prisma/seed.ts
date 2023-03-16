import { prisma, redis } from "../src/config";
import dayjs from "dayjs";

async function main() {
  let event: (string | null) = await redis.get("event");

  //event = JSON.parse(event || '')

  if (!event) {
    await redis.set("event", JSON.stringify({
      data: {
        title: "Driven.t",
        logoImageUrl: "https://files.driveneducation.com.br/images/logo-rounded.png",
        backgroundImageUrl: "linear-gradient(to right, #FA4098, #FFD77F)",
        startsAt: dayjs().toDate(),
        endsAt: dayjs().add(3, "days").toDate(),
      }, 
    }));

    await prisma.event.create({
      data: {
        title: "Driven.t",
        logoImageUrl: "https://files.driveneducation.com.br/images/logo-rounded.png",
        backgroundImageUrl: "linear-gradient(to right, #FA4098, #FFD77F)",
        startsAt: dayjs().toDate(),
        endsAt: dayjs().add(3, "days").toDate(),
      }})
    
  }

  console.log({ event });

  await prisma.locality.createMany({
      data: [
          { id:1, name: "Auditório Principal" },
          { id:2, name: "Auditório Lateral" },
          { id:3, name: "Sala de Workshop" }
        ]
    })
  
  const eventInformation = await prisma.event.findFirst({
    where:{
      title: "Driven.t"
    }
  });


  await prisma.activities.createMany({
    data: [
      {
        Name: "Minecraft: montando o PC ideal", 
        eventId: Number(eventInformation?.id), 
        localityId: 1, 
        startAt: dayjs().add(1, "days").hour(9).minute(0).second(0).format(), 
        endsAt: dayjs().add(1, "days").hour(10).minute(0).second(0).format(), 
        vacancyLimit: 30},
      {
        Name: "LoL: montando o PC ideal", 
        eventId: Number(eventInformation?.id), 
        localityId: 1, 
        startAt: dayjs().add(1, "days").hour(10).minute(0).second(0).format(), 
        endsAt: dayjs().add(1, "days").hour(11).minute(0).second(0).format(), 
        vacancyLimit: 30},
      {
        Name: "Palestra X", 
        eventId: Number(eventInformation?.id), 
        localityId: 1, 
        startAt: dayjs().add(2, "days").hour(9).minute(0).second(0).format(), 
        endsAt: dayjs().add(2, "days").hour(11).minute(0).second(0).format(), 
        vacancyLimit: 30},
      {
        Name: "Palestra y", 
        eventId: Number(eventInformation?.id), 
        localityId: 1, 
        startAt: dayjs().add(3, "days").hour(9).minute(0).second(0).format(), 
        endsAt: dayjs().add(3, "days").hour(10).minute(0).second(0).format(), 
        vacancyLimit: 30},
      {
        Name: "Palestra z", 
        eventId: Number(eventInformation?.id), 
        localityId: 1, 
        startAt: dayjs().add(3, "days").hour(10).minute(0).second(0).format(), 
        endsAt: dayjs().add(3, "days").hour(11).minute(0).second(0).format(), 
        vacancyLimit: 3},   
    ]
  })
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
