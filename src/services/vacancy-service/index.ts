import { notFoundError } from "@/errors";
import vacancyRepository from "@/repositories/vacancy-repository";
import activityRepository from '@/repositories/activities-repository';
import ticketRepository from '@/repositories/ticket-repository';

async function findVacancyByActivityId(activityId: number) {
  const vacancy = await vacancyRepository.findVacancyByActivityId(activityId);

  if (!vacancy) {
    console.log("nao tem vaga kaka");
    throw notFoundError();
  }
  return { booked: vacancy.length };
}

async function postVacancy(activityId: number, ticketId: number) {
  const ticket = await ticketRepository.findTickeyById(ticketId);
  if (!ticket) {
    throw notFoundError();
  }

  const activity = await activityRepository.findActivityById(activityId);
  if (!activity){
    throw notFoundError();
  }
    
  const vacancy = await vacancyRepository.postVacancy(activityId, ticketId);
  return vacancy.id;
};

const vacancyService = {
  findVacancyByActivityId,
  postVacancy
};

export default vacancyService;