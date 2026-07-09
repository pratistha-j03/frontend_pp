const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4200';

const getToken = () => localStorage.getItem('pp_admin_token');

const authHeaders = () => {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}; 

//public routes
export const fetchBanners = async () => {
  const res = await fetch(`${BASE_URL}/admin/banner`);
  return res.json();
};

export const sendContactMessage = async (formData) => {
  const res = await fetch(`${BASE_URL}/api/contact`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });
  return res.json();
};

export const fetchServices = async () => {
  const res = await fetch(`${BASE_URL}/admin/service`);
  return res.json();
};

//admin auth routes
export const loginAdmin = async (email, password) => {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  return res.json();
};

export const fetchMe = async () => {
  const res = await fetch(`${BASE_URL}/auth/me`, {
    headers: { ...authHeaders() },
  });
  return res.json();
};

export const fetchAdmins = async () => {
  const res = await fetch(`${BASE_URL}/auth/admins`, {
    headers: { ...authHeaders() },
  });
  return res.json();
};

export const createAdminUser = async ({ name, email, password }) => {
  const res = await fetch(`${BASE_URL}/auth/admins`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify({ name, email, password }),
  });
  return res.json();
};

export const deleteAdminUser = async (id) => {
  const res = await fetch(`${BASE_URL}/auth/admins/${id}`, {
    method: 'DELETE',
    headers: { ...authHeaders() },
  });
  return res.json();
};


//admin (protected) routes
export const uploadBannerImage = async (formData) => {
  const res = await fetch(`${BASE_URL}/admin/banner/upload`, {
    method: 'POST',
    headers: {...authHeaders()},
    body: formData 
  });
  return res.json();
};

export const deleteBannerImage = async (index) => {
  const res = await fetch(`${BASE_URL}/admin/banner/${index}`, {
    method: 'DELETE',
    headers: {...authHeaders()}
  });
  return res.json();
};

export const createService = async (formData) => {
  const res = await fetch(`${BASE_URL}/admin/service`, {
    method: 'POST',
    headers: {...authHeaders()},
    body: formData
  });
  return res.json();
};

export const updateService = async (id, formData) => {
  const res = await fetch(`${BASE_URL}/admin/service/${id}`, {
    method: 'PUT',
    headers: {...authHeaders()},
    body: formData
  });
  return res.json();
};

export const deleteService = async (id) => {
  const res = await fetch(`${BASE_URL}/admin/service/${id}`, {
    method: 'DELETE',
    headers: {...authHeaders()}
  });
  return res.json();
};
 
export const fetchContactMessages = async () => {
  const res = await fetch(`${BASE_URL}/admin/contact`, {
    headers: {...authHeaders()}
  });
  return res.json();
};
 
export const markContactMessageRead = async (id) => {
  const res = await fetch(`${BASE_URL}/admin/contact/${id}/read`, {
    method: 'PUT',
    headers: {...authHeaders()}
  });
  return res.json();
};
 
export const deleteContactMessage = async (id) => {
  const res = await fetch(`${BASE_URL}/admin/contact/${id}`, {
    method: 'DELETE',
    headers: {...authHeaders()}
  });
  return res.json();
};