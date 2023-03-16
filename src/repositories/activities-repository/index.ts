import { prisma } from "@/config";

async function findAllActivities() {
  return prisma.activities.findMany();
}

async function findActivitiesByLocalityAndDay(startDay: string, endDay: string, localityId: number) {
  return prisma.activities.findMany({
    where: {
      localityId,
      startAt: {
        gte: new Date(startDay).toISOString(),
      },
      endsAt: {
        lte: new Date(endDay).toISOString(),
      } 
    }
  });
}
 
const activityRepository = {
  findAllActivities,
  findActivitiesByLocalityAndDay
};

export default activityRepository;
