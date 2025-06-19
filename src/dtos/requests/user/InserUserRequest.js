import Joi from "joi";
import bcrypt from "bcrypt";

class insertUserRequest {
  constructor(data) {
    this.email = data.email;
    this.password = this.encryptPassword(data.password);
    this.name = data.name;
    this.role = data.role;
    this.avatar = data.avatar;
    this.phone = data.phone;
  }

  encryptPassword(password) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  }

  static validate(data) {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(1).required(),
      name: Joi.string().required(),
      role: Joi.number().integer().min(1),
      avatar: Joi.string().uri().allow("").optional(),
      phone: Joi.string().optional(),
    });

    return schema.validate(data);
  }
}

export default insertUserRequest;
