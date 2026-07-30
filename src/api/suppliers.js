import request from './client';

export function getSuppliers() {
  return request('/suppliers');
}
export function createSupplier(data) {
  return request('/suppliers', { method: 'POST', body: JSON.stringify(data) });
}
export function updateSupplier(id, data) {
  return request(`/suppliers/${id}`, { method: 'PUT', body: JSON.stringify(data) });
}
export function deleteSupplier(id) {
  return request(`/suppliers/${id}`, { method: 'DELETE' });
}
