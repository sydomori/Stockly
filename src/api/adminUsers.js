import request from './client';

export function getUsers() {
  return request('/admin/users');
}
export function createUser(data) {
  return request('/admin/users', { method: 'POST', body: JSON.stringify(data) });
}
export function updateUser(id, data) {
  return request(`/admin/users/${id}`, { method: 'PUT', body: JSON.stringify(data) });
}