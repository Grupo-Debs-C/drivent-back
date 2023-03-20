import { prisma } from "@/config";
import { Activities,Locality } from "@prisma/client";

async function findAllActivities() {
  return prisma.Activities.findMany({
    include: {
      Vacancy: true
    }
  });
}

async function findActivityById(activityId: number) {
  return prisma.Activities.findFirst({
    where: { id: activityId }
  });
}

async function findLocalities() {
  return prisma.Locality.findMany({});
}

async function findActivitiesByLocalityAndDay(startDay: string, endDay: string, localityId: number) {
  return prisma.Activities.findMany({
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
