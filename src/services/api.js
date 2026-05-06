import axios from "axios";

let API = null;

export const getAPIInstance = async () => {
  if (!API) {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
    API = axios.create({ baseURL: baseUrl });
  }
  return API;
};

export const tryLogin = async (credentials) => {
  const api = await getAPIInstance();
  const { data } = await api.post("/api/auth/login", credentials);
  return data;
};

export const fetchNoticias = async () => {
  const api = await getAPIInstance();
  const { data } = await api.get("/api/noticias-obtener");
  return data;
};

export const fetchUltimasNoticias = async () => {
  const api = await getAPIInstance();
  const { data } = await api.get("/api/ultimas-noticias-obtener");
  return data;
};
export const fetchNoticiaById = async (id) => {
  const api = await getAPIInstance();
  const { data } = await api.get(`/api/noticia-obtener/${id}`);
  return data;
};

export const fetchEventos = async () => {
  const api = await getAPIInstance();
  const { data } = await api.get("/api/eventos-obtener");
  return data;
};

export const fetchPagos = async (id) => {
  const api = await getAPIInstance();
  const { data } = await api.get(`/api/pagos-usuario-obtener/${id}`, {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("authToken")}`
    }
  });
  return data;
};

export const fetchRoles = async () => {
  const api = await getAPIInstance();
  const { data } = await api.get("/api/roles-obtener");
  return data;
};

export const obtenerSocio = async (dni) => {
  try {
    const api = await getAPIInstance();
    const response = await api.get(`/api/socio-obtener/${dni}`);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.error || "Error al obtener la información del socio"
    );
  }
};

export const fetchSocios = async () => {
  const api = await getAPIInstance();
  const { data } = await api.get("/api/socios-obtener", {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("authToken")}`
    }
  });
  return data;
};

export const fetchPeleadoresActivos = async () => {
  const api = await getAPIInstance();
  const { data } = await api.get("/api/peleadores-activos-obtener", {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("authToken")}`
    }
  });
  return data;
}

export const fetchInfoInscripcion = async (ids) => {
  const api = await getAPIInstance();
  const { data } = await api.post("/api/info-inscripcion-obtener", ids, {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("authToken")}`
    }
  });
  return data;
}

//#region CRUD Socios
export const crearSocio = async (socio) => {
  const api = await getAPIInstance();
  const { data } = await api.post("/api/socio-crear", socio, {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("authToken")}`
    }
  });
  return data;
};

export const actualizarSocio = async (socio) => {
  const api = await getAPIInstance();
  const { data } = await api.put("/api/socio-modificar/" + socio.id, socio, {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("authToken")}`
    }
  });
  return data;
};

export const eliminarSocio = async (id) => {
  const api = await getAPIInstance();
  const { data } = await api.delete(`/api/socio-eliminar/${id}`, {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("authToken")}`
    }
  });
  return data;
};
//#endregion

//#region CRUD Eventos
export const crearEvento = async (evento) => {
  const api = await getAPIInstance();
  const { data } = await api.post("/api/evento-crear", evento, {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("authToken")}`
    }
  });
  return data;
};

export const actualizarEvento = async (evento) => {
  const api = await getAPIInstance();
  const { data } = await api.put("/api/evento-modificar/" + evento.id, evento, {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("authToken")}`
    }
  });
  return data;
};

export const eliminarEvento = async (id) => {
  const api = await getAPIInstance();
  const { data } = await api.delete(`/api/evento-eliminar/${id}`, {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("authToken")}`
    }
  });
  return data;
};
//#endregion

//#region CRUD Pagos
export const crearPago = async (pago) => {
  const api = await getAPIInstance();
  const { data } = await api.post("/api/pago-crear", pago, {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("authToken")}`
    }
  });
  return data;
};

export const actualizarPago = async (pago) => {
  const api = await getAPIInstance();
  const { data } = await api.put("/api/pago-modificar/" + pago.id, pago, {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("authToken")}`
    }
  });
  return data;
};

export const eliminarPago = async (id) => {
  const api = await getAPIInstance();
  const { data } = await api.delete(`/api/pago-eliminar/${id}`, {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("authToken")}`
    }
  });
  return data;
};
//#endregion

//#region CRUD Sedes
export const crearSede = async (sede) => {
  const api = await getAPIInstance();
  const { data } = await api.post("/api/sede-crear", sede, {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("authToken")}`
    }
  });
  return data;
};

export const actualizarSede = async (sede) => {
  const api = await getAPIInstance();
  const { data } = await api.put("/api/sede-modificar/" + sede.id, sede, {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("authToken")}`
    }
  });
  return data;
};

export const eliminarSede = async (id) => {
  const api = await getAPIInstance();
  const { data } = await api.delete(`/api/sede-eliminar/${id}`, {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("authToken")}`
    }
  });
  return data;
};

export const fetchSedes = async () => {
  const api = await getAPIInstance();
  const { data } = await api.get("/api/sedes-obtener");
  return data;
};

//#endregion

//#region CRUD Noticias
export const crearNoticia = async (noticia) => {
  const api = await getAPIInstance();
  const { data } = await api.post("/api/noticia-crear", noticia, {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("authToken")}`
    }
  });
  return data;
};

export const actualizarNoticia = async (noticia) => {
  const api = await getAPIInstance();
  const { data } = await api.put("/api/noticia-modificar/" + noticia.id, noticia, {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("authToken")}`
    }
  });
  return data;
};

export const eliminarNoticia = async (id) => {
  const api = await getAPIInstance();
  const { data } = await api.delete(`/api/noticia-eliminar/${id}`, {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("authToken")}`
    }
  });
  return data;
};
//#endregion

//#region CRUD Roles
export const crearRol = async (rol) => {
  const api = await getAPIInstance();
  const { data } = await api.post("/api/rol-crear", rol, {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("authToken")}`
    }
  });
  return data;
};

export const actualizarRol = async (rol) => {
  const api = await getAPIInstance();
  const { data } = await api.put("/api/rol-modificar/" + rol.id, rol, {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("authToken")}`
    }
  });
  return data;
};

export const eliminarRol = async (id) => {
  const api = await getAPIInstance();
  const { data } = await api.delete(`/api/rol-eliminar/${id}`, {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("authToken")}`
    }
  });
  return data;
};
//#endregion