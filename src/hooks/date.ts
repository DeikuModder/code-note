import { differenceInCalendarDays, isYesterday } from "date-fns";

export const useFormatedDate = (date: Date | string) => {
  const givenDate = new Date(date);
  const givenDateYear = givenDate.getFullYear();
  const givenDateMonth = givenDate.getMonth() + 1;
  const givenDateDay = givenDate.getDate() + 1;

  const givenDateFormated = `${givenDateMonth}/${givenDateDay}/${givenDateYear}`;

  return givenDateFormated;
};

export const useCheckIsToday = (formatedDate: Date | string) => {
  const actualDate = new Date();
  const actualDateYear = actualDate.getFullYear();
  const actualDateMonth = actualDate.getMonth() + 1;
  const actualDateDay = actualDate.getDate();

  const actualDateFormated = `${actualDateMonth}/${actualDateDay}/${actualDateYear}`;

  return actualDateFormated === formatedDate;
};

export const useDifferenceBetweenDays = (date: Date | string) => {
  const result = differenceInCalendarDays(new Date(date), new Date());

  return result;
};

export const useDeadlinePassed = (deadline: Date | string) => {
  return isYesterday(new Date(deadline));
};
