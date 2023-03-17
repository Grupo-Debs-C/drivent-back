import { prisma } from "@/config";

async function findAllActivities() {
  return prisma.activities.findMany();
}

async function findLocalitiesByDay(date: string) {
  return prisma.activities.findMany({
    where: {
      startAt: {
        gte: new Date(date).toISOString(),
      }
    },
    select: {
      Locality: true,
    }
  });
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
  findLocalitiesByDay,
  findActivitiesByLocalityAndDay
};

export default activityRepository;
