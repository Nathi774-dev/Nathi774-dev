function getSavedValue(key, fallback) {
    try {
        const savedItem = localStorage.getItem(key);
        return savedItem ? JSON.parse(savedItem) : fallback
    } catch {
        return fallback
    }
}

export default getSavedValue;