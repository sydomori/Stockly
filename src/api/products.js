import request from './client';

export function getProducts() {
    return request('/products');
}

export function createProduct(productData){
    return request (
        '/products',
        {
            method: 'POST',
            body: JSON.stringify(productData)
        }
    )
}

export function updateProduct(id, productData){
    return request (
        `/products/${id}`,
        {
            method: 'PUT',
            body: JSON.stringify(productData)
        }
    )
}

export function deleteProduct(id){
    return request (
        `/products/${id}`,
        {
            method: 'DELETE',
        }
    )
}