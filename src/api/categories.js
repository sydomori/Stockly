import request from './client';

export function getCategories() {
    return request.get('/categories');
}