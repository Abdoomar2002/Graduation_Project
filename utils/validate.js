const validateName = (name) => {
  if (!name) {
    return "Name is required ";
  }
  return "";
};

const validateEmail = (email) => {
  if (!email) {
    return "Email is required ";
  }
  const emailRegex = /\S+@\S+\.\S+/;
  if (!emailRegex.test(email)) {
    return "Email is not valid ";
  }
  return "";
};

const validatePhone = (phone) => {
  if (!phone) {
    return "Phone number is required ";
  }
  const phoneRegex = /^\d{11}$/;
  if (!phoneRegex.test(phone)) {
    return "Phone number must be 11 digits ";
  }
  return "";
};

const validateMessage = (message) => {
  if (!message) {
    return "Message is required ";
  }
  return "";
};

const validateImage = (image) => {
  if (!image) {
    return "Image is required ";
  }
  return "";
};
const validateNationalID = (nationalID) => {
  const nationalIdRegex = /^\d{14}$/;
  if (!nationalID && nationalIdRegex.test(nationalID)) {
    return "National ID must be 14 digits ";
  }
  return "";
};
function validatePassword(password, confirmPassword) {
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  if (password.length < 8 && !passwordRegex.test(password)) {
    return "Password must be at least 8 characters and contain at least one small letter and one capital letter and digit and symbole";
  } else if (password !== confirmPassword) {
    return "Password and confirm password do not match";
  }
  return "";
}
export default Validate = {
  validateEmail,
  validateImage,
  validateName,
  validatePhone,
  validateMessage,
  validateNationalID,
  validatePassword,
};
