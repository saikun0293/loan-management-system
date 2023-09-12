import { Container, Text } from "@mantine/core"
import { useFormik } from "formik"
import * as Yup from "yup"

type Gender = "Male" | "Female" | "Prefer not to say"

// todo : generate user_id
interface User {
  user_id: string
  name: string
  designation: string
  dob: Date
  doj: Date
  gender: Gender
  dept: string
  password: string
}

const AddUser: React.FC = () => {
  // TODO: Fetch departments and designations from backend

  const formik = useFormik<User>({
    initialValues: {
      user_id: "",
      name: "",
      designation: "",
      dob: new Date(),
      doj: new Date(),
      gender: "Male",
      dept: "",
      password: "",
    },
    validationSchema: Yup.object({
      user_id: Yup.string()
        .min(5, "User id must contain atleast 5 characters")
        .max(10, "User id cannot exceed 10 characters")
        .required("Please enter your user id"),
      designation: Yup.string().required("Designation cannot be empty"),
      dob: Yup.date().required("Please select your date of birth"),
      doj: Yup.date().required("Please select your date of joining"),
      gender: Yup.string().required("Please select your gender"),
      dept: Yup.string().required("Department cannot be empty"),
      password: Yup.string()
        .matches(
          /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
          "Password must contain at least 8 characters, one uppercase, one number and one special case character"
        )
        .required("Please enter your password"),
    }),
    onSubmit: (values) => {
      console.log("Created user", values)
    },
  })

  console.log(formik)

  return (
    <Container>
      <Text component="h1" size={40}>
        Customer Master Data Details
      </Text>
    </Container>
  )
}

export default AddUser
