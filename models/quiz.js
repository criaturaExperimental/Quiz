
// Definicion del modelo de Quiz con validación

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Quiz',
    { pregunta: { type: DataTypes.STRING,
    	  validate: { notEmpty: { msg: "-> Falta pregunta" } }
    	},
      respuesta:{ type: DataTypes.STRING,
      	validate: { notEmpty: { msg: "-> Falta respuesta" } }
      },
      categoria:{ type: DataTypes.STRING,
      	validate: { isIn: {
          args: [["Otro", "Humanidades", "Ocio", "Ciencia", "Tecnología"]],
          msg: "-> Categoría incorrecta"
          }
        }
      }
    }
  );
}
