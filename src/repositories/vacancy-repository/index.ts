import { prisma } from "@/config";

async function findVacancyByActivityId(activityId: number) {
  return prisma.vacancy.findMany({
    where: {
      activitiesId: activityId,
    }
  });
}

async function postVacancy(activityId: number, ticketId: number) {
  return prisma.vacancy.create({
    data: {
      ticketId: ticketId,
      activitiesId: activityId
    }
  });
};

const vacancyRepository = {
    findVacancyByActivityId,
    postVacancy
  };
  
  export default vacancyRepository;