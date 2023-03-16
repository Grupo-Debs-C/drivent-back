import { prisma } from "@/config";

async function findAllActivities() {
  return prisma.activities.findMany();
}

async function findActivitiesByLocalityAndDay(startDay: string, endDay: string, localityId: number) {
  return prisma.activities.findMany({
    where: {
      localityId,
      startAt: {
        lte: startDay,
        gte: endDay
      }
    }
  });
}
 
const activityRepository = {
  findAllActivities,
  findActivitiesByLocalityAndDay
};

export default activityRepository;
