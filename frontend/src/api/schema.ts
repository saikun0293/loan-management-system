import * as Yup from "yup"
import { ageInYears } from "./utils"

export const loginSchema = Yup.object({
  username: Yup.string().required("*Required"),
  password: Yup.string().required("*Required"),
})

export const loanFormSchema = Yup.object({
  loanType: Yup.string().required("Loan type cannot be empty"),
  duration: Yup.number()
    .min(1, "Duration cannot be lesser than 1")
    .required("Duration field cannot be empty"),
})

export const itemFormSchema = Yup.object({
  category: Yup.string().required("Category field cannot be empty"),
  name: Yup.string().required("Item description cannot be be empty"),
  value: Yup.number().min(1, "Item can't be for free"),
  issueStatus: Yup.boolean(),
  make: Yup.string(),
})

export const userFormSchema = Yup.object({
  name: Yup.string()
    .matches(/^[a-zA-Z ]+$/, "Name can only contain alphabets")
    .required("Please enter your name"),
  designation: Yup.string().required("Designation cannot be empty"),
  dob: Yup.date().test(
    "dob",
    "Should be at least 21 years of age",
    (value) => ageInYears(value!) >= 21
  ),
  doj: Yup.date().required("Date of joining cannot be empty"),
  gender: Yup.string().required("Please select your gender"),
  dept: Yup.string().nonNullable().required("Department cannot be empty"),
  password: Yup.string()
    .matches(
      /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      "Password must contain at least 8 characters, one uppercase, one number and one special case character"
    )
    .required("Please enter your password"),
})

export const loanApplicationSchema = Yup.object({
  employeeId: Yup.string().required("Employee Id cannot be empty"),
  itemId: Yup.string(),
})
