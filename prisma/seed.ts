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
  }

  console.log({ event });

  await prisma.locality.createMany({
      data: [
          { id:1, name: "Auditório Principal" },
          { id:2, name: "Auditório Lateral" },
          { id: 3, name: "Sala de Workshop" }
        ]
    })
  
  await prisma.activities.createMany({
    data:[

    ]
  })
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
