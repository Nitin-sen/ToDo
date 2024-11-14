const inputBox=document.getElementById("inputBox");
const addBtn=document.getElementById("addBtn");
const todoList=document.getElementById("todoList");
console.log(todoList)

let editTodo=null;

const addTodo=()=>{
    let inputText=inputBox.value.trim();
    if(inputText.length<=0)
    {
        alert("ERROR! Text length can not be ZERO(0)...!")
        return false;
    }

    if(addBtn.value==="Edit")
    {
      editTodo.target.previousElementSibling.innerHTML=inputText;
      editLocalTodos(inputText);
      addBtn.value="Add";
      inputBox.value="";
    }
    else
    {

      //creating li and p tag...
    let li=document.createElement("li");
    let p=document.createElement("p");
   
    p.innerHTML+=inputText;
    li.appendChild(p);
    todoList.appendChild(li);


    //creating edit button tag
    let editBtn=document.createElement("button");
    editBtn.innerText="Edit";
    editBtn.classList.add("btn","editBtn")
    li.appendChild(editBtn);

     //creating delete button tag..and insert it into li...tag
     let  deleteBtn=document.createElement("button");
     deleteBtn.innerText="Remove";
     deleteBtn.classList.add("btn","deleteBtn");
     li.appendChild(deleteBtn);

    inputBox.value="";

    saveLocalTodos(inputText);

    
    }
}

const updateTodo=(e)=>{
  //console.log(e.target.innerHTML)
  if(e.target.innerHTML==="Remove")
  {
    //console.log(e.target.parentElement)
    
    todoList.removeChild(e.target.parentElement);

    deleteLocalTodos(e.target.parentElement);
  }
  else if(e.target.innerHTML==="Edit")
  {
   // console.log(e.target.parentElement)
   inputBox.value=e.target.previousElementSibling.innerHTML;
   inputBox.focus();
   addBtn.value="Edit";

   editTodo=e;
   console.log(e)
  }
}

const saveLocalTodos=(todo)=>{
  let todos;
 // console.log(localStorage.getItem("todos"));
 // console.log(JSON.parse(localStorage.getItem("todos")));

 if(localStorage.getItem("todos")===null)
 {
    todos=[];
 }
 else
 {
  todos=JSON.parse(localStorage.getItem("todos"));
 }
  todos.push(todo);
 // console.log(todos)
 localStorage.setItem("todos",JSON.stringify(todos));
}

const getLocalTodos=()=>{
  if(localStorage.getItem("todos")===null)
    {
       todos=[];
    }
    else
    {
     todos=JSON.parse(localStorage.getItem("todos"));
     todos.forEach((todo)=>{
      let li=document.createElement("li");
      let p=document.createElement("p");
     
      p.innerHTML=todo;
      li.appendChild(p);
      todoList.appendChild(li);
  
  
      //creating edit button tag
      let editBtn=document.createElement("button");
      editBtn.innerText="Edit";
      editBtn.classList.add("btn","editBtn")
      li.appendChild(editBtn);
  
       //creating delete button tag..and insert it into li...tag
       let  deleteBtn=document.createElement("button");
       deleteBtn.innerText="Remove";
       deleteBtn.classList.add("btn","deleteBtn");
       li.appendChild(deleteBtn);
     })
    } 
}

const deleteLocalTodos=(todo)=>{
  let todos;
  if(localStorage.getItem("todos")===null)
    {
       todos=[];
    }
    else
    {
     todos=JSON.parse(localStorage.getItem("todos"));
    }

    let todoText=todo.children[0].innerHTML;
    let todoIndex=todos.indexOf(todoText);
    todos.splice(todoIndex,1);
    localStorage.setItem("todos",JSON.stringify(todos));
    console.log(todoIndex)
   // console.log(todoText.children[0].innerHTML);
}

const editLocalTodos=(todo)=>{

  let todos=JSON.parse(localStorage.getItem("todos"));
  let todoIndex=todos.indexOf(todo)
  todos[todoIndex]=inputBox.value;
  localStorage.setItem("todos",JSON.stringify(todos));
}

document.addEventListener('DOMContentLoaded',getLocalTodos)
addBtn.addEventListener('click',addTodo);
todoList.addEventListener('click',updateTodo)



