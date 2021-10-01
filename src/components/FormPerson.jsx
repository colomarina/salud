const Input = ({ value, id, name, onChange }) => (
  <div class="form-floating">
    <input
      type="text"
      class="form-control"
      id={id}
      value={value}
      onChange={onChange}
    />
    <label className="text-capitalize" for={id}>
      {name}
    </label>
  </div>
);

const FormPerson = ({ formik, error }) => (
  <>
    <div className="row mt-3">
      <div class="col-md">
        <Input
          id="saludNombre"
          name="Salud Nombre"
          value={formik.values.saludNombre}
          onChange={formik.handleChange}
          />
      </div>
      <div class="col-md">
        <Input
          id="saludApellido"
          name="Salud Apellido"
          value={formik.values.saludApellido}
          onChange={formik.handleChange}
          />
      </div>
    </div>
    <div className="row mt-3">
      <div class="col-md">
        <Input
          id="saludDomicilio"
          name="Salud Domicilio"
          value={formik.values.saludDomicilio}
          onChange={formik.handleChange}
          />
      </div>
      <div class="col-md">
        <Input
          id="saludLocalidad"
          name="Salud Localidad"
          value={formik.values.saludLocalidad}
          onChange={formik.handleChange}
        />
      </div>
    </div>
    <div className="row mt-3">
      <div class="col-md">
        <Input
          id="observaciones"
          name="Observaciones"
          value={formik.values.observaciones}
          onChange={formik.handleChange}
        />
      </div>
    </div>
    <div className="row mt-3">
      <div className="col-md">
        <div class="col-md">
          <div class="form-floating">
            <select
              class="form-select"
              id="estado"
              value={formik.values.estado}
              onChange={formik.handleChange}
            >
              <option selected>Seleccionar una opción</option>
              <option value={2}>Contactado</option>
              <option value={3}>No atiende</option>
              <option value={4}>No válido</option>
            </select>
            <label htmlFor="estado">Estado</label>
          </div>
        </div>
      </div>
    </div>
  </>
);

export default FormPerson;
