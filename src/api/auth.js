import request from './client';

export function login(email, password){
    return request('/auth/login',
        {
            method: 'POST',
            body: JSON.stringify({email, password})
        }
    )
}

export function setPassword(email, current_password, new_password){
    return request('/auth/set-password',
        {
        method:'POST',
        body: JSON.stringify({email, current_password, new_password})
    })
}

