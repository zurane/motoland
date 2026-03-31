import axios from "axios"

const API_URL = 'http://localhost:3000'

export const fetchTutorials = async (endPoint) => {
    const url = `${API_URL}/${endPoint}`
    try {
        const response = await axios.get(url)
        console.table(response.data)
        return response.data
    } catch (error) {
        console.error('Error fetching tutorials:', error)
        throw error
    }
}


export const endPoints = {
    getAllTutorials: () => fetchTutorials('/tutorials'),
    getTutorialsByModel: (modelId) => fetchTutorials(`/:${modelId}/tutorials/`),
    getAllManufacturerModels: (modelName) => fetchTutorials(`/manufacturer/${modelName}/models`),
}