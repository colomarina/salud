import React from "react";

const Card = ({ solicitud, formik, volverATabla }) => (
  <form onSubmit={formik.handleSubmit} className="container pt-4">
    <div className="card text-center">
      <div className="card-header">Solicitud: {solicitud.id}</div>
      <div className="card-body background">
        <h5 className="card-title">
          Nombre: {`${solicitud.persona.nombre} ${solicitud.persona.apellido}`}
        </h5>
        <p className="card-text">
          <p className="fs-5 fw-bold">Datos a modificar:</p>
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
          </div>
        </p>
        <div className="d-flex justify-content-around">
          <button type="submit" className="btn btn-danger" onClick={volverATabla}>
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
