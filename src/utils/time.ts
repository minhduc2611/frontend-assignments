import dayjs from "dayjs";
import "dayjs/locale/en";
import "dayjs/locale/fi";
import relativeTime from "dayjs/plugin/relativeTime";
import { getLang } from "./language";

class TimeUtils {
  dayjs = dayjs;
  constructor() {
    dayjs.locale(getLang());
    dayjs.extend(relativeTime);
  }
  formatTime = (time: string, template?: string) => {
    return this.dayjs(time).format(template || "DD.MM.YYYY HH:mm");
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
}
// eslint-disable-next-line import/no-anonymous-default-export
export default new TimeUtils();
