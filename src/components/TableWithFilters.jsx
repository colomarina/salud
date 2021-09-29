import React from "react";
import { useTable, useFilters, useGlobalFilter } from "react-table";
import { matchSorter } from "match-sorter";
import { useHistory } from "react-router-dom";
import { putSolicitud, getSolicitud } from "../services/axiosServices.mjs";
import { getUser } from "../services/userService";

// Define a default UI for filtering
function DefaultColumnFilter({
  column: { filterValue, preFilteredRows, setFilter },
}) {
  return (
    <input
      className="form-control"
      value={filterValue || ""}
      onChange={(e) => {
        setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
      }}
      placeholder={`Buscar...`}
    />
  );
}

// This is a custom filter UI for selecting
// a unique option from a list
function SelectColumnFilter({
  column: { filterValue, setFilter, preFilteredRows, id },
}) {
  // Calculate the options for filtering
  // using the preFilteredRows
  const options = React.useMemo(() => {
    const options = new Set();
    preFilteredRows.forEach((row) => {
      options.add(row.values[id]);
    });
    return [...options.values()];
  }, [id, preFilteredRows]);

  // Render a multi-select box
  return (
    <select
      className="form-control"
      value={filterValue}
      onChange={(e) => {
        setFilter(e.target.value || undefined);
      }}
    >
      <option value="">Seleccionar...</option>
      {options.map((option, i) => (
        <option key={i} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}

function fuzzyTextFilterFn(rows, id, filterValue) {
  return matchSorter(rows, filterValue, { keys: [(row) => row.values[id]] });
}

// Let the table remove the filter if the string is empty
fuzzyTextFilterFn.autoRemove = (val) => !val;

// Our table component
function Table({ columns, data }) {
  const history = useHistory();
  const tomarSolicitud = async (idSolicitud) => {
    const { user, token } = await getUser();
    const { data } = await getSolicitud(idSolicitud, token);
    if (!data.capturado_por) {
      const dataSolicitud = await putSolicitud(
        idSolicitud,
        { capturado_por: user },
        token
      );
      if (dataSolicitud.status === 200)
        history.push(`/solicitud/${idSolicitud}`);
      else console.log(dataSolicitud);
    } else {
      alert(
        "Esta solicitud esta siendo contactada por otro operador, faltan estilos jajaj! "
      );
    }
  };
  const filterTypes = React.useMemo(
    () => ({
      // Add a new fuzzyTextFilterFn filter type.
      fuzzyText: fuzzyTextFilterFn,
      // Or, override the default text filter to use
      // "startWith"
      text: (rows, id, filterValue) => {
        return rows.filter((row) => {
          const rowValue = row.values[id];
          return rowValue !== undefined
            ? String(rowValue)
                .toLowerCase()
                .startsWith(String(filterValue).toLowerCase())
            : true;
        });
      },
    }),
    []
  );

  const defaultColumn = React.useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: DefaultColumnFilter,
    }),
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data,
        defaultColumn, // Be sure to pass the defaultColumn option
        filterTypes,
      },
      useFilters, // useFilters!
      useGlobalFilter // useGlobalFilter!
    );

  // We don't want to render all of the rows for this example, so cap
  // it for this use case
  const firstPageRows = rows.slice(0, 10);

  return (
    <>
      <table className="table table-bordered" {...getTableProps()}>
        <thead className="table-dark">
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>
                  <div className="col text-center">{column.render("Header")}</div>
                  <div className="col">
                    {column.canFilter ? column.render("Filter") : null}
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="table-success" {...getTableBodyProps()}>
          {firstPageRows.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  if (cell.column.Header === "Tomar Solicitud") {
                    if(!cell.value.capturado_por){
                      return (
                        <td {...cell.getCellProps()}>
                          <div className="d-grid gap-2">
                            <button
                              type="button"
                              className="btn btn-success"
                              onClick={() => tomarSolicitud(cell.value.id)}
                            >
                              Solicitud: {cell.value.id}
                            </button>
                          </div>
                        </td>
                      );
                    } else {
                      return (
                        <td {...cell.getCellProps()}>
                          <div className="d-grid gap-2">
                            <button
                              type="button"
                              className="btn btn-warning"
                              disabled
                            >
                              Tomada por: {cell.value.capturado_por}
                            </button>
                          </div>
                        </td>
                      );

                    }
                  }
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <br />
    </>
  );
}

// Define a custom filter filter function!
function filterGreaterThan(rows, id, filterValue) {
  return rows.filter((row) => {
    const rowValue = row.values[id];
    return rowValue >= filterValue;
  });
}

// This is an autoRemove method on the filter function that
// when given the new filter value and returns true, the filter
// will be automatically removed. Normally this is just an undefined
// check, but here, we want to remove the filter if it's not a number
filterGreaterThan.autoRemove = (val) => typeof val !== "number";

const TableWithFilters = ({ hisopados }) => {
  const columns = React.useMemo(
    () => [
      {
        Header: "Persona",
        columns: [
          {
            Header: "Documento",
            accessor: "documento",
          },
          {
            Header: "Nombre Completo",
            accessor: "nombreCompletoPersona",
            filter: "fuzzyText",
          },
        ],
      },
      {
        Header: "Sintomas",
        columns: [
          {
            Header: "Es de riesgo?",
            accessor: "esDeRiesgo",
            Filter: SelectColumnFilter,
            filter: "includes",
          },
          {
            Header: "Contato estrecho?",
            accessor: "contactoEstrecho",
            Filter: SelectColumnFilter,
            filter: "includes",
          },
          {
            Header: "Falta de olfato/gusto?",
            accessor: "faltaOlfatoGusto",
            Filter: SelectColumnFilter,
            filter: "includes",
          },
          {
            Header: "Tiene sintomas?",
            accessor: "tieneSintomas",
            Filter: SelectColumnFilter,
            filter: "includes",
          },
          {
            Header: "Tomar Solicitud",
            accessor: "editar",
            Filter: "",
            filter: "includes",
          },
        ],
      },
    ],
    []
  );

  // const data = React.useMemo(() => makeData(10), []);
  const data = React.useMemo(() => hisopados, [hisopados]);

  return <Table columns={columns} data={data} />;
};

export default TableWithFilters;
