async function fetchLogs() {
    try {
        const response = await fetch(`${baseURL}/logs`);
        const logs = await response.json();

        const keycapLogElement = document.getElementById('keycapLog');

        // Clear existing log entries
        keycapLogElement.innerHTML = '';

        // Display each log entry
        logs.forEach(log => {
            const logItem = document.createElement('li');
            const formattedTimestamp = new Date(log.timestamp).toLocaleString(); // Convert timestamp to local date format
            
            // Create span element for the timestamp
            const timestampSpan = document.createElement('span');
            timestampSpan.textContent = formattedTimestamp;
            timestampSpan.className = 'timestamp';

            // Create text node for the log action and keycap name
            const logText = document.createTextNode(`${log.action} ${log.keycap_name}`);

            // Append timestamp and log text to log item
            logItem.appendChild(timestampSpan);
            logItem.appendChild(logText);

            // Append log item to log container
            keycapLogElement.appendChild(logItem);
        });
    } catch (error) {
        console.error('Error fetching logs:', error);
    }
}

// Call fetchLogs to display logs when the page loads
document.addEventListener('DOMContentLoaded', () => {
    fetchLogs();
});
