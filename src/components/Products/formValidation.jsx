import { useState } from "react";
import Joi from "joi";


export const validationSchema = Joi.object({
  name: Joi.string().min(2).required().label("Namn"),
  price: Joi.number().min(0).max(999).required().label("Pris"),
  url: Joi.string().uri({ scheme: ['http', 'https'] }).required().label("Bildlänk"),
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