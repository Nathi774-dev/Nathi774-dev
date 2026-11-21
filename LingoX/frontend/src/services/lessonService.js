const apiURL = import.meta.env.VITE_API_URL;

// fetch all lessons with optional filters
export const getLessons = async (filters = {}) => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
        if (value) {
            params.append(key, value);
        }

        const response = await fetch(`${apiURL}/lessons?${params.toString()}`);
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || "Failed to fetch lessons");
        }

        return data.lessons;
    })
}

// fetch an individual lessons with its ID
export const getLessonById = async (id) => {
    const response = await fetch(`${apiURL}/lessons/${id}`);
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || "Failed to fetch the lesson")
    }

    return data.lesson;
}