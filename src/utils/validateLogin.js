export default function validateLogin(formData) {
  const errors = {};

  if (!formData.email) {
    errors.email = "Please fill this field properly";
  } else if (!/^[a-zA-Z0-9._%+-]+@(binus\.edu|binus\.ac\.id)$/.test(formData.email)) {
    errors.email = "Email must end with 'binus.edu' or 'binus.ac.id'";
  }

  if (!formData.password) {
    errors.password = "Please fill this field properly";
  } else if (formData.password.length < 8) {
    errors.password = "Password must at least 8 letters";
  }

  return errors;
}
