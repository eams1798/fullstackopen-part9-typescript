import axios from "axios";
import { useState, useEffect } from "react";
import { Route, Link, Routes, useMatch } from "react-router-dom";
import { Button, Divider, Container, Typography } from '@mui/material';

import { apiBaseUrl } from "./constants";
import { Patient, INotification } from "./types";

import patientService from "./services/patients";
import PatientListPage from "./components/PatientListPage";
import PatientInfo from "./components/PatientInfo/index.tsx";
import NotFound from "./components/NotFound/index.tsx";
import AppContext from "./context.ts";
import NotificationMsg from "./components/NotificationMsg/index.tsx";

const App = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [notification, setNotification] = useState<INotification>({
    type: "",
    message: "",
  });

  const match = useMatch("/patients/:id");
  const patient = match ? patients.find(p => p.id === match.params.id) : null;

  useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      const patients = await patientService.getAll();
      setPatients(patients);
    };
    void fetchPatientList();
  }, []);
  
  return (
    <AppContext.Provider value={{ notification, setNotification }}>
      <div className="App">
        <Container>
          <Typography variant="h3" style={{ marginBottom: "0.5em" }}>
            Patientor
          </Typography>
          <Button component={Link} to="/" variant="contained" color="primary">
            Home
          </Button>
          <Divider hidden />
          <NotificationMsg />
          <Routes>
            <Route path="/" element={<PatientListPage patients={patients} setPatients={setPatients} />} />
            <Route path="/patients/:id" element={patient ? <PatientInfo patient={patient} setPatients={setPatients} /> : <NotFound />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Container>
      </div>
    </AppContext.Provider>
  );
};

export default App;
