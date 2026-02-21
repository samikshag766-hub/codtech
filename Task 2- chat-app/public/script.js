const socket = io();
let currentUsername = '';

function setUsername() {
    const usernameInput = document.getElementById("username");
    const username = usernameInput.value.trim();
    if (username !== "") {
        currentUsername = username;
        usernameInput.disabled = true;
        document.getElementById("message").disabled = false;
        document.getElementById("send-btn").disabled = false;
        document.getElementById("username-container").style.display = 'none';
    }
}

function sendMessage() {
    let msg = document.getElementById("message").value;
    if (msg !== "" && currentUsername !== "") {
        socket.emit("chat message", { username: currentUsername, message: msg });
        document.getElementById("message").value = "";
    }
}

socket.on("chat message", (data) => {
    let chatBox = document.getElementById("chat-box");
    let p = document.createElement("p");
    const now = new Date();
    const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    p.innerHTML = `<span style='color:gray;font-size:0.9em;'>[${time}]</span> <strong>${data.username}:</strong> ${data.message}`;
    chatBox.appendChild(p);
    chatBox.scrollTop = chatBox.scrollHeight;
});
