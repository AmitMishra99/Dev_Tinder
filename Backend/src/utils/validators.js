const validator = require("validator");

const validateSignUpData = (req) => {
  const allowedFields = ["firstName", "lastName", "emailID", "password"];
  const bodyFields = Object.keys(req.body);

  const invalidFields = bodyFields.filter(
    (field) => !allowedFields.includes(field),
  );

  if (invalidFields.length > 0) {
    return {
      isValid: false,
      error: `Invalid fields: ${invalidFields.join(", ")}`,
    };
  }
  const { firstName, lastName, emailID, password } = req.body;

  if (!firstName || !lastName) {
    return { isValid: false, error: "First name and last name are required" };
  }

  if (!emailID || !validator.isEmail(emailID)) {
    return { isValid: false, error: "Invalid email address" };
  }

  if (!password || !validator.isStrongPassword(password)) {
    return { isValid: false, error: "Password is not strong enough" };
  }
  return { isValid: true };
};

const validateLoginData = (req) => {
  const allowedFields = ["emailID", "password"];
  const bodyFields = Object.keys(req.body);

  const invalidFields = bodyFields.filter(
    (field) => !allowedFields.includes(field),
  );

  if (invalidFields.length > 0) {
    return {
      isValid: false,
      error: `Invalid Fields : ${invalidFields.join(", ")}`,
    };
  }

  const { emailID, password } = req.body;

  if (!emailID || !validator.isEmail) {
    return { isValid: false, error: "Invalid email address" };
  }
  if (!password || !validator.isStrongPassword) {
    return { isValid: false, error: "Password is not strong enough" };
  }
  return { isValid: true };
};

const validateEditUserData = (req) => {
  const allowedFields = [
    "firstName",
    "lastName",
    "photoURL",
    "age",
    "gender",
    "skills",
    "about",
  ];

  const bodyFields = Object.keys(req.body);

  if (!bodyFields.length) {
    return {
      isValid: false,
      error: "No fields provided for update",
    };
  }

  const invalidFields = bodyFields.filter(
    (field) => !allowedFields.includes(field),
  );

  if (invalidFields.length > 0) {
    return {
      isValid: false,
      error: `Invalid fields: ${invalidFields.join(", ")}`,
    };
  }

  const { firstName, lastName, photoURL, age, gender, skills, about } =
    req.body;

  // ✅ Validate values ONLY if present
  if (firstName !== undefined && firstName.trim().length < 2) {
    return {
      isValid: false,
      error: "First name must be at least 2 characters",
    };
  }

  if (lastName !== undefined && lastName.trim().length < 2) {
    return { isValid: false, error: "Last name must be at least 2 characters" };
  }

  if (photoURL !== undefined && !validator.isURL(photoURL)) {
    return { isValid: false, error: "Invalid photo URL" };
  }

  if (age !== undefined) {
    const parsedAge = Number(age);
    if (!Number.isInteger(parsedAge) || parsedAge < 1 || parsedAge > 120) {
      return { isValid: false, error: "Age must be a valid number" };
    }
  }

  if (
    skills !== undefined &&
    !Array.isArray(skills) &&
    typeof skills !== "string"
  ) {
    return {
      isValid: false,
      error: "Skills must be an array or comma-separated string",
    };
  }

  if (about !== undefined && about.length > 500) {
    return { isValid: false, error: "About section is too long" };
  }

  return { isValid: true };
};

const validateEditPasswordData = (req) => {
  const allowedFields = ["password"];
  const bodyFields = Object.keys(req.user);
  const invalidFields = bodyFields.fillter(
    (field) => !allowedFields.includes(field),
  );
  if (invalidFields.length > 0) {
    return {
      isValid: false,
      error: `Invalid Fields : ${invalidFields.join(", ")}`,
    };
  }

  const { password } = req.body;

  if (
    !password ||
    !validator.isStrongPassword(password, {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 0,
      minNumbers: 1,
      minSymbols: 0,
    })
  ) {
    return { isValid: false, error: "Plz Provide a strong password " };
  }
  return { isValid: true };
};

module.exports = {
  validateSignUpData,
  validateLoginData,
  validateEditUserData,
};
