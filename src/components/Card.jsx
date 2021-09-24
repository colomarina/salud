import React from "react";

const Card = ({ solicitud, formik }) => (
  <form onSubmit={formik.handleSubmit} className="container">
    <div className="card text-center">
      <div className="card-header">Solicitud: {solicitud.id}</div>
      <div className="card-body">
        <h5 className="card-title">{`${solicitud.persona.nombre} ${solicitud.persona.apellido}`}</h5>
        <p className="card-text">
          <div className="container">
            <div className="row">
              <div className="col">
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
              <div className="col">
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
              <div className="col">
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
              <div className="col">
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
        </p>
        <button type="submit" className="btn btn-primary">
          Guardar
        </button>
      </div>
      <div className="card-footer text-muted">Sistema Salud</div>
    </div>
  </form>
);

export default Card;
