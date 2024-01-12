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

    try {
        const response = await fetch(`${baseURL}/keycaps`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, price, description }),
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
