const Input = ({ value, name }) => (
  <div className="form-floating">
    <input type="text" className="form-control" id={name} disabled value={value} />
    <label className="text-capitalize" for={name}>
      {name}
    </label>
  </div>
);

const DataPerson = ({ documento, celular, nombre, apellido, domicilio }) => (
  <>
    <div className="row mt-3">
      <div className="col-md">
        <Input value={nombre} name="nombre" />
      </div>
      <div className="col-md">
        <Input value={apellido} name="apellido" />
      </div>
    </div>
    <div className="row mt-3">
      <div className="col-md">
        <Input value={documento} name="documento" />
      </div>
      <div className="col-md">
        <Input value={celular} name="celular" />
      </div>
    </div>
    <div className="row mt-3">
      <div className="col-md">
        <Input value={domicilio} name="domicilio" />
      </div>
    </div>
  </>
);

export const DataPersonSalud = ({
  documento,
  nombre,
  apellido,
  domicilio,
  localidad,
  observaciones,
}) => (
  <>
    <div className="row mt-3">
      <div className="col-md">
        <Input value={nombre} name="nombre" />
      </div>
      <div className="col-md">
        <Input value={apellido} name="apellido" />
      </div>
    </div>
    <div className="row mt-3">
      <div className="col-md">
        <Input value={documento} name="documento" />
      </div>
      <div className="col-md">
        <Input value={localidad} name="localidad" />
      </div>
    </div>
    <div className="row mt-3">
      <div className="col-md">
        <Input value={domicilio} name="domicilio" />
      </div>
    </div>
    <div className="row mt-3">
      <div className="col-md">
        <div className="form-floating">
          <textarea
            className="form-control"
            id="observaciones"
            disabled
            value={observaciones}
          />
          <label htmlFor="observaciones">Observaciones</label>
        </div>
      </div>
    </div>
  </>
);

export default DataPerson;
