
  // Import the functions you need from the SDKs you need
  //import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
  //import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  firebase.initializeApp ({
  apiKey: "AIzaSyC1ekfY504g4sNIN_0oPJ3v1NWCPFBmyrg",
  authDomain: "taskmanagementapp-fireweb.firebaseapp.com",
  projectId: "taskmanagementapp-fireweb",
  storageBucket: "taskmanagementapp-fireweb.appspot.com",
  messagingSenderId: "1061234791830",
  appId: "1:1061234791830:web:3830f1cbcbdce5e87db9b7",
  measurementId: "G-J9C9SBE972" });

const db=firebase.firestore();


//function to addTask
function addTask(){
  const taskInput = document.getElementById("task-input");
  const task = taskInput.value.trim();

  if(task !== " "){
    db.collection("tasks").add({
      task: task,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
  });
  taskInput.value = " ";
  //location.reload();
  console.log("Task added.");
  }
}

function renderTasks(doc){
  const taskList = document.getElementById("task-list");
  const taskItem = document.createElement("li");
  taskItem.className = "task-item";
  taskItem.innerHTML = `
  <span>${doc.data().task}</span>
  <button onclick="deleteTask('${doc.id}')">Delete</button>
  `;
  taskList.appendChild(taskItem);
}

db.collection("tasks")
    .orderBy("timestamp", "desc")
    .onSnapshot(snapshot => {
        const changes= snapshot.docChanges();
        changes.forEach(change => {
            if (change.type === "added"){
                  renderTasks(change.doc);
    }
  });
});


function deleteTask(id) {
  db.collection("tasks").doc(id).delete();
  location.reload();
}