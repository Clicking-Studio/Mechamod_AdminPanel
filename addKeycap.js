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
    const bullet1 = document.getElementById('bullet1').value; // Get bullet 1 value
    const bullet2 = document.getElementById('bullet2').value; // Get bullet 2 value
    const bullet3 = document.getElementById('bullet3').value; // Get bullet 3 value
    const bullet4 = document.getElementById('bullet4').value; // Get bullet 4 value
    const files = document.getElementById('image').files[0];

    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('description', description);
    formData.append('bullet1', bullet1); // Append bullet 1
    formData.append('bullet2', bullet2); // Append bullet 2
    formData.append('bullet3', bullet3); // Append bullet 3
    formData.append('bullet4', bullet4); // Append bullet 4
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
