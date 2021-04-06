import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

export const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(({ data }) => data )
}

export const createOne = newPerson => {
    const request = axios.post(baseUrl, newPerson)
    return request.then(({ data }) => data )
}

export const deleteOne = id => {
    const request = axios.delete(`http://localhost:3001/persons/${id}`)
    return request.then(({status }) => status)
}

export const updateOne = (id, data) => {
    const request = axios.put(`http://localhost:3001/persons/${id}`, data)
    return request.then((res) => res)
}
