import { prisma } from "@/config";

async function findAllActivities() {
  return prisma.activities.findMany();
}

async function findActivitiesByLocality(startDay: string, endDay: string, localityId: number) {
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
  findActivitiesByLocality
};

export default activityRepository;
