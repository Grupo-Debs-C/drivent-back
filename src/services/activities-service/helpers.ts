import { Activities } from "@prisma/client";

function formatDateEvent(date: string){
    //date -> formato 26/02 (como é passado no front)
    const day = date.slice(0, 2);
    const month = date.slice(-2);

    const startDay = `$2023-${month}-${day} 09:00:00.00`; //para começar sempre 9 da manhã
    const endDay = `$2023-${month}-${day} 23:59:59.59`;

    return {startDay, endDay}
}

function checkDuration(startAt: string, endAt: string){
    //date -> formato "YYYY-MM-DD hh:mm:ss"
    const startHour = Number(startAt.slice(11, 13));
    const endHour = Number(endAt.slice(11, 13));

    if(endHour-startHour >= 1){
        return true;
    }
    return false;
}

function approvedActivities(activities: Activities[]){
    return activities.filter((activity)=> checkDuration(activity.startAt.toISOString(), activity.endsAt.toISOString()));
}

const activitiesServiceHelpers = {
    formatDateEvent,
    approvedActivities
  };
  
  export default activitiesServiceHelpers;