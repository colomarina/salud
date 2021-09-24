import React from "react";
import { useTable } from "react-table";
import { useHistory } from "react-router-dom";
import { putSolicitud, getSolicitud } from "../services/axiosServices.mjs";
import { getUser } from "../services/userService";

const Table = ({ hisopados }) => {
  const data = React.useMemo(() => hisopados, [hisopados]);
  const history = useHistory();

  const tomarSolicitud = async (idSolicitud) => {
    const { user, token } = await getUser();
    const { data } = await getSolicitud(idSolicitud, token);
    if(!data.capturado_por) {
      const dataSolicitud = await putSolicitud(idSolicitud, {'capturado_por': user}, token);
      if(dataSolicitud.status === 200) history.push(`/solicitud/${idSolicitud}`)
      else console.log(dataSolicitud)
    } else {
      alert('Esta solicitud esta siendo contactada por otro operador, faltan estilos jajaj! ')
    }
  };

  const columns = React.useMemo(
    () => [
      {
        Header: "Documento",
        accessor: "documento", // accessor is the "key" in the data
      },
      {
        Header: "Nombre Completo",
        accessor: "nombreCompletoPersona",
      },
      {
        Header: "Es de riesgo?",
        accessor: "esDeRiesgo",
      },
      {
        Header: "Contato estrecho?",
        accessor: "contactoEstrecho",
      },
      {
        Header: "Falta de olfato/gusto?",
        accessor: "faltaOlfatoGusto",
      },
      {
        Header: "Tiene sintomas?",
        accessor: "tieneSintomas",
      },
      {
        Header: "Tomar Solicitud",
        accessor: "editar",
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <>
      <table {...getTableProps()} className="" style={{ border: "solid 1px blue" }}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  style={{
                    borderBottom: "solid 3px red",
                    background: "aliceblue",
                    color: "black",
                    fontWeight: "bold",
                    padding: "1rem",
                  }}
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  if (cell.column.Header === "Tomar Solicitud") {
                    return (
                      <td
                        {...cell.getCellProps()}
                        style={{
                          padding: "10px",
                          border: "solid 1px gray",
                          background: "papayawhip",
                        }}
                      >
                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={() => tomarSolicitud(cell.value)}
                        >
                          {cell.render("Cell")}
                        </button>
                      </td>
                    );
                  }
                  return (
                    <td
                      {...cell.getCellProps()}
                      style={{
                        padding: "10px",
                        border: "solid 1px gray",
                        background: "papayawhip",
                      }}
                    >
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default Table;
