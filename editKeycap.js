function openEditModal(id) {
    // Fetch keycap data and populate the edit form
    fetch(`${baseURL}/keycaps/${id}`)
        .then(response => response.json())
        .then(keycap => {
            // Populate the edit form with keycap data
            const modalContent = `
            <h2 class="text-lg font-semibold ">Edit Keycap</h2>
            <form id="editKeycapForm" class="space-y-2 grid grid-cols-3 gap-4">
                <div class="col-span-1">
                    <label for="editName" class="mt-2 block font-small text-gray-700">Name:</label>
                    <input type="hidden" id="editKeycapId" value="${keycap.keycap_id}">
                    <input type="text" id="editName" name="editName" value="${keycap.name}" required
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500">
                    <label for="editPrice" class="block font-small text-gray-700">Price:</label>
                    <input type="number" id="editPrice" name="editPrice" value="${keycap.price}" required
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500">
                    <label for="editOrderPosition" class="block font-small text-gray-700">Order Position:</label>
                    <input type="number" id="editOrderPosition" name="editOrderPosition" value="${keycap.order_position}" required
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500">
                </div>
                <div class="col-span-1">
                    <label for="editDescription" class="block font-small text-gray-700">Description:</label>
                    <textarea id="editDescription" name="editDescription" rows="4" required
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500">${keycap.description}</textarea>
                    <label for="editBullet1" class="block font-small text-gray-700">Bullet 1:</label>
                    <input type="text" id="editBullet1" name="editBullet1" value="${keycap.bullet1 || ''}"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500">
                    <label for="editBullet2" class="block font-small text-gray-700">Bullet 2:</label>
                    <input type="text" id="editBullet2" name="editBullet2" value="${keycap.bullet2 || ''}"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500">
                    <label for="editBullet3" class="block font-small text-gray-700">Bullet 3:</label>
                    <input type="text" id="editBullet3" name="editBullet3" value="${keycap.bullet3 || ''}"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500">
                    <label for="editBullet4" class="block font-small text-gray-700">Bullet 4:</label>
                    <input type="text" id="editBullet4" name="editBullet4" value="${keycap.bullet4 || ''}"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500">
                </div>
                <div class="col-span-1">
                    <div class="">
                        <div class="mb-36">
                        <label for="editImage" class="block font-small text-gray-700">Image:</label>
                        <input type="file" id="editImage" name="editImage"
                            class="w-full px-2 py-2 border border-gray-300 text-sm rounded-md focus:outline-none focus:border-blue-500">
                        </div>
                        <!-- Display existing image if available with smaller size -->
                        <img id="existingImagePreview" src="${keycap.image_path}" class="mt-2 border border-gray-300 rounded-md ${keycap.image_path ? '' : 'hidden'} w-20 h-20 object-cover">
                        <!-- Adjusted width (w-10) and height (h-10) for the image -->
                    </div>
                        
                    <div class="">
                        <label for="editBackground" class="block font-small text-gray-700">Background:</label>
                        <input type="file" id="editBackground" name="editBackground"
                            class="w-full px-2 py-2 border border-gray-300 text-sm rounded-md focus:outline-none focus:border-blue-500">
                    
                        <!-- Display existing background if available with smaller size -->
                        <img id="existingBackgroundPreview" src="${keycap.background_path}" class="mt-2 border border-gray-300 rounded-md ${keycap.background_path ? '' : 'hidden'} w-20 h-20 object-cover">
                        <!-- Adjusted width (w-10) and height (h-10) for the background -->
                    </div>

                    <div class="">
                    <label for="editSTL" class="block font-small text-gray-700">STL:</label>
                    <input type="file" id="editSTL" name="editSTL"
                        class="w-full px-2 py-2 border border-gray-300 text-sm rounded-md focus:outline-none focus:border-blue-500">
                
                    <!-- Display existing STL if available with smaller size -->
                    <img id="existingSTLPreview" src="${keycap.stl_path}" class="mt-2 border border-gray-300 rounded-md ${keycap.stl_path ? '' : 'hidden'} w-20 h-20 object-cover">
                    <!-- Adjusted width (w-10) and height (h-10) for the STL -->
                </div>
                </div>

            
                <!-- Buttons for saving changes and canceling -->
                <div class="col-span-3 flex justify-end space-x-4">
                    <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none">Save Changes</button>
                    <button type="button" class="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500 focus:outline-none" onclick="closeEditModal()">Cancel</button>
                </div>
            </form>
            `;
            document.querySelector('.modal-content').innerHTML = modalContent;
            document.getElementById('editKeycapModal').style.display = 'flex'; // Show the modal

            // Handle edit form submission
            document.getElementById('editKeycapForm').addEventListener('submit', async function (event) {
                event.preventDefault();

                // Get form values including bullet points
                const id = document.getElementById('editKeycapId').value;
                const name = document.getElementById('editName').value;
                const price = document.getElementById('editPrice').value;
                const description = document.getElementById('editDescription').value;
                const order_position = document.getElementById('editOrderPosition').value;
                const bullet1 = document.getElementById('editBullet1').value;
                const bullet2 = document.getElementById('editBullet2').value;
                const bullet3 = document.getElementById('editBullet3').value;
                const bullet4 = document.getElementById('editBullet4').value;
                const imageFile = document.getElementById('editImage').files[0]; // Get the selected image file
                const backgroundFile = document.getElementById('editBackground').files[0]; // Get the selected background image file
                const stlFile = document.getElementById('editSTL').files[0]; // Get the selected stl file

                // Create a FormData object to send form data
                const formData = new FormData();
                formData.append('name', name);
                formData.append('price', price);
                formData.append('description', description);
                formData.append('order_position', order_position);
                formData.append('bullet1', bullet1);
                formData.append('bullet2', bullet2);
                formData.append('bullet3', bullet3);
                formData.append('bullet4', bullet4);

                // Append the image file to FormData only if a new image is selected
                if (imageFile) {
                    formData.append('image', imageFile);
                }

                // Append the background file to FormData only if a new image is selected
                if (backgroundFile) {
                    formData.append('background', backgroundFile);
                }

                // Append the stl file to FormData only if a new file is selected
                if (stlFile) {
                    formData.append('stl', stlFile);
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
