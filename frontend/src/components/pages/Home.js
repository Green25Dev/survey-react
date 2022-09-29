import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import api from '../../config.json'

function Home() {
  const navigate = useNavigate();
  const [surveyName, setSurveyName] = useState("")

  useEffect(() => {
    axios.get(`${api.SERVER_ADDRESS}/name`)
      .then((res) => {
        setSurveyName(res.data.surveyName)
      })
      .catch(err => {
        throw err
      })
  }, [])

  const start = () => {
    navigate('/survey')
  }

  return (
    <div>
      {(surveyName === "") ||
        <div>
          <h1>{surveyName}</h1>
          <button onClick={start}>START</button>
        </div>
      }
      {surveyName !== "" ||
        <h2>Loading...</h2>
      }
    </div>
  );
}

export default Home;
