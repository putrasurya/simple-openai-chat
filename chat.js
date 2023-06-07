const messagePool = [
    {role: "system", content: "You're .NET programmer assistant"}
];
    
// Function to simulate receiving a new message
function receiveMessage(sender, message) {
    displayMessage(sender, message);
}

document.getElementById("sendbutton").addEventListener('click', () => sendMessage())

// Function to send a new message
async function sendMessage() {
    const messageInput = document.getElementById('messageInput');
    const message = messageInput.value;

    messagePool.push({role: "user", content: message})
    receiveMessage("You", message)

    if (message.trim() !== '') {
        displayLoading(true); // Show loading indicator

        try {
            // Make an HTTP POST request to send the message
            const response = await fetch('https://d2l24jndjr55lggppcj2r4n2c40zkbch.lambda-url.ap-southeast-3.on.aws/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(messagePool),
            });

            // Handle the response
            if (response.ok) {
                const data = await response.json();
                console.log(data)
                messagePool.push(data.response);
                receiveMessage("A.I", data.response.content); // Simulate receiving the replied message
                messageInput.value = ''; // Clear the input field
            } else {
                console.error('Failed to send message:', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            displayLoading(false); // Hide loading indicator
        }
    }
}

// Function to display a message in the chat window
function displayMessage(sender, message) {
    const chatWindow = document.getElementById('chatWindow');
    const messageElement = document.createElement('div');
    messageElement.innerHTML = `<strong>${sender}:</strong> ${marked.parse(message)}`;
    chatWindow.appendChild(messageElement);

    // Scroll to the bottom of the chat window
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

// Function to toggle the loading indicator
function displayLoading(show) {
    const loadingIndicator = document.getElementById('loadingIndicator');
    loadingIndicator.style.display = show ? 'block' : 'none';
}