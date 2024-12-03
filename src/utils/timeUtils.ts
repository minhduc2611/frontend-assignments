import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/en";
import "dayjs/locale/fi";
import relativeTime from "dayjs/plugin/relativeTime";
import { getLang } from "./languageUtils";
import { CalendarView } from "../components/schedule/Scheduler";

class TimeUtils {
  dayjs = dayjs;
  constructor() {
    dayjs.locale(getLang());
    dayjs.extend(relativeTime);
  }
  formatTime = (time: string, template?: string) => {
    return this.dayjs(time).format(template || "DD.MM.YYYY HH:mm");
  };
  formatTimeDayjs = (time: Dayjs, template?: string) => {
    return time.format(template || "DD.MM.YYYY HH:mm");
  };
  calculateTimeDiff = (time: string) => {
    const timeDiffFromNowMinute = this.dayjs(time).diff(this.dayjs(), "minute");
    if (timeDiffFromNowMinute < 60) {
      return {
        timeDiffFromNow: timeDiffFromNowMinute,
        unit: "minutes",
      };
    } else if (timeDiffFromNowMinute < 1440) {
      return {
        timeDiffFromNow: this.dayjs(time).diff(this.dayjs(), "hour"),
        unit: "hours",
      };
    } else {
      return {
        timeDiffFromNow: this.dayjs(time).diff(this.dayjs(), "day"),
        unit: "days",
      };
    }
  };

  // list out the days in a month, returns 2 dimensional array, if other day is null, fill out by getting the days of the other month
  getCalendar = (date: Dayjs, currentType: CalendarView) => {
    if (currentType === CalendarView.MONTH) {
      const startOfMonth = date.startOf("month");
      const endOfMonth = date.endOf("month");
      const startDay = startOfMonth.startOf("week");
      const endDay = endOfMonth.endOf("week");
      const days = [];
      let currentDay = startDay;
      while (currentDay.isBefore(endDay)) {
        const week = [];
        for (let i = 0; i < 7; i++) {
          week.push(currentDay);
          currentDay = currentDay.add(1, "day");
        }
        days.push(week);
      }
      return days;
    } else if (currentType === CalendarView.WEEK) {
      // in week, 7 cols, 24 rows
      const startOfWeek = date.startOf("week");
      const startDay = startOfWeek.startOf("day");
      const hours = [];
      for (let i = 0; i < 24; i++) {
        const week = [];
        for (let j = 0; j < 7; j++) {

          const hour = startDay.add(i, "hour").add(j, "day");

          week.push(hour);
        }
        hours.push(week);
      }
      return hours;
    } else {
      const currentDay = date.startOf("day");
      const hours = [];
      for (let i = 0; i < 24; i++) {
        hours.push([currentDay.add(i, "hour")]);
      }
      return hours;
      
    }
  };
}
// eslint-disable-next-line import/no-anonymous-default-export
export default new TimeUtils();
