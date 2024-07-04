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