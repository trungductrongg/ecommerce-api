import Joi from "joi";

class InsertCartRequest {
  constructor(data) {
    this.session_id = data.session_id;
    this.user_id = data.user_id;
  }

  static validate(data) {
    const schema = Joi.object({
      session_id: Joi.string().required(),
      user_id: Joi.number().integer().optional(),
    });

    return schema.validate(data);
  }
}

export default InsertCartRequest;
