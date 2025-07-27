import Joi from "joi";

class InsertProductImageRequest {
  constructor(data) {
    this.image = data.image;
    this.product_id = data.product_id;
  }

  static validate(data) {
    const schema = Joi.object({
      product_id: Joi.number().integer().required(),
      image: Joi.string().required(),
    });

    return schema.validate(data);
    s;
  }
}

export default InsertProductImageRequest;
