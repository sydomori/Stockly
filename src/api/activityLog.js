import request from './client';

export function getMyActivity() {
  return request('/my-activity');
}