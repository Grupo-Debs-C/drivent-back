import { notFoundError } from "@/errors";
import activityRepository from "@/repositories/activities-repository";
import activitiesServiceHelpers from "./helpers";

async function getAllActivities() {
  const activities = await activityRepository.findAllActivities();

  if (!activities) {
    throw notFoundError();
  }
  return activities;
}

async function findActivitiesByLocalityAndDay(date: string, localityId: number) {
  const {startDay, endDay} = activitiesServiceHelpers.formatDateEvent(date);
  const activities = await activityRepository.findActivitiesByLocalityAndDay(startDay, endDay, localityId);
  if (!activities) {
    throw notFoundError();
  }

  const approvedActivities = activitiesServiceHelpers.approvedActivities(activities);

  if (!approvedActivities) {
    throw notFoundError();
  }

  return approvedActivities;
}

const activitiesService = {
  getAllActivities,
  findActivitiesByLocalityAndDay
};

export default activitiesService;