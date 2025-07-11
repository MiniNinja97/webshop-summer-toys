import Joi from 'joi';
import { useState } from 'react';


//till inlogget
export const validationSchema = Joi.object({
  username: Joi.string()
    .min(4)
    .required()
    .messages({
      'string.empty': 'Required.',
      'string.min': 'Too short',
    }),
  password: Joi.string()
    .min(8)
    .required()
    .messages({
      'string.empty': 'Required.',
      'string.min': 'Too short',
    }),
});



//till edit och ny produkt
export const productValidationSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(30)
    .required()
    .messages({
      'string.empty': 'Required.',
      'string.min': 'Too short',
    }),
  price: Joi.number()
    .positive()
    .required()
    .messages({
      'number.base': 'Must be a number.',
      'number.empty': 'Required.',
    }),
  url: Joi.string()
    .uri()
    .required()
    .messages({
      'string.uri': 'Must start with http:// or https://',
      'string.empty': 'Required.',
    }),
});

export function useFormValidation(schema, initialValues) {
  const [formData, setFormData] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedData = { ...formData, [name]: value };
    setFormData(updatedData);

    const fieldSchema = schema.extract(name);
    const { error } = fieldSchema.validate(value);
    setErrors((prev) => ({
      ...prev,
      [name]: error ? error.message : "",
    }));
  };

  const isFormValid = () => {
    const { error } = schema.validate(formData, { abortEarly: false });
    if (!error) return true;

    const newErrors = {};
    error.details.forEach((err) => {
      newErrors[err.path[0]] = err.message;
    });
    setErrors(newErrors);
    return false;
  };

  return { formData, setFormData, handleChange, errors, isFormValid };
}