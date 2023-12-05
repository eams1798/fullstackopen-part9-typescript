import { validate as isUUID } from "uuid";

export const isDate = (param: string): boolean => {
  /* string matches with YYYY-MM-DD */
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  return regex.test(param) && !isNaN(Date.parse(param));
};

export const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

export const isNumber = (param: unknown): param is number => {
  return typeof param === "number" || param instanceof Number || Number.isNaN(Number(param));
};

export const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error("Incorrect or missing date");
  }
  return date;
};

export const parseUUID = (id: unknown): string => {
  if (!id || !isString(id) || !isUUID(id)) {
    throw new Error("Incorrect or missing uuid");
  }
  return id;
};