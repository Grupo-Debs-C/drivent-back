import { prisma } from "@/config";

export function createVacancy(ticketId: number, activityId: number) {
  return prisma.vacancy.create({
    data: {
      ticketId,
      activitiesId: activityId
    }
  });
}