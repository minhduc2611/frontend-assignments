import { Box, Button, IconButton, Stack } from "@mui/material";
import { ArrowLeftIcon, ArrowRightIcon } from "@mui/x-date-pickers";
import { Dayjs } from "dayjs";
import { useMemo, useState } from "react";
import { SEvent } from "../../types/events";
import timeUtils from "../../utils/timeUtils";

export enum CalendarView {
  MONTH = "month",
  WEEK = "week",
  DAY = "day",
}
export type Current = {
  type: CalendarView;
  value: Dayjs;
};

const getCurrentByView = (view: CalendarView, value: Dayjs) => {
  if (view === CalendarView.MONTH) {
    return {
      type: CalendarView.MONTH,
      value: value.startOf("month"),
    };
  } else if (view === CalendarView.WEEK) {
    return {
      type: CalendarView.WEEK,
      value: value.startOf("week"),
    };
  }
  return {
    type: CalendarView.DAY,
    value: value,
  };
};

const useCalendar = () => {
  const [view, setView] = useState(CalendarView.MONTH);

  const [current, setCurrent] = useState<Current>(() => {
    return getCurrentByView(view, timeUtils.dayjs());
  });

  const currentMonth = current.value.month();
  const currentDay = current.value.date();

  //   console.log("current", current);
  const representation = useMemo(() => {
    // get days of the month
    const days = timeUtils.getCalendar(current.value, current.type);
    console.log("days", days);
    return {
      currentMonth: currentMonth, // 7 cols, 5 rows
      currentDay: currentDay, // in week, 7 cols, 24 rows
      days: days,
    };
  }, [current.value, current.type]);

  const next = () => {
    setCurrent((prev) => {
      return {
        type: prev.type,
        value: prev.value.add(1, prev.type),
      };
    });
  };

  const prev = () => {
    setCurrent((prev) => {
      return {
        type: prev.type,
        value: prev.value.subtract(1, prev.type),
      };
    });
  };

  const goToToday = () => {
    setCurrent({
      type: CalendarView.MONTH,
      value: timeUtils.dayjs(),
    });
  };

  const setViewTime = (view: CalendarView) => {
    setView(view);
    setCurrent(getCurrentByView(view, timeUtils.dayjs()));
  };

  return {
    days: [],
    view,
    current,
    representation: representation,
    next: next,
    prev: prev,
    today: goToToday,
    setView: setViewTime,
  };
};

