import { useEffect } from "react";
import { useTrainingStore } from "../store/useTrainingStore";
import TrainingTable from "../components/trainings/TrainingTable";
import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { TrainingBarChart } from "../components/trainings/TrainingBarChart";
import { Stack } from "@mui/material";
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
function Trainings() {
  const { getAllTrainings } = useTrainingStore();
  useEffect(() => {
    getAllTrainings();
  }, []);
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Table view" {...a11yProps(0)} />
          <Tab label="Chart View" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <TrainingTable></TrainingTable>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <Stack direction={"column"} spacing={2} height={500} justifyContent={'center'} alignItems={'center'}>
          <TrainingBarChart />
        </Stack>
      </CustomTabPanel>
    </>
  );
}

export default Trainings;
