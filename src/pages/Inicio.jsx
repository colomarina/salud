import React, { useEffect, useState } from "react";
import TableWithFilters from "../components/TableWithFilters";
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
              contactoEstrecho: elemento.p_contacto_estrecho ? `✔️` : `❌`,
              esDeRiesgo: elemento.p_es_riesgo ? `✔️` : `❌`,
              faltaOlfatoGusto: elemento.p_falta_olfato_gusto ? `✔️` : `❌`,
              tieneSintomas: elemento.p_tiene_sintomas ? `✔️` : `❌`,
              editar: {
                capturado_por: elemento.capturado_por.slice(0, -25),
                id: elemento.id
              },
            };
          });
          setHisopados(personas);
          setRecargar(false);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      history.push(`/`);
    }
  }, [history, recargar]);
  return (
    <div className="background">
      <div className="table-responsive">
        <TableWithFilters hisopados={hisopados} />
      </div>
    </div>
  );
};

export default Inicio;
