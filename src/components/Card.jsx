import React from "react";

const TablePersona = ({ documento, nombre, apellido, celular }) => (
  <div className="table-responsive">
    <table class="table table-bordered border-dark">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>Documento</th>
          <th>Celular</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{nombre}</td>
          <td>{apellido}</td>
          <td>{documento}</td>
          <td>{celular}</td>
        </tr>
      </tbody>
    </table>
  </div>
);

const Card = ({ solicitud, formik, volverATabla, error }) => (
  <form onSubmit={formik.handleSubmit} className="container pt-4">
    <div className="card text-center">
      <div className="card-header">Solicitud: {solicitud.id}</div>
      <div className="card-body background">
        <h5 className="card-title fw-bold">Datos de la Persona:</h5>
        <TablePersona
          documento={solicitud.persona.dni}
          nombre={solicitud.persona.nombre}
          apellido={solicitud.persona.apellido}
          celular={solicitud.persona.celular}
        />
        <p className="card-text">
          <p className="fs-5 fw-bold">Datos a Modificar:</p>
          <div className="container">
            <div className="row">
              <div className="col m-2">
                <label htmlFor="saludNombre" className="form-label">
                  Nombre
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="saludNombre"
                  onChange={formik.handleChange}
                  value={formik.values.saludNombre}
                />
              </div>
              <div className="col m-2">
                <label htmlFor="saludApellido" className="form-label">
                  Apellido
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="saludApellido"
                  onChange={formik.handleChange}
                  value={formik.values.saludApellido}
                />
              </div>
            </div>
            <div className="row">
              <div className="col m-2">
                <label htmlFor="saludDomicilio" className="form-label">
                  Domicilio
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="saludDomicilio"
                  onChange={formik.handleChange}
                  value={formik.values.saludDomicilio}
                />
              </div>
              <div className="col m-2">
                <label htmlFor="saludLocalidad" className="form-label">
                  Localidad (Lo hacemos un select?)
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="saludLocalidad"
                  onChange={formik.handleChange}
                  value={formik.values.saludLocalidad}
                />
              </div>
            </div>
            <div className="m-2">
              <label htmlFor="observaciones" className="form-label">
                Observaciones
              </label>
              <input
                type="text"
                className="form-control"
                id="observaciones"
                onChange={formik.handleChange}
                value={formik.values.observaciones}
              />
            </div>
            <div className="m-2">
              <label htmlFor="estado" className="form-label">
                Estado
              </label>
              <select
                className="form-select"
                id="estado"
                onChange={formik.handleChange}
                value={formik.values.estado}
              >
                <option selected>Seleccionar una opción</option>
                <option value={2}>Contactado</option>
                <option value={3}>No atiende</option>
                <option value={4}>No válido</option>
              </select>
            </div>
          </div>
        </p>
        {error && (
          <div class="alert alert-danger" role="alert">
            Error: Debes seleccionar una opción en Estado
          </div>
        )}
        <div className="d-flex justify-content-around">
          <button
            type="submit"
            className="btn btn-danger"
            onClick={volverATabla}
          >
            Volver
          </button>
          <button type="submit" className="btn btn-success">
            Guardar Solicitud
          </button>
        </div>
      </div>
      <div className="card-footer">Sistema Salud</div>
    </div>
  </form>
);

export default Card;
