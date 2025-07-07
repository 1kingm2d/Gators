// Simple AI response function (simulates AI)
function getAIResponse(message) {
  const responses = [
    "I'm GATORS, your AI assistant. How can I help you today?",
    "That's an interesting question. Let me think about that...",
    "I'm designed to assist with various tasks. What else would you like to know?",
    "Thanks for your message! I'm here to help.",
    "I've recorded your request in our chat history."
  ];
  return responses[Math.floor(Math.random() * responses.length)];
}

// Chat storage
let chatHistory = JSON.parse(localStorage.getItem('gators_chat')) || [];

// Save chat to localStorage
function saveChat() {
  localStorage.setItem('gators_chat', JSON.stringify(chatHistory));
}

// Display messages
function displayMessages() {
  const chatContainer = document.getElementById('chat-messages');
  chatContainer.innerHTML = '';
  
  chatHistory.forEach(msg => {
    const msgElement = document.createElement('div');
    msgElement.textContent = msg.content;
    msgElement.style.margin = '10px 0';
    msgElement.style.padding = '10px';
    msgElement.style.backgroundColor = msg.role === 'user' ? '#10a37f' : '#444654';
    msgElement.style.borderRadius = '5px';
    chatContainer.appendChild(msgElement);
  });
}

// Send message
document.getElementById('send-btn').addEventListener('click', () => {
  const input = document.getElementById('message-input');
  const message = input.value.trim();
  
  if (message) {
    // Add user message
    chatHistory.push({ role: 'user', content: message });
    
    // Get AI response
    const aiResponse = getAIResponse(message);
    chatHistory.push({ role: 'assistant', content: aiResponse });
    
    // Save and display
    saveChat();
    displayMessages();
    input.value = '';
  }
});

// New chat
document.getElementById('new-chat-btn').addEventListener('click', () => {
  chatHistory = [];
  saveChat();
  displayMessages();
});

// Show history
document.getElementById('history-btn').addEventListener('click', () => {
  alert("Chat history stored in browser!\n\n" + 
    JSON.stringify(chatHistory, null, 2));
});

// Initialize
displayMessages();