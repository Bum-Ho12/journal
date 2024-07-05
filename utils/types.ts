export interface Journal{
    id: string,
    title: string,
    content: string,
    category: string,
    date: string,
}

export interface Category{
    name: string,
    id: string
}

export interface User{
    username: string,
    email: string,
    password?: string
}

export interface Token{
    access_token:string,
    token_type: string,
}

// Response type for the user authentication
export type AuthResponse = {
    user: {
        email: string;
        username: string;
    };
    token: {
        access_token: string;
        token_type: string;
    };
};

//Type for possible API errors
export type ApiError = {
    data?: {
        detail?: string;
    };
    error?: {
        message?: string;
    };
};