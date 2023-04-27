const socket = io();

const getChannelName = () => {
  return (channelName = window.location.pathname.split("/")[2]);
};

const getUserName = () => {
  return (username = window.location.search.split("=")[1]);
};


const messageForm = document.getElementById("message-form");
const messageInput = document.getElementById("message-input");
const messagesDiv = document.getElementById("messages");


messageForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const message = messageInput.value;
  if (message) {
    
    const username = window.location.search.split("=")[1];
    
    const channelName = window.location.pathname.split("/")[2];
    socket.emit("message", {
      channelName: channelName,
      message: message,
      user: username,
      date: new Date().toString(),
    });
    messageInput.value = "";
  }
});


messageInput.addEventListener("keypress", () => {
  
  socket.emit("notify:typing", {
    user: getUserName(),
    channelName: getChannelName(),
  });
});

const hasUser = (user) => {
  const userList = document.querySelectorAll("ul#users-list li");
  let hasUser = false;
  userList.forEach((userLi) => {
    if (userLi.textContent === user) {
      hasUser = true;
    }
  });
  return hasUser;
};


const addYou = () => {
  const userList = document.querySelectorAll("ul#users-list li");
  userList.forEach((user) => {
    if (user.textContent === getUserName()) {
      user.textContent = user.textContent + "(you)";
    }
  });
};


socket.on("message", (data) => {
  if (getChannelName() === data.channelName) {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message");
    const hourMinute = new Date(data.date).toLocaleTimeString();
    const messageText =
      "[" + hourMinute + "] " + data.user + " : " + data.message;
    const messageParagraph = document.createElement("p");
    messageParagraph.textContent = messageText;
    messageDiv.appendChild(messageParagraph);
    messagesDiv.appendChild(messageDiv);
  }
});


socket.on("notify:typing", (data) => {
  const typingDiv = document.getElementById("typing");
  if (getChannelName() === data.channelName && getUserName() !== data.user) {
    typingDiv.textContent = data.user + " en train d'écrire...";
    setTimeout(() => {
      typingDiv.textContent = "";
    }, 5000);
  }
});

socket.on("utilisateurs déconnecté", (data) => {
  const channelName = getChannelName();
  if (data?.currentChannel === channelName) {
    const messageDiv = document.createElement("div");
    messageDiv.textContent = `${data.name} has disconnected`;
    messagesDiv.appendChild(messageDiv);

    
    const userList = document.querySelectorAll("ul#users-list li");

    userList.forEach((user) => {
      if (user.textContent === data.name) {
        
        user.remove();
      }
    });
  }
});

socket.on("utilisateurs connectés", (data) => {
  const channelName = getChannelName();
  if (data?.currentChannel === channelName) {
    const messageDiv = document.createElement("div");
    const paragraph = document.createElement("p");
    messageDiv.classList.add("message");
    paragraph.textContent = `${data.name} has connected`;
    messageDiv.appendChild(paragraph);
    messagesDiv.appendChild(messageDiv);

    
    if (!hasUser(data.name)) {
      const usersList = document.getElementById("users-list");
      const userLi = document.createElement("li");
      userLi.textContent = data.name;
      usersList.appendChild(userLi);
    }

    addYou();
  }
});