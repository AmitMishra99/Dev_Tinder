const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { defaultPhotoURL } = require("../utils/constant");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      minLength: 2,
      maxLength: 25,
      trim: true,
      required: true,
      validate: {
        validator: function (value) {
          return value.length > 0;
        },
        message: "First name cannot be empty",
      },
    },
    lastName: {
      type: String,
      minLength: 2,
      maxLength: 25,
      trim: true,
    },
    emailID: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
      required: true,
      validate: {
        validator: validator.isEmail,
        message: "Invalid Email Format !!",
      },
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      select: false,
      validate: {
        validator: (value) =>
          validator.isStrongPassword(value, {
            minLength: 8,
            minLowercase: 1,
            minUppercase: 0,
            minNumbers: 1,
            minSymbols: 0,
          }),
        message: "Plz Enter a Strong password !!",
      },
    },
    age: {
      type: Number,
      min: 0,
      max: 120,
      default: 27,
    },
    gender: {
      type: String,
      enum: ["male", "female", "others"],
      lowercase: true,
      default: "others",
    },
    photoURL: {
      type: String,
      validate: {
        validator: (value) => !value || validator.isURL(value),
        message: "Invalid URL",
      },
      default: defaultPhotoURL,
    },
    skills: {
      type: [String],
      validate: {
        validator: (arr) => !arr || arr.length <= 20,
        message: "Max only 10 skills allowed",
      },
      default: ["ReactJS", "Javascript"],
    },
    about: {
      type: String,
      minLength: 2,
      maxLength: 125,
      trim: true,
      default: "I'm new on DevTinder !!",
    },
    lastSeen: {
      type: Date,
      default: Date.now,
    },
    isOnline: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.methods.getJWT = function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

userSchema.methods.passwordValid = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.index({ firstName: 1, lastName: 1 });

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

module.exports = mongoose.model("User", userSchema);
