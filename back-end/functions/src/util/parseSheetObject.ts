import { SheetLecture, LecturesEntry } from "../../ownTypes";

const parseSheetObject = (data: SheetLecture, type: string): LecturesEntry => {
  // see example objects in ../ownTypes.d.ts
  const przedmiot_split = data.Przedmiot.split(/(?<=\d)\ (?=\w)/);
  const lecturer = data.Prowadzący.replace(/[-\d\s]{2,}/, "");

  const res = {
    signature: przedmiot_split[0],
    name: przedmiot_split[1],
    start_time: data.Poczatek,
    end_time: data.Koniec,
    dates: data["Daty zajęć (dd-mm-rr)"],
    form: data.Forma,
    group: String(data["Numer grupy"]),
    lecturer,
    type
  };

  return res;
};

export default parseSheetObject;
