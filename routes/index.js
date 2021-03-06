var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');
var commentController = require('../controllers/comment_controller');

var sessionController = require('../controllers/session_controller');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Quiz', errors: [] });
});

/* GET author */
router.get('/author', function(req, res, next) {
  res.render('author', { author: 'Lucas deGomez', errors: []});
});

// Autoload de comandos con :quizId
router.param('quizId', quizController.load);
router.param('commentId', commentController.load);  // autoload :commentId

// Definición de rutas de sesion
router.get('/login',  sessionController.new);     // formulario login
router.post('/login', sessionController.create);  // crear sesión
router.get('/logout', sessionController.destroy); // destruir sesión

/* GET de preguntas y respuestas a través de rutas */
router.get('/quizzes',                      quizController.index);
router.get('/quizzes/:quizId(\\d+)',        quizController.show);
router.get('/quizzes/:quizId(\\d+)/answer', quizController.answer);
router.get('/quizzes/new', 				          sessionController.loginRequired, quizController.new);
router.post('/quizzes/create',              sessionController.loginRequired, quizController.create);
router.get('/quizzes/:quizId(\\d+)/edit',   sessionController.loginRequired, quizController.edit);
router.put('/quizzes/:quizId(\\d+)',        sessionController.loginRequired, quizController.update);
router.delete('/quizzes/:quizId(\\d+)',     sessionController.loginRequired, quizController.destroy);

// Comentarios
router.get('/quizzes/:quizId(\\d+)/comments/new',            commentController.new);
router.post('/quizzes/:quizId(\\d+)/comments',              commentController.create);
router.get('/quizzes/:quizId(\\d+)/comments/:commentId(\\d+)/publish',
	                                    sessionController.loginRequired, commentController.publish);

module.exports = router;
