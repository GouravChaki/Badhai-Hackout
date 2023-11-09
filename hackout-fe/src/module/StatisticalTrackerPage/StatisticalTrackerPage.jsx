import React, { useState, useContext, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./StatisticalTracker.scss";
import { useAuth } from "../common/hooks/useAuth";
import axios from "axios";
import Card from "../common/Card/Card";
import { Modal } from "../common/Modal/Modal";
import CardPopUp from "../common/CardPopUp/CardPopUp";
import CalenderContext from "../common/contexts/CalenderContext";

function StatisticalTrackerPage() {
  let response;
  const { selectedDate } = useContext(CalenderContext);
  const [date, setDate] = useState(selectedDate);
  const [isOpen, setIsOpen] = useState(false);
  const [userData, setUserData] = useState({
    date: "", // Include 'date' in 'userData'
    maternal_weight: "",
    fetal_movement: "",
    blood_pressure_sys: "",
    blood_pressure_dias: "",
    fetal_heart_rate: "",
    amniotic_fluid_index: "",
    blood_sugar_level: "",
    thyroid_function: "",
    haemoglobin_level: "",
  });

  useEffect(() => {
    setDate(selectedDate);
  }, [selectedDate]);

  const handleChange = (field, value) => {
    setUserData((prevData) => ({ ...prevData, [field]: value }));
  };
  // function extractAndTransformObjectValues(obj, transformationFunction) {
  //   const values = Object.values(obj);
  //   return values.map(transformationFunction);
  // }
  const sendDataToBackend = async () => {
    try {
      const dataToSend = {
        ...userData,
        date: date, // Set 'date' field before sending to the backend
      };
      console.log(dataToSend);
      response = await axios.post(
        "https://badhai-hackout-backend.onrender.com/statisticalTracker",
        dataToSend // Send the modified data
      );
      if (response.data.data) {
        console.log(response.data.data);
        const values = Object.values(response.data.data);
        if (values[0] === "emergency" || values[0] === "alert") {
          setIsOpen(true);
          await axios.post(
            "https://badhai-hackout-backend.onrender.com/email",
            {
                email_id:"gouravchaki123@gmail.com",
                danger_level: "Emergency!",
                message:"Kindly Visit A Health Care Provider"
            }
          );
        }
        else{
          alert("Data Entry Success!");
        }
      }
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };

  return (
    <div className="outer">
      <div className="container">
        <Card
          header="Maternal Weight Gain"
          label1="Weight"
          onValueChange={(value) => handleChange("maternal_weight", value)}
          sendDataToBackend={sendDataToBackend}
        />
        <Card
          header="Fetal Movement"
          label1="Movement"
          onValueChange={(value) => handleChange("fetal_movement", value)}
          sendDataToBackend={sendDataToBackend}
        />
        <Card
          header="Blood Pressure"
          label1="Systolic"
          label2="Diastolic"
          onValueChange={(value) => {
            handleChange("blood_pressure_sys", value);
            handleChange("blood_pressure_dias", value);
          }}
          sendDataToBackend={sendDataToBackend}
        />
        <Card
          header="Fetal Heart Rate"
          label1="Heart Rate"
          onValueChange={(value) => handleChange("fetal_heart_rate", value)}
          sendDataToBackend={sendDataToBackend}
        />
        <Card
          header="Amniotic Fluid Index"
          label1="AMI"
          onValueChange={(value) => handleChange("amniotic_fluid_index", value)}
          sendDataToBackend={sendDataToBackend}
        />
        <Card
          header="Blood Sugar Levels"
          label1="Sugar Levels"
          onValueChange={(value) => handleChange("blood_sugar_level", value)}
          sendDataToBackend={sendDataToBackend}
        />
        <Card
          header="Thyroid Function"
          label1="Value"
          onValueChange={(value) => handleChange("thyroid_function", value)}
          sendDataToBackend={sendDataToBackend}
        />
        <Card
          header="Haemoglobin Levels"
          label1="level"
          onValueChange={(value) => handleChange("haemoglobin_level", value)}
          sendDataToBackend={sendDataToBackend}
        />
      </div>
      <Modal isOpen={isOpen} setIsOpen={isOpen}>
        <CardPopUp
          header={"Emergency!! Kindly Visit A Health Care Provider"}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      </Modal>
    </div>
  );
}

export default StatisticalTrackerPage;