function Scheduler({ events }: { events: SEvent[] }) {
  const { view, representation, next, prev, current, setView } = useCalendar();

  const weekDays = useMemo(() => {
    if (view === CalendarView.MONTH) {
      return ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    }
    if (view === CalendarView.WEEK) {
      const startOfWeek = representation.days[0][0];
      const endOfWeek = representation.days[0][6];
      const endDay = endOfWeek.endOf("day");
      const days = [];
      let currentDay = startOfWeek;
      while (currentDay.isBefore(endDay)) {
        days.push(currentDay.format("DD/MM"));
        currentDay = currentDay.add(1, "day");
      }
      console.log("AAAAA days", days);
      return days;
    }
    return [representation.currentDay];
  }, [view, representation.currentDay, representation.days]);
  const monthMap: { [key: number]: string } = {
    0: "Jan",
    1: "Feb",
    2: "Mar",
    3: "Apr",
    4: "May",
    5: "Jun",
    6: "Jul",
    7: "Aug",
    8: "Sep",
    9: "Oct",
    10: "Nov",
    11: "Dec",
  };

  const width = useMemo(() => {
    if (view === CalendarView.MONTH) {
      return 100 / 7 + "%";
    } else if (view === CalendarView.WEEK) {
      return 100 / 8 + "%";
    }
    return 100 / 2 + "%";
  }, [view]);

  const firstColWidth = useMemo(() => {
    if (view !== CalendarView.MONTH) {
      return 100 / 8 + "%";
    }
    return "0%";
  }, [view]);

  //   const isAgenda = view === 'agenda';
  return (
    <Box id="container" width={"100%"} height={500}>
      <Stack
        direction="row"
        spacing={2}
        justifyItems={"center"}
        justifyContent={"space-between"}
      >
        <Stack
          direction="row"
          spacing={2}
          justifyItems={"center"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <IconButton color="primary" type="button" onClick={prev}>
            <ArrowLeftIcon />
          </IconButton>
          <span>
            {view === CalendarView.MONTH || view === CalendarView.WEEK
              ? monthMap[representation.currentMonth]
              : current.value.format("DD/MM")}
          </span>
          <IconButton color="primary" type="button" onClick={next}>
            <ArrowRightIcon />
          </IconButton>
        </Stack>

        <Stack
          direction="row"
          spacing={2}
          justifyItems={"center"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Button
            color="primary"
            type="button"
            onClick={() => setView(CalendarView.MONTH)}
          >
            Month
          </Button>
          <Button
            color="primary"
            type="button"
            onClick={() => setView(CalendarView.WEEK)}
          >
            Week
          </Button>
          <Button
            color="primary"
            type="button"
            onClick={() => setView(CalendarView.DAY)}
          >
            Day
          </Button>
          {/* <Button
            color="primary"
            type="button"
            onClick={() => setView(CalendarView.AGENDA)}
          >
            Agenda
          </Button> */}
        </Stack>
      </Stack>

      <table cellSpacing="0" style={{ width: "100%", borderSpacing: 0 }}>
        <thead>
          <tr>
            {view !== CalendarView.MONTH && (
              <th style={{ width: firstColWidth }}>{``}</th>
            )}
            {weekDays.map((day, index) => (
              <th style={{ width }} key={index}>
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {representation.days &&
            representation.days.map((week, index) => (
              <tr key={index}>
                {view !== CalendarView.MONTH && <td>{`${index}:00`}</td>}
                {week.map((day, index) => (
                  <td
                    key={index}
                    style={{
                      textAlign: "center",
                      height: view !== CalendarView.MONTH ? 30 : 120,
                      border: "1px solid black",
                      position: "relative",
                      backgroundColor:
                        day.month() !== timeUtils.dayjs().month()
                          ? "#dcdbdb"
                          : day.date() === timeUtils.dayjs().date()
                          ? "aliceblue"
                          : "white",
                    }}
                  >
                    {view === CalendarView.MONTH && (
                      <div
                        style={{
                          position: "absolute",
                          width: "25px",
                          height: "25px",
                          top: 0,
                          right: 0,
                          color: "black",
                          backgroundColor: "white",
                          borderRadius: "100%",
                          zIndex: 1,
                        }}
                      >
                        {day.format("DD")}
                      </div>
                    )}
                    {events.map((event, index) => {
                      const eventDay = timeUtils.dayjs(event.start).date();
                      const eventMonth = timeUtils.dayjs(event.start).month();
                      const eventHour = timeUtils.dayjs(event.start).hour();
                      if (
                        view === CalendarView.MONTH &&
                        eventDay === day.date() &&
                        eventMonth === day.month()
                      ) {
                        return (
                          <Box
                            key={index}
                            bgcolor={"white"}
                            color={"white"}
                            padding={1}
                          >
                            <Box
                              bgcolor={"primary.main"}
                              color={"white"}
                              padding={1}
                              borderRadius={1}
                              overflow={"hidden"}
                            >
                              {`${timeUtils
                                .dayjs(event.start)
                                .format("HH:mm")} ${event.title}`}
                            </Box>
                          </Box>
                        );
                      }
                      if (
                        eventDay === day.date() &&
                        // hour
                        eventHour === day.hour()
                      ) {
                        return (
                          <Box
                            key={index}
                            bgcolor={"white"}
                            color={"white"}
                            padding={1}
                          >
                            <Box
                              bgcolor={"primary.main"}
                              color={"white"}
                              padding={1}
                              borderRadius={1}
                              overflow={"hidden"}
                            >
                              {`${timeUtils
                                .dayjs(event.start)
                                .format("HH:mm")} ${event.title}`}
                            </Box>
                          </Box>
                        );
                      }
                      return <></>;
                    })}
                  </td>
                ))}
              </tr>
            ))}
        </tbody>
      </table>
    </Box>
  );
}

export default Scheduler;
