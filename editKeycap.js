// Edit a keycap
async function editKeycap(id) {
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
}



// After submitting the edit form, update the keycap and refresh the list
document.getElementById('editKeycapForm').addEventListener('submit', async function (event) {
    event.preventDefault();
    const name = document.getElementById('editName').value;
    const price = document.getElementById('editPrice').value;
    const description = document.getElementById('editDescription').value;
    const order_position = document.getElementById('editOrderPosition').value;

    try {
        await fetch(`${baseURL}/keycaps/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, price, description, order_position }),
        });

        // Hide the edit form and refresh the keycap list
        document.getElementById('editKeycapFormContainer').classList.add('hidden');
        fetchKeycaps();
    } catch (error) {
        console.error(`Error editing keycap with ID ${id}:`, error);
    }
});