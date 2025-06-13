let username = "";
let typingTimeout;

function login() {
  const input = document.getElementById("username");
  if (input.value.trim() === "") return alert("Enter your name");
  username = input.value.trim();
  document.getElementById("login-container").style.display = "none";
  document.querySelector(".chat-container").style.display = "flex";
}

function sendMessage() {
  const input = document.getElementById("messageInput");
  const message = input.value.trim();
  if (message === "") return;

  const chatBox = document.getElementById("chat-box");
  const html = `
    <div class="message outgoing">
      <img src="https://randomuser.me/api/portraits/women/44.jpg" />
      <div class="text">
        <p>${message}</p>
        <span>${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
      </div>
    </div>
  `;
  chatBox.innerHTML += html;
  input.value = "";
  chatBox.scrollTop = chatBox.scrollHeight;
  clearTyping();
}

function showTyping() {
  clearTimeout(typingTimeout);
  document.getElementById("typing-status").innerText = "typing...";
  typingTimeout = setTimeout(clearTyping, 2000);
}

function clearTyping() {
  document.getElementById("typing-status").innerText = "";
}

function addEmoji() {
  const input = document.getElementById("messageInput");
  input.value += "😊";
  input.focus();
}

function sendFile() {
  const fileInput = document.getElementById("fileInput");
  const file = fileInput.files[0];
  if (!file) return;

  const chatBox = document.getElementById("chat-box");
  const reader = new FileReader();
  reader.onload = function (e) {
    const html = `
      <div class="message outgoing">
        <img src="https://randomuser.me/api/portraits/women/44.jpg" />
        <div class="text">
          <p>File shared:</p>
          <a href="${e.target.result}" download="${file.name}">${file.name}</a>
        </div>
      </div>
    `;
    chatBox.innerHTML += html;
    chatBox.scrollTop = chatBox.scrollHeight;
  };
  reader.readAsDataURL(file);
}