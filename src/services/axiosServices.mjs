import axios from "axios";
import qs from "querystring";

const urlAuth = 'http://' + process.env.REACT_APP_URL + '/auth/local' ;
const urlPersona = 'http://' + process.env.REACT_APP_URL + '/personas';
const urlHisopados = 'http://' + process.env.REACT_APP_URL + '/solicitudes-hisopados' ;
const urlContactados = 'http://' + process.env.REACT_APP_URL + '/solicitudes-contactados' ;


// const identifier = "solicitud-hisopados@estebanecheverria.gob.ar";
const identifier = process.env.REACT_APP_DB_IDENTIFIER
const password = process.env.REACT_APP_DB_PASSWORD;

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
// POST A DB
const loginDB = () => axios({
  method: 'POST',
  url: urlAuth,
  data: qs.stringify({
    identifier,
    password
  }),
})
// GET A HISOPADOS
const traerHisopados = () => axios({
  method: 'GET',
  url: urlHisopados
})
// GET A HISOPADO/:ID
const getSolicitud = async (idSolicitud, token) => await axios({
  method: 'GET',
  headers: { Authorization: `Bearer ${token}` },
  url: `${urlHisopados}/${idSolicitud}`
})
// PUT A HISOPADO/:ID
const putSolicitud = async (idSolicitud, datosSolicitud, token) => await axios({
  method: 'PUT',
  headers: { Authorization: `Bearer ${token}` },
  url: `${urlHisopados}/${idSolicitud}`,
  data: datosSolicitud
})
// PUT A PERSONA/:ID
const putPersona = (idPersona, datosPersona, token) => axios({
  method: 'PUT',
  headers: { Authorization: `Bearer ${token}` },
  url: `${urlPersona}/${idPersona}`,
  data: datosPersona
})
// POST A CONTACTADOS
const postContactados = (datosContactados, token) => axios({
  method: 'POST',
  headers: { Authorization: `Bearer ${token}` },
  url: urlContactados,
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