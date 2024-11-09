export const getLocationList = async (input: string) => {
    try {
        const endpoint = `https://nominatim.openstreetmap.org/search?format=json&q=${input}&limit=8`;
        const response = await fetch(endpoint);
        const data = await response.json();
        return {
            success: true,
            list: data
        };
    } catch (error) {
        return {
            success: false,
            list: null,
            error
        }
    }
}