import { createBrowserRouter, Navigate } from "react-router";
import BasicLeftNavAndHeader from "../layout/BasicLeftNavAndHeader/layout";
import Customer from "../pages/Customer";
import Schedule from "../pages/Schedule";
import Trainings from "../pages/Trainings";
import PeopleIcon from "@mui/icons-material/People";
import SportsIcon from "@mui/icons-material/Sports";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <BasicLeftNavAndHeader />,
    children: [
      { index: true, element: <Navigate to="/customers" replace /> },
      { path: "customers", element: <Customer /> },
      { path: "trainings", element: <Trainings /> },
      { path: "schedules", element: <Schedule /> },
    ],
  },
]);

export const navBarNavItems = [
  { label: "Customers", to: "/customers", icon: <PeopleIcon /> },
  { label: "Trainings", to: "/trainings", icon: <SportsIcon /> },
  { label: "Schedules", to: "/schedules", icon: <CalendarMonthIcon /> },
];

export const navBarNavItemsMap = navBarNavItems.reduce((acc, item) => {
  acc[item.to] = item;
  return acc;
}, {} as Record<string, (typeof navBarNavItems)[0]>);
