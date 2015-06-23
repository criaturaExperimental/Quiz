var models = require('../models/models.js');

// Autoload - factoriza el código si ruta incluye :quizId
exports.load = function(req, res, next, quizId) {
  models.Quiz.findById(quizId).then(
    function(quiz) {
      if (quiz) {
        req.quiz = quiz;
        next();
      } else {
        next(new Error('No existe quizId=' + quizId));
      }
    }
  ).catch(function(error) {next(error);})
};

// GET /quizzes
exports.index = function(req, res) {
  if (!req.query.search) {
    models.Quiz.findAll().then(function(quizzes){
      res.render( 'quizzes/index.ejs', { quizzes: quizzes } );
    }
    ).catch(function(error) {next(error);})
  } else {
    // delimitar el string contenido en search con el comodín % antes y después cambie también
    // los espacios en blanco por %. De esta forma, si busca "uno dos" ("%uno%dos%"),
    // mostrará todas las preguntas que tengan "uno" seguido de "dos", independientemente
    // de lo que haya entre "uno" y "dos".
    models.Quiz.findAll(
      {
        where: [ "lower(pregunta) like lower(?)", "%"+req.query.search.split(" ").join("%")+"%" ]
      }).then( function(quizzes) {
        res.render( 'quizzes/index.ejs', { quizzes: quizzes.sort() } );
      }
    ).catch(function(error) {next(error);})
  };
}

// GET /quizes/:id
exports.show = function(req, res) {
  res.render( 'quizzes/show', { quiz: req.quiz } );
};

// GET /quizes/:id/answer
exports.answer = function(req, res) {
  var resultado = 'Incorrecto';
  if ( req.query.respuesta === req.quiz.respuesta ) {
    resultado = '¡Correcto!';
  }
  res.render( 'quizzes/answer', { quiz: req.quiz, respuesta: resultado } );
};
