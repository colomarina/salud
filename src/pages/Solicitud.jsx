import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useFormik } from "formik";
import { useHistory } from "react-router-dom";
import Card from "../components/Card";
import {
  getSolicitud,
  putSolicitud,
  postContactados,
  putPersona,
} from "../services/axiosServices.mjs";

const Solicitud = () => {
  const [solicitud, setSolicitud] = useState();
  const [showMessageError, setShowMessageError] = useState(false);
  const history = useHistory();
  const { idSolicitud } = useParams();
  const [user, setUser] = useState();

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      getSolicitud(idSolicitud, user.token)
        .then((data) => {
          setSolicitud(data.data)
        })
        .catch((error) => {
          console.log("Error:", error);
        });
    } else {
      history.push(`/`);
    }
  }, [history, idSolicitud]);

  const volverATabla = () => {
    const sacarCaptura = {
      capturado_por: "",
    };
    putSolicitud(solicitud.id, sacarCaptura, user.token)
      .then(() => {
        history.push("/inicio");
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  };

  const formik = useFormik({
    initialValues: {
      saludNombre: "",
      saludApellido: "",
      saludDomicilio: "",
      saludLocalidad: "",
      observaciones: "",
      estado: "",
    },
    onSubmit: (values) => {
      const {
        saludNombre,
        saludApellido,
        saludDomicilio,
        saludLocalidad,
        observaciones,
        estado
      } = values;
      if(estado && estado !== 'Seleccionar una opción'){
        setShowMessageError(false)
        // Guardo en Persona los datos modificados
        putPersona(
          solicitud.persona.id,
          {
            saludNombre,
            saludApellido,
            saludDomicilio,
            saludLocalidad,
          },
          user.token
        )
          .then(() => {
            const nuevaObservacion = {
              observaciones: observaciones,
              capturado_por: "",
            };
            // Guardo las observaciones y libero la captura
            putSolicitud(solicitud.id, nuevaObservacion, user.token)
              .then(() => {
                const nuevoContactado = {
                  estado,
                  operador: user.user,
                  solicitud: solicitud.id,
                  observaciones: observaciones,
                };
                // Guardo el contacto
                postContactados(nuevoContactado, user.token)
                  .then(() => history.push(`/inicio`))
                  .catch((error) => {
                    console.log("Error:", error);
                  });
              })
              .catch((error) => {
                console.log("Error:", error);
              });
          })
          .catch((error) => {
            console.log("Error:", error);
          });
      } else {
        setShowMessageError(true)
      }
    },
  });
  return (
    <>
      {solicitud && (
        <Card
          solicitud={solicitud}
          formik={formik}
          volverATabla={volverATabla}
          error={showMessageError}
        />
      )}
    </>
  );
};

export default Solicitud;
