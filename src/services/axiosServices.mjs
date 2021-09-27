import axios from "axios";
import qs from "querystring";

const identifier = "solicitud-hisopados@estebanecheverria.gob.ar";
const password = "123456789";

let token = null;

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getToken = () => token;

const loginInstitucional = ({user, pass}) => axios({
  method: 'POST',
  url: 'https://estebanecheverria.gob.ar:2096/login/?login_only=1',
  data: qs.stringify({
    user,
    pass
  }),
})

const loginDB = () => axios({
  method: 'POST',
  url: 'http://209.13.149.170:443/auth/local',
  data: qs.stringify({
    identifier,
    password
  }),
})

const traerHisopados = () => axios({
  method: 'GET',
  url: 'http://209.13.149.170:443/solicitudes-hisopados'
})

const getSolicitud = async (idSolicitud, token) => await axios({
  method: 'GET',
  headers: { Authorization: `Bearer ${token}` },
  url: `http://209.13.149.170:443/solicitudes-hisopados/${idSolicitud}`
})

const putSolicitud = async (idSolicitud, datosSolicitud, token) => await axios({
  method: 'PUT',
  headers: { Authorization: `Bearer ${token}` },
  url: `http://209.13.149.170:443/solicitudes-hisopados/${idSolicitud}`,
  data: datosSolicitud
})

const putPersona = (idPersona, datosPersona, token) => axios({
  method: 'PUT',
  headers: { Authorization: `Bearer ${token}` },
  url: `http://209.13.149.170:443/personas/${idPersona}`,
  data: datosPersona
})

const postContactados = (datosContactados, token) => axios({
  method: 'POST',
  headers: { Authorization: `Bearer ${token}` },
  url: `http://209.13.149.170:443/solicitudes-contactados`,
  data: datosContactados
})

export {
  setToken,
  getToken,
  loginInstitucional,
  loginDB,
  traerHisopados,
  getSolicitud,
  putSolicitud,
  putPersona,
  postContactados
};