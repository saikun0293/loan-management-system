import { FC } from "react";
import { Grid } from "@mantine/core";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

export interface Credentials {
  username: string;
  password: string;
}

interface LoginProps {
  name: string;
  onLogin: (values: Credentials) => void;
}

const Login: FC<LoginProps> = ({ name, onLogin }) => {
  return (
    <Grid>
      <h1>{name}</h1>
      <Formik<Credentials>
        initialValues={{
          username: "",
          password: "",
        }}
        validationSchema={Yup.object({
          username: Yup.string().required("*Required"),
          password: Yup.string().required("*Required"),
        })}
        onSubmit={(values) => {
          onLogin(values);
        }}
      >
        <Form>
          <div>
            <label htmlFor="username">Username</label>
            <Field name="username" type="password" />
            <ErrorMessage
              name="username"
              render={(msg: string) => <div>{msg}</div>}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <Field name="password" type="password" />
            <ErrorMessage
              name="password"
              render={(msg: string) => <div>{msg}</div>}
            />
          </div>
        </Form>
      </Formik>
    </Grid>
  );
};

export default Login;
