function formatDateEvent(date: string){
    //date -> formato 26/02 (como é passado no front)
    const day = date.slice(0, 2);
    const month = date.slice(-2);

    const startDay = `$2023-${month}-${day} 09:00:00.00`
    const endDay = `$2023-${month}-${day} 23:59:59.59`

    return {startDay, endDay}
}

const activitiesServiceHelpers = {
    formatDateEvent
  };
  
  export default activitiesServiceHelpers;