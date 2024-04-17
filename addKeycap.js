// Open Add Keycap Modal
function openAddKeycapModal() {
    const addKeycapModal = document.getElementById('addKeycapModal');
    addKeycapModal.style.display = 'flex'; // Show the modal
}

// Close Add Keycap Modal
function closeAddKeycapModal() {
    const addKeycapModal = document.getElementById('addKeycapModal');
    addKeycapModal.style.display = 'none'; // Hide the modal
}

// Handle Add Keycap Form Submission
document.getElementById('addKeycapForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const price = document.getElementById('price').value;
    const description = document.getElementById('description').value;
    const files = document.getElementById('image').files[0];

    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('description', description);
    formData.append('files', files);

    try {
        const response = await fetch(`${baseURL}/keycaps`, {
            method: 'POST',
            body: formData,
        });

        // Clear the form and close the modal
        document.getElementById('addKeycapForm').reset();
        closeAddKeycapModal();
        fetchKeycapNames(); // Refresh keycap list
        fetchLogs();
    } catch (error) {
        console.error('Error adding keycap:', error);
    }
});
