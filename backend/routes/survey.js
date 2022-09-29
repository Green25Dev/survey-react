var express = require('express');
var axios = require('axios');
var router = express.Router();

/* GET home page. */
router.get('/name', function(req, res, next) {
  axios.get('https://run.mocky.io/v3/e56a3256-8703-4705-a182-77cad0b702d1')
  .then(function (response) {
    res.send({success: true, surveyName: response.data.surveyName});
  })
  .catch(function (error) {
    res.send({success: false, surveyName: ''});
  });
});

router.get('/sectionlist', async function (req, res, next) {
  let response = await axios.get('https://run.mocky.io/v3/e56a3256-8703-4705-a182-77cad0b702d1');
  let sectionList = [];
  for (let sectionId = 0; sectionId < response.data.sections.length; sectionId++) {
    let curSection = response.data.sections[sectionId];
    for (let questionId = 0; questionId < curSection.questionIds.length; questionId ++) {
      let questionStr = await axios.get(' https://run.mocky.io/v3/' + curSection.questionIds[questionId]);
      sectionList.push({
        title: curSection.title,
        question: questionStr.data.questionText,
        isRequired: questionStr.data.isRequired
      });
    }
  }

  console.log(sectionList);
  res.send({success:true, result: sectionList});
});

router.post('/answer', function (req, res, next) {
  axios.post('/https://run.mocky.io/v3/b081763d-eef1-44ab-8bab-3ce008c49bdf', {
    data: req.data
  })
  .then(function (response) {
    res.send({success: true, msg: ""});
  })
  .catch(function (error) {
    res.send({success: false, msg: "Error while send answer"});
  });
});

module.exports = router;
