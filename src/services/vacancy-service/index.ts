import { notFoundError } from "@/errors";
import vacancyRepository from "@/repositories/vacancy-repository";

async function findVacancyByActivityId(activityId: number) {
  const vacancy = await vacancyRepository.findVacancyByActivityId(activityId);

  if (!vacancy) {
    throw notFoundError();
  }
  return {booked: vacancy.length};
}

const vacancyService = {
    findVacancyByActivityId
  };
  
export default vacancyService;