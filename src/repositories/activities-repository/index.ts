import { prisma } from "@/config";

async function findAllActivities() {
  return prisma.activities.findMany({
    include: {
      Vacancy: true
    }
  });
}

async function findActivityById(activityId: number) {
  return prisma.activities.findFirst({
    where: { id: activityId }
  });
}

async function findLocalities() {
  return prisma.locality.findMany({});
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
    }, include: {
      Vacancy: true
    }
  });
}

const activityRepository = {
  findAllActivities,
  findLocalities,
  findActivitiesByLocalityAndDay,
  findActivityById
};

export default activityRepository;
