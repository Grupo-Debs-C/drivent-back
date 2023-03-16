import { prisma } from "@/config";

async function findVacancyByActivityId(activityId: number) {
  return prisma.vacancy.findMany({
    where: {
      activitiesId: activityId,
    }
  });
}

const vacancyRepository = {
    findVacancyByActivityId
  };
  
  export default vacancyRepository;