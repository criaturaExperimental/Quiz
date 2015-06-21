var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Quiz' });
});

/* GET author */
router.get('/author', function(req, res, next) {
  res.render('author', { author: 'Lucas deGomez'});
});


/* GET question and answer */
router.get('/quizzes/question', quizController.question);
router.get('/quizzes/answer', quizController.answer);


module.exports = router;
