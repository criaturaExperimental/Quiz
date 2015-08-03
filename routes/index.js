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

// Autolad de comandos con :quizId
router.param('quizId', quizController.load);

/* GET de preguntas y respuestas a través de rutas */
router.get('/quizzes',                      quizController.index);
router.get('/quizzes/:quizId(\\d+)',        quizController.show);
router.get('/quizzes/:quizId(\\d+)/answer', quizController.answer);
router.get('/quizzes/new',                  quizController.new);
router.post('/quizzes/create',              quizController.create);


module.exports = router;
