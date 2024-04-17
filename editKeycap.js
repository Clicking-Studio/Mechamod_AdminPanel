// Define the base URL for the keycaps API
// const baseURL = 'https://mechamod-backend.vercel.app'; // Replace with your API URL

function openEditModal(id) {
    // Fetch keycap data and populate the edit form
    fetch(`${baseURL}/keycaps/${id}`)
        .then(response => response.json())
        .then(keycap => {
            // Populate the edit form with keycap data
            const modalContent = `
                <h2 class="text-lg font-semibold mb-2">Edit Keycap</h2>
                <form id="editKeycapForm" class="space-y-2">
                    <input type="hidden" id="editKeycapId" value="${keycap.keycap_id}">
                    <label for="editName" class="block font-small text-gray-700">Name:</label>
                    <input type="text" id="editName" name="editName" value="${keycap.name}" required
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500">
                    <label for="editPrice" class="block font-small text-gray-700">Price:</label>
                    <input type="number" id="editPrice" name="editPrice" value="${keycap.price}" required
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500">
                    <label for="editDescription" class="block font-small text-gray-700">Description:</label>
                    <textarea id="editDescription" name="editDescription" rows="4" required
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500">${keycap.description}</textarea>
                    <label for="editOrderPosition" class="block font-small text-gray-700">Order Position:</label>
                    <input type="number" id="editOrderPosition" name="editOrderPosition" value="${keycap.order_position}" required
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500">
                    <label for="editImage" class="block font-small text-gray-700">Image:</label>
                    <input type="file" id="editImage" name="editImage"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500">
                    
                    <!-- Display existing image if available with smaller size -->
                    <img id="existingImagePreview" src="${keycap.image_path}" class="mt-2 border border-gray-300 rounded-md ${keycap.image_path ? '' : 'hidden'} w-24 h-24 object-cover">
                    <!-- Adjusted width (w-24) and height (h-24) for the image -->

                    <!-- Buttons for saving changes and canceling -->
                    <div class="flex justify-end space-x-4">
                        <button type="submit"
                            class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none">Save
                            Changes</button>
                        <button type="button"
                            class="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500 focus:outline-none"
                            onclick="closeEditModal()">Cancel</button>
                    </div>
                </form>
            `;
            document.querySelector('.modal-content').innerHTML = modalContent;
            document.getElementById('editKeycapModal').style.display = 'flex'; // Show the modal

            // Handle edit form submission
            document.getElementById('editKeycapForm').addEventListener('submit', async function(event) {
                event.preventDefault();

                // Get form values
                const id = document.getElementById('editKeycapId').value;
                const name = document.getElementById('editName').value;
                const price = document.getElementById('editPrice').value;
                const description = document.getElementById('editDescription').value;
                const order_position = document.getElementById('editOrderPosition').value;
                const files = document.getElementById('editImage').files[0]; // Get the selected image file

                // Create a FormData object to send form data
                const formData = new FormData();
                formData.append('name', name);
                formData.append('price', price);
                formData.append('description', description);
                formData.append('order_position', order_position);

                // Append the image file to FormData only if a new image is selected
                if (files) {
                    formData.append('files', files);
                }

                try {
                    // Update the keycap data using PUT request
                    await fetch(`${baseURL}/keycaps/${id}`, {
                        method: 'PUT',
                        body: formData, // Use FormData to send the image if provided
                    });

                    // Log the edit event to backend using /logs endpoint
                    await fetch(`${baseURL}/logs`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            action: 'Edited',
                            keycapName: name,
                            timestamp: new Date().toISOString()
                        })
                    });

                    // Hide the edit modal and refresh the keycap list
                    document.getElementById('editKeycapModal').style.display = 'none';
                    fetchKeycapNames(); // Refresh keycap list after update
                } catch (error) {
                    console.error(`Error editing keycap with ID ${id}:`, error);
                }
            });
        })
        .catch(error => {
            console.error(`Error fetching keycap with ID ${id}:`, error);
        });
}

// Function to close the edit modal
function closeEditModal() {
    document.getElementById('editKeycapModal').style.display = 'none';
}
