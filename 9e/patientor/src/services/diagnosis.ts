import axios from "axios";
import { apiBaseUrl } from "../constants";
import { Diagnosis } from "../types";
import parseDiagnose from "../utils/parseDiagnose";

const getallDiagnosis = async (): Promise<Diagnosis[]> => {
  let { data } = await axios.get<Diagnosis[]>(`${apiBaseUrl}/diagnoses`);

  data = data.map(parseDiagnose);
  return data;
};

export default {
  getallDiagnosis
};