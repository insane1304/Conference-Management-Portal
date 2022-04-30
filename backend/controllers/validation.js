const Joi = require("@hapi/joi");

//Register Validation
const studentRegisterValid = data => {
    const schema = Joi.object({
        name: Joi.string().min(5).required(),
        email: Joi.string().min(6).required().email(),
        username: Joi.string().min(5).required(),
        password: Joi.string().min(6).required(),
        contact: Joi.string().length(10).pattern(/^\d+$/).required(),
        section: Joi.string().required(),
        semester: Joi.string().required(),
        branch: Joi.string().required(),
        enrollment: Joi.string().required()
    });
    return schema.validate(data);
};

const authorRegisterValid = data => {
  console.log(data)
    const schema = Joi.object({
        firstName: Joi.string().min(3).required(),
        lastName: Joi.string().min(3).required(),
        email: Joi.string().min(6).required().email(),
        // username: Joi.string().min(5).required(),
        password: Joi.string().min(6).required(),
        confirmPassword: Joi.string().required().valid(Joi.ref('password')),

        contact: Joi.string().length(10).pattern(/^\d+$/).required(),
        organisation: Joi.string().required(),
        country:Joi.string().required(),
    });
    return schema.validate(data);
};

//Login Validation
const studentLoginValid = data => {
    const schema = Joi.object({
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()

    });
    return schema.validate(data);
};

const authorLoginValid = data => {
    const schema = Joi.object({
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    });
    return schema.validate(data);
};

const createConfValid = data => {
    const schema = Joi.object({
        title: Joi.string().min(3).required(),
        venue: Joi.string().required(),
        description: Joi.string().min(20).required(),
        researchArea: Joi.string().required(),
    });
    return schema.validate(data);
};

const uploadDetailsValid = data => {
  // console.log(data);
    const schema = Joi.object({
        title: Joi.string().required(),
        abstract: Joi.string().required(),
        keywords:Joi.string().required(),
        file:Joi.string().invalid("undefined"),
        url:Joi.string(),
    });
    return schema.validate(data);
};

const editProfileValid = data => {
  console.log(data)
    const schema = Joi.object({
        firstName: Joi.string().min(3).required(),
        lastName: Joi.string().min(3).required(),
        email: Joi.string().min(6).required().email(),
        contact: Joi.string().length(10).pattern(/^\d+$/).required().label("Contact")
    .messages({
      "string.pattern.base": "\"Contact\" must be a valid 10 digit number"
    }),
        organisation: Joi.string().required(),
    });
    return schema.validate(data);
};

const updatePassValid = data => {
    const schema = Joi.object({
        initialPass: Joi.string().min(6).required().label("Old Password"),
        newPass: Joi.string().min(6).required().label("New Password"),
        confirmPass:  Joi.string().required().valid(Joi.ref('newPass')).label("Confirm Password"),

    });
    return schema.validate(data);
};

const resetPassValid = data => {
    const schema = Joi.object({
        newPass: Joi.string().min(6).required().label("New Password"),
        confirmPass:  Joi.string().required().valid(Joi.ref('newPass')).label("Confirm Password"),
    });
    return schema.validate(data);
};

const updateConfValid = data => {
    const schema = Joi.object({
        title: Joi.string().min(3).required(),
        venue: Joi.string().required(),
        description: Joi.string().min(20).required(),
        researchArea: Joi.string().required(),
    });
    return schema.validate(data);
};

const emailValid = data => {
    const schema = Joi.object({
        email: Joi.string().required().email(),
    });
    return schema.validate(data);
};


module.exports.studentRegisterValid = studentRegisterValid;
module.exports.studentLoginValid = studentLoginValid;
module.exports.authorRegisterValid = authorRegisterValid;
module.exports.authorLoginValid = authorLoginValid;
module.exports.uploadDetailsValid = uploadDetailsValid;
module.exports.createConfValid = createConfValid;
module.exports.editProfileValid = editProfileValid;
module.exports.updatePassValid = updatePassValid;
module.exports.resetPassValid = resetPassValid;
module.exports.updateConfValid = updateConfValid;
module.exports.emailValid = emailValid;
