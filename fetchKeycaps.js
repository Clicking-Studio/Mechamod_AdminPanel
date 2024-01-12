// Define the base URL
const baseURL = 'https://mechamod-backend-v1.fly.dev'; // Update with your deployed URL

// Fetch and display keycaps
async function fetchKeycaps() {
    try {
        const response = await fetch(`${baseURL}/keycaps`);
        const keycaps = await response.json();
        
        const keycapListElement = document.getElementById('keycapList');
        keycapListElement.innerHTML = keycaps.map(keycap => `
            <li>
                <div class="keycap-container">
                    <strong>ID:</strong> ${keycap.keycap_id}<br />
                    <strong>Keycap Name:</strong> ${keycap.name}<br/>
                    <strong>Price:</strong> ₹ ${keycap.price}<br/>
                    <strong>Description:</strong> ${keycap.description}<br/>
                    <button onclick="editKeycap(${keycap.keycap_id})" class="edit-keycap-button">Edit</button>
                    <button onclick="deleteKeycap(${keycap.keycap_id})" class="delete-keycap-button">Delete</button>
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
