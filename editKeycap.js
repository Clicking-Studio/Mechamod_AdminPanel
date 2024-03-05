// Edit a keycap
async function editKeycap(id) {
    try {
        // Implement the logic to populate the edit form with existing data
        const keycapToEdit = await getKeycapById(id);

        // Display the edit form
        const editFormContainer = document.getElementById('editKeycapFormContainer');
        editFormContainer.classList.remove('hidden');

        // Populate the form fields with existing data
        document.getElementById('editName').value = keycapToEdit.name;
        document.getElementById('editPrice').value = keycapToEdit.price;
        document.getElementById('editDescription').value = keycapToEdit.description;
        document.getElementById('editOrderPosition').value = keycapToEdit.order_position;

        // Store the ID of the keycap being edited
        editFormContainer.dataset.keycapId = id;
    } catch (error) {
        console.error(`Error editing keycap with ID ${id}:`, error);
    }
}

// After submitting the edit form, update the keycap and refresh the list
document.getElementById('editKeycapForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    // Get the ID of the keycap being edited from the form container
    const id = document.getElementById('editKeycapFormContainer').dataset.keycapId;

    // Get form values
    const name = document.getElementById('editName').value;
    const price = document.getElementById('editPrice').value;
    const description = document.getElementById('editDescription').value;
    const order_position = document.getElementById('editOrderPosition').value;
    const files = document.getElementById('editImage').files[0]; // Get the selected image file

    // Create a FormData object to send form data including the image
    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('description', description);
    formData.append('order_position', order_position);
    formData.append('files', files);

    try {
        await fetch(`${baseURL}/keycaps/${id}`, {
            method: 'PUT',
            body: formData, // Use FormData to send the image
        });

        // Hide the edit form and refresh the keycap list
        document.getElementById('editKeycapFormContainer').classList.add('hidden');
        fetchKeycaps();
    } catch (error) {
        console.error(`Error editing keycap with ID ${id}:`, error);
    }
});
