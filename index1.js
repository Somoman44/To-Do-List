let taskInput = document.querySelector("#taskInput");
let addTaskButton = document.querySelector("#addTaskButton");
let taskList = document.querySelector("#taskList");


addTaskButton.onclick = function(){
    this.classList.toggle("tskFocus");
    setTimeout(function(){
        addTaskButton.classList.remove("tskFocus");
    },100);
    let taskInputValue = taskInput.value.trim();
    if(taskInputValue=="")return;
    console.log(taskInputValue);
    let key = "task_" + Date.now();
    localStorage.setItem(key,JSON.stringify({text:taskInputValue,checked:false}));
    taskInput.value = "";
    displayItems();
}

document.addEventListener("keydown",function(event){
    if(event.key=="Enter"){
    addTaskButton.classList.toggle("tskFocus");
    setTimeout(function(){
        addTaskButton.classList.remove("tskFocus");
    },100);
    let taskInputValue = taskInput.value.trim();
    console.log(taskInputValue);
    let key = "task_" + Date.now();
    localStorage.setItem(key,JSON.stringify({text:taskInputValue,checked:false}));
    taskInput.value = "";
    displayItems();
    }
})

function RemoveTask(){
let deleteList = document.querySelectorAll("li");
for(const i of deleteList){
    let key = i.classList[0];
    i.lastElementChild.onclick = function(){
        let element = this;
        this.classList.toggle("dltFocus");
        setTimeout(function(){
            element.classList.toggle("dltFocus");
            localStorage.removeItem(key);
            displayItems();
        },80);
    }
}
}


displayItems();

function displayItems(){
taskList.innerHTML = "";
let keyList = [];
for(let i=0;i<localStorage.length;i++){
    if(localStorage.key(i).startsWith("task_")){
    keyList.push(localStorage.key(i));}
}
keyList.sort();
for(let i=keyList.length-1; i>=0; i--){
    let key = keyList[i];
    let taskObj = JSON.parse(localStorage.getItem(key));
    let checked = taskObj.checked?"style='text-decoration:line-through'":"";
    let checkedAttr = taskObj.checked?"checked":"";
    taskList.innerHTML +=  "<li class = "+key+" >"+ "<input type ='checkbox' "+checkedAttr +">"+ "<p "+ checked +">"+ taskObj.text +"</p>" +'<svg class = "delete" xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16"> <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/> <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/> </svg>' +"</li>";

}
    addCheckboxListeners();
    RemoveTask();
}

function addCheckboxListeners(){
    let taskElements = taskList.querySelectorAll("li");
    taskElements.forEach((li)=>{
        let key = li.classList[0];
        li.querySelector("input").addEventListener("change",function(){
            let taskObj = JSON.parse(localStorage.getItem(key));
            taskObj.checked = this.checked;
            li.querySelector("p").style.textDecoration = this.checked?"line-through":"none";
            localStorage.setItem(key,JSON.stringify(taskObj));
        })
    })
}
