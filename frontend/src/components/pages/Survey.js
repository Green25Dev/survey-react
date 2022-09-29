import axios from 'axios'
import React, { useState, useEffect, useRef } from 'react'
import api from '../../config.json'
import { useNavigate } from 'react-router-dom';
import Progress from '../Progress'

let answerList = []

function Survey() {
  const navigate = useNavigate()

  const [questionList, setQuestionList] = useState([])
  const [errorMsg, setErrorMsg] = useState("");
  const [index, setIndex] = useState(-1)
  const responseText = useRef()

  let isFirst = true;

  useEffect(() => {
    if (isFirst === true) {
      isFirst = false;
      axios.get(`${api.SERVER_ADDRESS}/sectionlist`)
        .then((res) => {
          setQuestionList(res.data.result)
          if (res.data.result.length > 0)
            setIndex(0);
        })
        .catch(err => {
          throw err
        })
    }
  }, [])

  const next = () => {
    if (questionList[index].isRequired && responseText.current.value == "") {
      setErrorMsg("Please fill out input!")
    }
    else {
      setErrorMsg("")
      answerList.push({
        "questionId": questionList[index].qz_id,
        "responseText": responseText.current.value
      })

      responseText.current.value = ""
      setIndex(prev => prev + 1);
      if (answerList.length === questionList.length) {
        const requestData = {
          surveyId: api.SURVEY_ID,
          responses: answerList
        }
        axios.post(`${api.SERVER_ADDRESS}/answer`, requestData)
          .then((res) => {
            navigate("/end")
          })
      }
    }
  }

  const handleChange = () => {
    if (responseText.current.value != "")
      setErrorMsg("");
  }

  return (
    <div>
      {(index === -1 || index >= questionList.length) ||
        <div>
          <h1>{questionList[index].title}</h1>
          <div className="App-qz-text">
            <Progress percent={Math.floor(index * 100 / questionList.length)} />
            <p>{questionList[index].question}<span style={{ color: "red", marginTop: "-3px" }}>{questionList[index].isRequired ? " *" : ""}</span></p>
            <input type="text" placeholder="Answer" ref={responseText} onChange={handleChange} />
            {errorMsg ? <p style={{ color: "red", textAlign: "center" }}>{errorMsg}</p> : ""}
          </div>
          <button onClick={next}>CONTINUE</button>
        </div>
      }
      {index !== -1 ||
        <h2>Loading questions...</h2>
      }
    </div>
  );
}

export default Survey;
