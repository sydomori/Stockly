import request from './client';

export function getMyActivity() {
  return request('/my-activity');
}

export function getAllActivity() {
  return request('/admin/activity-log');
}