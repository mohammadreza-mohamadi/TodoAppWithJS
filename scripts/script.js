const container = document.querySelector(".container");
const todoesList = document.querySelector(".todoes-list");
const todoInput = document.querySelector("#todoAdd");
const todoModal = document.querySelector(".todoModal");
const todoTitle = document.querySelector("#todoTitle");

const registaerRadio = document.querySelector("#registerRadio");
const completeRadio = document.querySelector("#completedRadio");
const pendingRadio = document.querySelector("#pendingRadio");
const allRadioStatus = document.querySelectorAll('input[name="statusTodo"]');

const modalBtnEdit = document.querySelector(".modalBtnEdit");

const delModal = document.querySelector(".delModal");
const delBtn = document.querySelector(".delBtn");
const cancelBtn = document.querySelector(".cancelBtn");

const searchInput = document.querySelector('#search')

const closeIcon = document.querySelector('.closeIcon')

//Intialize todoes
let todoes = localStorage.getItem("todoes")
  ? JSON.parse(localStorage.getItem("todoes"))
  : [];

//function for dispaly Todoes
function displayTodoes(todoes) {
  let str = "";
  let i = 0;
  if (todoes.length) {
    todoes.map((todo) => {
      str += ` <tr>
        <td>${++i}</td>
        <td>${todo.title}</td>
        <td><button class="editTodo" onclick="editModal(${
          todo.id
        })">Edit</button><button class="delTodo" onclick="delTodo(${
        todo.id
      })">Del</button></td>
        <td><span class="${todo.status}">${todo.status}</span></td>
    </tr>`;
    });
  } else {
    str += "<h2>No Todoes</h2>";
  }
  todoesList.innerHTML = str;
}

// function for add todo
function addTodo() {
  let todoesAll = localStorage.getItem("todoes") ? JSON.parse(localStorage.getItem("todoes")) : [];
  if (todoInput.value != "") {
    todoesAll.push({
      id: todoes.length + Math.floor(Math.random() * 1000),
      title: todoInput.value,
      status: "register",
    });
    localStorage.setItem("todoes", JSON.stringify(todoesAll));
  }
  todoInput.value = "";
  displayTodoes(todoesAll);
}

// function for closeModal
function closeModal(domObj) {
  // todoModal.classList.add("hidden");
  domObj.classList.add("hidden");
  container.classList.remove("backdrop");
}


// function for Edit todo
function editModal(id) {
  todoModal.classList.remove("hidden");
  container.classList.add("backdrop");
  let todoUpd = JSON.parse(localStorage.getItem("todoes")).find(
    (todo) => todo.id === id
  );
  todoTitle.value = todoUpd.title;
  let status = todoUpd.status;
  console.log(status);
  switch (status) {
    case "completed":
      completeRadio.checked = true;
      break;

    case "pending":
      pendingRadio.checked = true;
      break;

    case "register":
      registaerRadio.checked = true;
      break;
  }

  let allTodoes = JSON.parse(localStorage.getItem("todoes"));
  let statusTodo;

  let ntodos;
  modalBtnEdit.addEventListener("click", function (e) {
    e.preventDefault();
    for (let rd of allRadioStatus) {
      if (rd.checked) {
        statusTodo = rd.value;
        break;
      }
    }
    ntodos = allTodoes.map((todo) => {
      if (todo.id === id) {
        console.log(statusTodo);
        return { ...todo, title: todoTitle.value, status: statusTodo };
      }
      return todo;
    });
    localStorage.setItem("todoes", JSON.stringify(ntodos));
    displayTodoes(ntodos);
    closeModal(todoModal);
  });
}

closeIcon.addEventListener("click",()=>{
  closeModal(todoModal)
})

// function for delete Todo
function delTodo(id) {
  delModal.classList.remove("hidden");
  container.classList.add("backdrop");
  delBtn.addEventListener("click", function () {
    let todoesAll = JSON.parse(localStorage.getItem("todoes"));
    const filterTodo = todoesAll.filter((todo) => todo.id !== id);
    localStorage.setItem("todoes", JSON.stringify(filterTodo));
    closeModal(delModal)
    displayTodoes(filterTodo);
    setTimeout(()=>{alert("deleting")},5000)
  });

  cancelBtn.addEventListener('click',function(){
    closeModal(delModal)
    displayTodoes(JSON.parse(localStorage.getItem('todoes')));
  })
}

// function for Search Todo
function searchTodo()
{
   let todoSearch = searchInput.value
   let filterTodo = JSON.parse(localStorage.getItem('todoes')).filter(todo=>{
    if(todo.title.includes(todoSearch))
      return todo
  })
  displayTodoes(filterTodo)
}


displayTodoes(todoes);
