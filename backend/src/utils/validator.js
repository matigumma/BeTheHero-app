const { celebrate, Segments, Joi } = require("celebrate");

module.exports = {
  validateCreateOng() {
    return celebrate({
      [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string()
          .required()
          .email(),
        whatsapp: Joi.string()
          .required()
          .min(10)
          .max(11),
        city: Joi.string().required(),
        uf: Joi.string()
          .required()
          .length(2)
      })
    });
  },
  validateProfileIndex() {
    return celebrate({
      [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required()
      }).unknown()
    });
  },
  validateIncidentList() {
    return celebrate({
      [Segments.QUERY]: Joi.object().keys({
        page: Joi.number()
      })
    });
  },
  validateIncidentCreate() {
    return celebrate({
      [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required()
      }).unknown(),
      [Segments.BODY]: Joi.object().keys({
        title: Joi.string().required(),
        description: Joi.string().required(),
        value: Joi.number().required()
      })
    });
  },
  validateIncidentDelete() {
    return celebrate({
      [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required()
      })
    });
  }
};
