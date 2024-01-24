// Define the base URL
const baseURL = 'https://mechamod-backend.vercel.app'; // Update with your deployed URL

// Fetch and display keycaps
async function fetchKeycaps() {
    try {
        const response = await fetch(`${baseURL}/keycaps`);
        const keycaps = await response.json();

        // Sort keycaps based on order_position
        const sortedKeycaps = keycaps.sort((a, b) => a.order_position - b.order_position);

        const keycapListElement = document.getElementById('keycapList');
        keycapListElement.innerHTML = sortedKeycaps.map(keycap => `
        <li>
            <div class="keycap-container bg-white p-4 rounded-md shadow-md">
                <strong>ID:</strong> ${keycap.keycap_id}<br />
                <strong>Position:</strong> ${keycap.order_position}<br/>
                <strong>Keycap Name:</strong> ${keycap.name}<br/>
                <strong>Price:</strong> ₹ ${keycap.price}<br/>
                <strong>Description:</strong> ${keycap.description}<br/>
                <div class="flex justify-between mt-4">
                    <button onclick="editKeycap(${keycap.keycap_id})" class="bg-blue-500 text-white px-4 py-2 rounded-md focus:outline-none hover:bg-blue-600">Edit</button>
                    <button onclick="deleteKeycap(${keycap.keycap_id})" class="bg-red-500 text-white px-4 py-2 rounded-md focus:outline-none hover:bg-red-600">Delete</button>
                </div>
            </div>
        </li>
        `).join('');
    } catch (error) {
        console.error('Error fetching keycaps:', error);
    }
}


// Fetch a keycap by ID
async function getKeycapById(id) {
    try {
        const response = await fetch(`${baseURL}/keycaps/${id}`);
        const keycap = await response.json();
        return keycap;
    } catch (error) {
        console.error(`Error fetching keycap with ID ${id}:`, error);
        return null;
    }
}
