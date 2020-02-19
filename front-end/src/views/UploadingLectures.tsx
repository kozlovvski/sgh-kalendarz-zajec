import React, { useContext, useEffect, useState } from "react";

import { AppContext } from "../components/AppManager";
import BackButton from "../components/BackButton";
import { LecturesEntry } from "../ownTypes";
import addClearCalendar from "../util/addClearCalendar";

interface Props {}

const initial: LecturesEntry[] = [
  {
    dates: [
      "23-02-20",
      "08-03-20",
      "22-03-20",
      "05-04-20",
      "26-04-20",
      "17-05-20",
      "07-06-20"
    ],
    end_time: "15:10",
    form: "C",
    group: "101",
    lecturer: "Bystrzycka Hanna",
    name: "Rachunkowość",
    signature: "110560-0050",
    start_time: "13:30",
    type: "NLLS"
  },
  {
    dates: ["22-02-20", "07-03-20"],
    end_time: "20:40",
    form: "W",
    group: "10",
    lecturer: "Bystrzycka Hanna",
    name: "Rachunkowość",
    signature: "110560-0050",
    start_time: "19:00",
    type: "NLLS"
  },
  {
    dates: ["05-04-20"],
    end_time: "19:45",
    form: "W",
    group: "10",
    lecturer: "Bystrzycka Hanna",
    name: "Rachunkowość",
    signature: "110560-0050",
    start_time: "17:10",
    type: "NLLS"
  },
  {
    dates: [
      "22-02-20",
      "07-03-20",
      "21-03-20",
      "04-04-20",
      "25-04-20",
      "16-05-20",
      "06-06-20"
    ],
    end_time: "13:20",
    form: "W",
    group: "10",
    lecturer: "Baranowska-Prokop Ewa",
    name: "Marketing globalny",
    signature: "121450-0014",
    start_time: "11:40",
    type: "NLLS"
  }
];

const UploadingLectures: React.FC<Props> = () => {
  const [loading, setLoading] = useState(false);
  const [progressData, setProgressData] = useState({ current: 0, to: 0 });

  const {
    data: { fetchedLectures }
  } = useContext(AppContext);

  useEffect(() => {
    const createEvents = async () => {
      await addClearCalendar();

      initial.forEach(lecture => {});
    };

    createEvents();
  }, []);

  return (
    <div className="wrapper">
      <BackButton>Wstecz</BackButton>
    </div>
  );
};

export default UploadingLectures;
