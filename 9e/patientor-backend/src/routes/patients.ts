import express from "express";
import { addEntrytoPatient, addPatient, getPatientById, getPatients } from "../services/patients";
import parseNewPatient from "../utils/parseNewPatient";
import parseEntry from "../utils/parseEntry";
import { parseUUID } from "../utils";

const router = express.Router();

router.get("/", (_req, res) => {
  res.json(getPatients());
});

router.get("/:id", (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      throw new Error("No id provided");
    }
    const patient = getPatientById(id);
    res.json(patient);
  } catch (e) {
    let errorMessage = "Something went wrong";
    if (e instanceof Error) {
      errorMessage += `: ${e.message}`;
    }
    res.status(400).send(errorMessage);
  }
});

router.post("/", (req, res) => {
  try {
    const newPatient = parseNewPatient(req.body);
    res.json(addPatient(newPatient));
  } catch (e) {
    let errorMessage = "Something went wrong";
    if (e instanceof Error) {
      errorMessage += `: ${e.message}`;
    }
    res.status(400).send(errorMessage);
  }
});

router.post("/:id/entries", (req, res) => {
  try {
    const patientId = parseUUID(req.params.id);
    const entry = parseEntry(req.body);

    const newEntry = addEntrytoPatient(entry, patientId);

    res.json(newEntry);
  } catch (e) {
    let errorMessage = "Something went wrong";
    if (e instanceof Error) {
      errorMessage += `: ${e.message}`;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;