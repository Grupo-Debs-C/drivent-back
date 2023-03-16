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
        startsAt: "2023-10-22 00:00:00.01",
        endsAt: "2023-10-24 23:59:00.00",
      },
    }));
  }

  console.log({ event });

  await prisma.locality.createMany({
        data: [
            { name: "Auditório Principal" },
            { name: "Auditório Lateral" },
            { name: "Sala de Workshop" }
          ]
    })

}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
