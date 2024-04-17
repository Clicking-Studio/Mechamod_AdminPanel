// Define the base URL for the carts and logs API
// const baseURL = 'https://mechamod-backend.vercel.app';

// Function to show confirmation modal with message
async function confirmDelete(message) {
    return new Promise(resolve => {
        // Create a modal overlay
        const modalOverlay = document.createElement('div');
        modalOverlay.classList.add('fixed', 'inset-0', 'z-50', 'flex', 'items-center', 'justify-center', 'bg-black', 'bg-opacity-50');

        // Create modal content
        const modalContent = document.createElement('div');
        modalContent.classList.add('bg-white', 'p-4', 'rounded', 'shadow-md');

        // Add message and buttons to modal content
        modalContent.innerHTML = `
            <p class="text-lg font-semibold mb-4">${message}</p>
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

async function logEvent(action) {
    try {
        const response = await fetch(`${baseURL}/logs`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                action: action,
                timestamp: new Date().toISOString()
            })
        });

        if (!response.ok) {
            throw new Error(`Failed to log event: ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Event logged successfully:', data);
    } catch (error) {
        console.error('Error logging event:', error);
        // Handle error logging here, such as displaying an error message to the user
    }
}


// Function to delete all carts
async function deleteAllCarts() {
    try {
        const confirmed = await confirmDelete('Delete all carts?');
        if (!confirmed) {
            return; // Cancel deletion if not confirmed
        }

        // Send DELETE request to delete all carts
        const response = await fetch(`${baseURL}/deleteAllCarts`, {
            method: 'DELETE',
        });

        if (response.ok) {
            const data = await response.json();
            console.log(data.message); // Log success message

            // Log the "Delete All Carts" action to backend using /logs endpoint
            await logEvent('Deleted All Carts');
            
            // Optionally, perform additional actions upon successful deletion
        } else {
            throw new Error('Failed to delete all carts');
        }
    } catch (error) {
        console.error('Error deleting all carts:', error);
        // Handle errors here, such as displaying an error message to the user
    }
}

// Event listener for "Delete All Carts" button
document.addEventListener('DOMContentLoaded', () => {
    const deleteAllCartsButton = document.querySelector('#deleteAllCartsButton');
    if (deleteAllCartsButton) {
        deleteAllCartsButton.addEventListener('click', async () => {
            await deleteAllCarts(); // Call deleteAllCarts function when button is clicked
        });
    }
});
