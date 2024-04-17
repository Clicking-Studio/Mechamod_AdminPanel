async function deleteKeycap(id) {
    try {
        const response = await fetch(`${baseURL}/keycaps/${id}`);
        const keycap = await response.json();

        const confirmed = await confirmDelete(keycap.name);

        if (confirmed) {
            await fetch(`${baseURL}/keycaps/${id}`, { method: 'DELETE' });

            // Create log entry for keycap deletion
            await fetch(`${baseURL}/logs`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    action: 'Deleted',
                    keycap_name: keycap.name
                })
            });

            fetchKeycapNames(); // Refresh the list after deletion
            fetchLogs();
        }
    } catch (error) {
        console.error('Error deleting keycap:', error);
    }
}


// Function to show confirmation modal with keycap name
async function confirmDelete(keycapName) {
    return new Promise(resolve => {
        // Create a modal overlay
        const modalOverlay = document.createElement('div');
        modalOverlay.classList.add('fixed', 'inset-0', 'z-50', 'flex', 'items-center', 'justify-center', 'bg-black', 'bg-opacity-50');

        // Create modal content
        const modalContent = document.createElement('div');
        modalContent.classList.add('bg-white', 'p-4', 'rounded', 'shadow-md');

        // Add message and buttons to modal content
        modalContent.innerHTML = `
            <p class="text-lg font-semibold mb-4">Delete ${keycapName}?</p>
            <div class="flex justify-end space-x-4">
                <button id="confirmDeleteBtn" class="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none">Delete</button>
                <button id="cancelDeleteBtn" class="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500 focus:outline-none">Cancel</button>
            </div>
        `;

        // Append modal content to overlay
        modalOverlay.appendChild(modalContent);

        // Append overlay to document body
        document.body.appendChild(modalOverlay);

        // Handle delete and cancel button clicks
        const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
        const cancelDeleteBtn = document.getElementById('cancelDeleteBtn');

        confirmDeleteBtn.addEventListener('click', () => {
            modalOverlay.remove(); // Remove modal overlay
            resolve(true); // Resolve promise with true (confirmed)
        });

        cancelDeleteBtn.addEventListener('click', () => {
            modalOverlay.remove(); // Remove modal overlay
            resolve(false); // Resolve promise with false (canceled)
        });
    });
}

// Function to log an event with action and keycap name
function logEvent(action, keycapName) {
    const logList = document.getElementById('keycapLog');

    // Create a new list item for the log entry
    const logEntry = document.createElement('li');
    logEntry.textContent = `${action} - ${keycapName} (${new Date().toLocaleString()})`;

    // Append log entry to log list
    logList.appendChild(logEntry);
}
