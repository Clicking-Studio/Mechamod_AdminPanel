// Toggle visibility of the Add Keycap Form
document.getElementById('toggleAddKeycapForm').addEventListener('click', function () {
    const addKeycapFormContainer = document.getElementById('addKeycapFormContainer');
    addKeycapFormContainer.classList.toggle('hidden');
});

// After submitting the form, hide the form again
document.getElementById('addKeycapForm').addEventListener('submit', async function (event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const price = document.getElementById('price').value;
    const description = document.getElementById('description').value;
    const files = document.getElementById('image').files[0]; // Get the uploaded image file

    try {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', price);
        formData.append('description', description);
        formData.append('files', files); // Append the image file to the form data using the correct variable name

        const response = await fetch(`${baseURL}/keycaps`, {
            method: 'POST',
            body: formData, // Use form data instead of JSON.stringify
        });

        // Clear the form and refresh the list
        document.getElementById('addKeycapForm').reset();
        fetchKeycaps();
    } catch (error) {
        console.error('Error adding keycap:', error);
    }

    // Hide the Add Keycap Form after submission
    document.getElementById('addKeycapFormContainer').classList.add('hidden');
});
