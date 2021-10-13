import React, { useEffect, useState } from "react";
import { formatDistance } from "date-fns";
import { es } from "date-fns/locale";
import TableWithFilters from "../components/TableWithFilters";
import { getContactados, traerHisopados } from "../services/axiosServices.mjs";
import { useHistory } from "react-router-dom";

const Inicio = () => {
  const [hisopados, setHisopados] = useState([]);
  const [recargar, setRecargar] = useState(false);
  const history = useHistory();

  setTimeout(() => {
    setRecargar(true);
  }, 50000);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      traerHisopados()
        .then(async ({ data }) => {
          const personas = await Promise.all(
            data.map(async (elemento) => {
              const fechaFormateada = formatDistance(
                new Date(elemento.created_at),
                new Date(),
                { addSuffix: true, locale: es }
              );
              const responseEstado = await getContactados(elemento.id, user.token);
              
              const nombreCompletoPersona = elemento.persona.saludNombre
                ? `${elemento.persona.saludNombre} ${elemento.persona.saludApellido}`
                : `${elemento.persona.nombre} ${elemento.persona.apellido}`;
              return {
                fechaSolicitud: fechaFormateada,
                idSolicitudHisopado: elemento.id,
                idPersona: elemento.persona.id,
                nombreCompletoPersona,
                documento: elemento.persona.dni,
                contactoEstrecho: elemento.p_contacto_estrecho ? `✔️` : `❌`,
                esDeRiesgo: elemento.p_es_riesgo ? `✔️` : `❌`,
                faltaOlfatoGusto: elemento.p_falta_olfato_gusto ? `✔️` : `❌`,
                tieneSintomas: elemento.p_tiene_sintomas ? `✔️` : `❌`,
                editar: {
                  // capturado_por: elemento.capturado_por.slice(0, -25),
                  estado: responseEstado.data[0] ?responseEstado.data[0].estado.id : 5,
                  capturado_por: elemento.capturado_por,
                  id: elemento.id,
                },
              };
            }).reverse()
          )
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
