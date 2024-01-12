
// Delete a keycap
async function deleteKeycap(id) {
    try {
        await fetch(`${baseURL}/keycaps/${id}`, { method: 'DELETE' });
        fetchKeycaps(); // Refresh the list after deletion
    } catch (error) {
        console.error('Error deleting keycap:', error);
    }
}