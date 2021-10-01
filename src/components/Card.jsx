import React from "react";
import DataPerson, { DataPersonSalud } from "./DataPerson";
import FormPerson from "./FormPerson";

const Card = ({ solicitud, formik, volverATabla, error }) => (
  <form onSubmit={formik.handleSubmit} className="container-xl pt-2">
    <div className="alert alert-success text-center fw-bold" role="alert">
      Solicitud: {solicitud.id}
    </div>
    <div className="row">
      <div className="col-sm-4">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title fw-bold text-center">
              Datos de la Persona:
            </h5>
            <p className="card-text">
              <DataPerson
                documento={solicitud.persona.dni}
                nombre={solicitud.persona.nombre}
                apellido={solicitud.persona.apellido}
                celular={solicitud.persona.celular}
                domicilio={solicitud.persona.domicilio}
              />
            </p>
          </div>
        </div>
      </div>
      <div className="col-sm-4">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title fw-bold text-center">
              Ultima modificación:
            </h5>
            <p className="card-text">
              <DataPersonSalud
                documento={solicitud.persona.dni}
                nombre={solicitud.persona.saludNombre}
                apellido={solicitud.persona.saludApellido}
                domicilio={solicitud.persona.saludDomicilio}
                localidad={solicitud.persona.saludLocalidad}
                observaciones={solicitud.observaciones}
              />
            </p>
          </div>
        </div>
      </div>
      <div className="col-sm-4">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title fw-bold text-center">Datos a Modificar:</h5>
            <p className="card-text">
              <FormPerson formik={formik} error={error} />
            </p>
          </div>
        </div>
      </div>
    </div>
    {error && (
      <div class="alert alert-danger mt-2" role="alert">
        Error: Debes seleccionar una opción en Estado
      </div>
    )}
    <div className="alert alert-success mt-2" role="alert">
      <div className="d-flex justify-content-between align-items-center">
        <button type="submit" className="btn btn-danger" onClick={volverATabla}>
          Volver
        </button>
        <div className="fw-bold">
          Sistema Salud
        </div>
        <button type="submit" className="btn btn-success">
          Guardar Solicitud
        </button>
      </div>
    </div>
  </form>
);

export default Card;
