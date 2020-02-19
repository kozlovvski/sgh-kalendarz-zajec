const parseDateTime = (date: string, time: string) => {
  const dateSplit = date.split("-");
  if (dateSplit.length !== 3 && dateSplit.some(str => str.length !== 2)) {
    console.log("Wrong date format");
    return null;
  }

  const timeSplit = time.split(":");
  if (timeSplit.length !== 2 && timeSplit.some(str => str.length > 2)) {
    console.log("Wrong time format");
    return null;
  }

  const day = dateSplit[0];
  const month = dateSplit[1];
  const year = dateSplit[2];

  const hour = timeSplit[0];
  const min = timeSplit[1];

  return `20${year}-${month}-${day}T${
    hour.length === 1 ? "0" + hour : hour
  }:${min}:00`;
};

export default parseDateTime;
