import React, { useState } from "react";
import { useFormik } from "formik";
import { loginInstitucional, loginDB } from "../services/axiosServices.mjs";
import { useHistory } from "react-router-dom";
import { setToken } from "../services/axiosServices.mjs";
import Loading from "../components/Loading";

const Login = () => {
  const [mostrarLoading, setMostrarLoading] = useState(false);
  const history = useHistory();

  const formik = useFormik({
    initialValues: {
      user: "",
      pass: "",
    },
    onSubmit: ({ user, pass }) => {
      setMostrarLoading(true);
      loginInstitucional({ user, pass })
        .then((response) => {
          if (response.status === 200) {
            loginDB()
              .then(({ data }) => {
                window.localStorage.setItem(
                  "loggedUser",
                  JSON.stringify({
                    user,
                    token: data.jwt,
                  })
                );
                setToken(data.jwt);
                history.push(`/inicio`);
              })
              .catch((error) => {
                console.log(error);
              });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  });
  return (
    <>
      <div className="container">
        <form onSubmit={formik.handleSubmit}>
          <div className="card m-5">
            <div className="card-header">Sistema Salud COVID-19 </div>
            <div className="card-body background">
              {mostrarLoading ? (
                <div className="d-flex justify-content-center align-items-center">
                  <Loading type="spin" color="#000000" className="" />
                </div>
              ) : (
                <>
                  <div class="form-floating mb-3">
                    <input
                      type="email"
                      className="form-control "
                      id="user"
                      placeholder="name@example.com"
                      onChange={formik.handleChange}
                      value={formik.values.user}
                    />
                    <label for="user">Mail institucional</label>
                  </div>
                  <div class="form-floating mb-3">
                    <input
                      type="password"
                      className="form-control "
                      id="pass"
                      placeholder="Password"
                      onChange={formik.handleChange}
                      value={formik.values.pass}
                    />
                    <label for="pass">Password</label>
                  </div>
                  <div className="d-flex justify-content-center">
                    <button type="submit" className="btn btn-success">
                      Iniciar Sesion
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
