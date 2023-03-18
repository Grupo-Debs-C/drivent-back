import activitiesServiceHelpers from "@/utils/helpers";

describe("formatDateEvent functionality", () => {
    it("should respond with object with both dates", async () => {
      const response = activitiesServiceHelpers.formatDateEvent('25/07')
      expect(response).toStrictEqual({startDay: '2023-07-25 06:00:00.000', endDay: '2023-07-25 20:59:59.599'});
    });
  });
  
describe("checkDuration functionality", () => {
    it("should respond with true if the event lasts more than 1 hour", async () => {
      const response = activitiesServiceHelpers.checkDuration('2023-03-17 09:00:00.00', '2023-03-17 11:00:00.00');
      expect(response).toStrictEqual(true);
    });
    it("should respond with true if the event lasts 1 hour", async () => {
        const response = activitiesServiceHelpers.checkDuration('2023-03-17 09:00:00.00', '2023-03-17 10:00:00.00');
        expect(response).toStrictEqual(true);
      });
    it("should respond with false if the event lasts less than 1 hour", async () => {
        const response = activitiesServiceHelpers.checkDuration('2023-03-17 09:00:00.00', '2023-03-17 9:10:00.00');
        expect(response).toStrictEqual(false);
      });
  });
  