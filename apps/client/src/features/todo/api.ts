const apiURL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000';

export const getTodos = async () => {
    try {
        const response = await fetch(`${apiURL}/todos`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}
