var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Quiz' });
});

/* GET question and answer */
router.get('/quizzes/question', quizController.question);
router.get('/quizzes/answer', quizController.answer);

module.exports = router;
