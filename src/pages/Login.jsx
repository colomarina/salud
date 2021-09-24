import React from "react";
import { useFormik } from "formik";
import { loginInstitucional, loginDB } from "../services/axiosServices.mjs";
import { useHistory } from "react-router-dom";
import { setToken } from "../services/axiosServices.mjs";

const Login = () => {
  const history = useHistory();
  const formik = useFormik({
    initialValues: {
      user: "",
      pass: "",
    },
    onSubmit: ({ user, pass }) => {
      loginInstitucional({ user, pass })
        .then((response) => {
          if (response.status === 200) {
            loginDB()
              .then(({ data }) => {
                window.localStorage.setItem(
                  'loggedUser', JSON.stringify({
                    user,
                    token: data.jwt
                  })
                )
                setToken(data.jwt)
                history.push(`/inicio`)
              })
              .catch((error) => {
                console.log(error);
              });
          }
        })
        .catch((error) => {
          const e = {
            status: error.response.status,
            statusMessage: error.response.statusText,
          };
          console.log(e);
        });
    },
  });
  return (
    <>
      <div className="container">
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-3">
            <label htmlFor="user" className="form-label">
              Mail institucional
            </label>
            <input
              type="email"
              className="form-control"
              id="user"
              aria-describedby="user"
              onChange={formik.handleChange}
              value={formik.values.user}
            />
            {/* <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div> */}
          </div>
          <div className="mb-3">
            <label htmlFor="pass" className="form-label">
              Contraseña
            </label>
            <input
              type="password"
              className="form-control"
              id="pass"
              onChange={formik.handleChange}
              value={formik.values.pass}
            />
          </div>
          <button type="submit" className="btn btn-success">
            Iniciar Sesion
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
