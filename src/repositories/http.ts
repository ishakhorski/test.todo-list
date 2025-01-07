export const get = async <T>(url: string, options: RequestInit = {}): Promise<T> => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}${url}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        ...options,
    });
    return response.json();
}

export const post = async <T>(url: string, body: unknown, options: RequestInit = {}): Promise<T> => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}${url}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
        ...options,
    });
    return response.json();
}

export const put = async <T>(url: string, body: unknown, options: RequestInit = {}): Promise<T> => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}${url}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
        ...options,
    });
    return response.json();
}

export const del = async <T>(url: string, options: RequestInit = {}): Promise<T> => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}${url}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        ...options,
    });
    return response.json();
}
