const inputEl = document.getElementById("input-el");
const saveInput = document.getElementById("save-input");
const deleteAll = document.getElementById("delete-all");
const links = document.getElementById("links");
const saveTab = document.getElementById("save-tab");
const deleteBtn = document.getElementById("delete");

saveInput.addEventListener("click", pushLink);
deleteAll.addEventListener("click", deleteall);
saveTab.addEventListener("click", savetab);
deleteBtn.addEventListener("click", deleteLast);
inputEl.addEventListener("keypress",function(event){
    if(event.key === "Enter"){
        pushLink();
    }
})

let myLeads = [];
renderLinks();

function updateLocal() {
  myLeads = JSON.stringify(myLeads);
  localStorage.setItem("myLeads", myLeads);
}
function pushLink() {
  myLeads.push(inputEl.value);
  inputEl.value = "";
  updateLocal();
  renderLinks();
}
function deleteall() {
  myLeads = JSON.parse(localStorage.getItem("myLeads"));
  while (myLeads.length != 0) {
    myLeads.pop();
  }
  updateLocal();
  renderLinks();
}
function savetab() {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    myLeads.push(tabs[0].url);
    inputEl.value = "";
    updateLocal();
    renderLinks();
  });
}
function deleteLast() {
  myLeads = JSON.parse(localStorage.getItem("myLeads"));
  myLeads.shift();
  updateLocal();
  renderLinks();
}

function renderLinks() {
  if (JSON.parse(localStorage.getItem("myLeads"))) {
    myLeads = localStorage.getItem("myLeads");
    myLeads = JSON.parse(myLeads);
    links.innerHTML = " ";

    for (let i in myLeads) {
      links.innerHTML += `<li><a href = "${myLeads[i]}" target="_blank"> ${myLeads[i]} </a></li>`;
    }
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
  }
}
