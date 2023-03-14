import { redis } from "../src/config";
import dayjs from "dayjs";

async function main() {
  let event: (string | null) = await redis.get("event");



  if (!event) {
    await redis.set("event", JSON.stringify({
      data: {
        title: "Driven.t",
        logoImageUrl: "https://files.driveneducation.com.br/images/logo-rounded.png",
        backgroundImageUrl: "linear-gradient(to right, #FA4098, #FFD77F)",
        startsAt: dayjs().toDate(),
        endsAt: dayjs().add(21, "days").toDate(),
      },
    }));
  }

  console.log({ event });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
