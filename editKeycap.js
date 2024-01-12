// Edit a keycap
async function editKeycap(id) {
    // Implement the logic to populate the edit form with existing data
    const keycapToEdit = await getKeycapById(id);

    // Display the edit form
    const editFormContainer = document.getElementById('editKeycapFormContainer');
    editFormContainer.classList.remove('hidden');

    // Populate the form fields with existing data
    document.getElementById('editKeyId').value = keycapToEdit.keycap_id;
    document.getElementById('editName').value = keycapToEdit.name;
    document.getElementById('editPrice').value = keycapToEdit.price;
    document.getElementById('editDescription').value = keycapToEdit.description;
}



// After submitting the edit form, update the keycap and refresh the list
document.getElementById('editKeycapForm').addEventListener('submit', async function (event) {
    event.preventDefault();
    const id = document.getElementById('editKeyId').value;
    const name = document.getElementById('editName').value;
    const price = document.getElementById('editPrice').value;
    const description = document.getElementById('editDescription').value;

    try {
        await fetch(`${baseURL}/keycaps/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, price, description }),
        });

        // Hide the edit form and refresh the keycap list
        document.getElementById('editKeycapFormContainer').classList.add('hidden');
        fetchKeycaps();
    } catch (error) {
        console.error(`Error editing keycap with ID ${id}:`, error);
    }
});