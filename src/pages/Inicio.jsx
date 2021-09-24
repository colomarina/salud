import React, { useEffect, useState } from "react";
import Table from "../components/Table";
import { traerHisopados } from "../services/axiosServices.mjs";
import { useHistory } from "react-router-dom";

const Inicio = () => {
  const [hisopados, setHisopados] = useState([]);
  const [recargar, setRecargar] = useState(false);
  const history = useHistory();

  setTimeout(() => {
    setRecargar(true);
  }, 300000);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      traerHisopados()
        .then(({ data }) => {
          const personas = data.map((elemento) => {
            return {
              idSolicitudHisopado: elemento.id,
              idPersona: elemento.persona.id,
              nombreCompletoPersona: `${elemento.persona.nombre} ${elemento.persona.apellido}`,
              documento: elemento.persona.dni,
              contactoEstrecho: elemento.p_contacto_estrecho
                ? "Verdadero"
                : "Falso",
              esDeRiesgo: elemento.p_es_riesgo ? "Verdadero" : "Falso",
              faltaOlfatoGusto: elemento.p_falta_olfato_gusto
                ? "Verdadero"
                : "Falso",
              tieneSintomas: elemento.p_tiene_sintomas ? "Verdadero" : "Falso",
              editar: elemento.id,
            };
          });
          setHisopados(personas);
          setRecargar(false);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      history.push(`/`)
    }
  }, [recargar]);
  return (
    <div className="container">
      <Table hisopados={hisopados} />
    </div>
  );
};

export default Inicio;
