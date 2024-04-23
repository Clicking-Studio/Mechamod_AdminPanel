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

document.getElementById('addKeycapForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const price = document.getElementById('price').value;
    const description = document.getElementById('description').value;
    const bullet1 = document.getElementById('bullet1').value;
    const bullet2 = document.getElementById('bullet2').value;
    const bullet3 = document.getElementById('bullet3').value;
    const bullet4 = document.getElementById('bullet4').value;
    const imageFile = document.getElementById('image').files[0]; // Get image file
    const backgroundFile = document.getElementById('background').files[0]; // Get background file

    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('description', description);
    formData.append('bullet1', bullet1);
    formData.append('bullet2', bullet2);
    formData.append('bullet3', bullet3);
    formData.append('bullet4', bullet4);
    formData.append('files', imageFile); // Append image file with key 'image'
    formData.append('files', backgroundFile); // Append background file with key 'background'

    try {
        const response = await fetch(`${baseURL}/keycaps`, {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            throw new Error('Failed to add keycap');
        }

        // Clear the form and close the modal
        document.getElementById('addKeycapForm').reset();
        closeAddKeycapModal();
        fetchKeycapNames(); // Refresh keycap list
        fetchLogs();
    } catch (error) {
        console.error('Error adding keycap:', error);
    }
});
