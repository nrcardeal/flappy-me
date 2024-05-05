// Function to save player name and score to JSON file
const saveRating = async (name, score) => {
    try {
        const newData = { name, score };
        await fetch('http://192.168.1.7:5000/ratings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newData),
        });
    } catch (error) {
        console.error('Error saving rating:', error);
    }
};

// Function to get player ratings from JSON file
const getRatings = async () => {
    try {
        const response = await fetch('http://192.168.1.7:5000/ratings');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching ratings:', error);
        return [];
    }
};

export { saveRating, getRatings };
