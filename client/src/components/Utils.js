let options = {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  weekday: "long",
  year: "numeric",
  month: "short",
  day: "numeric",
};

export const dateParser = (dateTime) => {
  let timestamp = Date.parse(dateTime);

  let date = new Date(timestamp).toLocaleDateString(undefined, options);
  return date.toString();
};

export const timestampParser = (num) => {
  let date = new Date(num).toLocaleDateString(undefined, options);
  return date.toString();
};

export const isEmpty = (value) => {
  return (
    value === undefined ||
    value === null ||
    (typeof value === "object" && Object.keys(value).length === 0) ||
    (typeof value === "string" && value.trim().length === 0)
  );
};
