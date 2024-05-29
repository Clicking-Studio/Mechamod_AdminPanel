// Define the base URL for the keycaps API
// const baseURL = 'https://mechamod-backend.vercel.app'; // Replace with your API URL
// const baseURL = 'http://localhost:3005'; // Replace with your API URL
const baseURL = 'https://3.142.172.85:3000'; //Latest API URL

async function fetchKeycapNames() {
    try {
        const response = await fetch(`${baseURL}/keycaps`);
        const keycaps = await response.json();

        const keycapListElement = document.getElementById('keycapList');

        // Clear any existing content
        keycapListElement.innerHTML = '';

        // Loop through keycaps and create elements for each keycap
        keycaps.forEach(keycap => {
            // Create a container for the keycap
            const keycapContainer = document.createElement('div');
            keycapContainer.classList.add('bg-white', 'p-2', 'rounded-md', 'shadow-md', 'flex', 'items-center');

            // Create <img> element for keycap image
            const keycapImageElement = document.createElement('img');
            keycapImageElement.src = keycap.image_path; // Set the image source
            keycapImageElement.alt = keycap.name; // Set alt text for accessibility
            keycapImageElement.classList.add('w-12', 'h-12', 'object-cover', 'mr-3'); // Tailwind CSS classes for styling

            // Create <p> element for keycap name with left border (vertical line)
            const keycapNameElement = document.createElement('p');
            keycapNameElement.textContent = keycap.name;
            keycapNameElement.classList.add('flex-grow', 'pl-3', 'border-l', 'border-gray-400'); // Tailwind CSS classes for styling

            // Create button container for edit and delete buttons
            const buttonContainer = document.createElement('div');
            buttonContainer.classList.add('ml-auto', 'space-x-2'); // Use ml-auto to push buttons to the right

            // Create Edit button
            const editButton = document.createElement('button');
            editButton.textContent = 'Edit';
            editButton.classList.add('bg-blue-500', 'text-white', 'px-4', 'py-2', 'rounded-md', 'focus:outline-none', 'hover:bg-blue-600');
            editButton.addEventListener('click', () => {
                openEditModal(keycap.keycap_id); // Pass keycap data to openEditModal
            });

            // Create Delete button
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.classList.add('bg-red-500', 'text-white', 'px-4', 'py-2', 'rounded-md', 'focus:outline-none', 'hover:bg-red-600');
            deleteButton.addEventListener('click', () => {
                deleteKeycap(keycap.keycap_id); // Call deleteKeycap function with keycap ID
            });

            // Append elements to the keycap container
            keycapContainer.appendChild(keycapImageElement); // Add image element
            keycapContainer.appendChild(keycapNameElement); // Add name element with vertical line
            keycapContainer.appendChild(buttonContainer); // Add button container to keycap container

            // Append buttons to the button container
            buttonContainer.appendChild(editButton);
            buttonContainer.appendChild(deleteButton);

            // Append the keycap container to the keycapListElement
            keycapListElement.appendChild(keycapContainer);
        });
    } catch (error) {
        console.error('Error fetching keycaps:', error);
    }
}

// Fetch keycap names when the page loads
document.addEventListener('DOMContentLoaded', () => {
    fetchKeycapNames();
});
