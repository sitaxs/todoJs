//  Import axios for det information instead of fetch
import axios from 'https://cdn.jsdelivr.net/npm/axios@1.6.7/+esm';
const httpTodo = "https://jsonplaceholder.typicode.com/";
let allTodo = [];
let mainListTodo = [];
const step = 10;
let begggingNumberList = 0;

const allDeleteTodo = [];
let state = "all";

async function fetchInfotmation() {
  try {
    const response = await axios.get(`${httpTodo}todos`);
    // Show 20 items
    allTodo = response.data.slice(0, 20);
    console.log(allTodo);
    showNextList();
  } catch(error) {
    console.log(error)
  }
}

// add error when you get infor 

//   //////////////////////////////////////////////////
const divTodo = document.getElementById("todo");
const ulTodo = document.createElement("ul");
divTodo.appendChild(ulTodo);

const btnMore = document.createElement("button");
btnMore.classList.add("btnMore");
btnMore.innerText = "Load More +10";
divTodo.appendChild(btnMore);

// //////////////////////////////////////////////////
function showNextList() {
  const nextItems = mainListTodo.slice(
    begggingNumberList,
    begggingNumberList + step
  );
  nextItems.forEach((todo) => {
    createLi(todo);
  });
  begggingNumberList += step;

  if (begggingNumberList >= mainListTodo.length) {
    btnMore.style.display = "none";
  } else {
    btnMore.style.display = "block";
  }
}
// ////////////////////////////////////////////////////
btnMore.addEventListener("click", function () {
  showNextList();
});

function createLi(item) {
  const li = document.createElement("li");
  li.classList.add("todoItem");
  ulTodo.appendChild(li);
  li.innerText = item.title;

  const divForDeleteCatagor = document.createElement("div");
  divForDeleteCatagor.classList.add("divForDeleteCatagor");
  li.appendChild(divForDeleteCatagor);

  const btnDelete = document.createElement("button");
  btnDelete.innerText = "❌️";
  btnDelete.classList.add("btnDelete");
  divForDeleteCatagor.appendChild(btnDelete);

  btnDelete.addEventListener("click", function () {
    li.remove();
    allTodo = allTodo.filter((it) => {
      return it.id != item.id;
    });
    allDeleteTodo.push(item);
    console.log(item.title);
    console.log(allTodo);
    console.log(allDeleteTodo);
  });

  const labelDoneInProcess = document.createElement("label");
  divForDeleteCatagor.appendChild(labelDoneInProcess);
  labelDoneInProcess.htmlFor = "uniqueId";

  const selectDoneInProcess = document.createElement("select");
  selectDoneInProcess.id = "uniqueId";
  divForDeleteCatagor.appendChild(selectDoneInProcess);

  const optionDoneInProcess = [
    { value: "done", text: "Done" },
    { value: "inProcess", text: "In process" },
  ];

  optionDoneInProcess.forEach((option) => {
    const optionDoneInProcess = document.createElement("option");
    optionDoneInProcess.innerText = option.text;
    optionDoneInProcess.value = option.value;
    selectDoneInProcess.appendChild(optionDoneInProcess);
  });

  if (item.completed === true) {
    selectDoneInProcess.value = "done";
  } else {
    selectDoneInProcess.value = "inProcess";
  }
  selectDoneInProcess.addEventListener("change", function () {
    if (selectDoneInProcess.value === "done") {
      item.completed = true;
      li.style.textDecoration = "line-through";
      li.style.opacity = "0.7";
    } else {
      item.completed = false;
      li.style.textDecoration = "none";
      li.style.opacity = "1";
    }

    // Логіка: якщо ми у фільтрі, і статус змінився - прибираємо елемент
    if (currentMode === "done" && item.completed === false) {
      li.remove();
    }
    if (currentMode === "inProcess" && item.completed === true) {
      li.remove();
    }
  });
}

btnMore.addEventListener("click", function () {
  showNextList();
});

const btnDone = document.getElementById("btnDone");
const btnInProcess = document.getElementById("btnInProcess");

btnDone.addEventListener("click", function () {
  showDoneInProcess(true);
});

btnInProcess.addEventListener("click", function () {
  showDoneInProcess(false);
  console.log(filterDoneInProcess);
});

function showDoneInProcess(state) {
  ulTodo.innerText = "";

  const filterDoneInProcess = allTodo.filter((item) => {
    return item.completed === state;
  });

  if (filterDoneInProcess.length === 0) {
    ulTodo.innerText = "Empty";
  } else {
    mainListTodo = filterDoneInProcess;
    showNextList();
  }
}

const btnSeeTodo = document.getElementById("btnSeeTodo");
btnSeeTodo.addEventListener("click", function () {
  console.log("Hello in b tn")
  // ulTodo.innerText = ""; // Очищаємо список
  // currentMode = "all"; // Режим "Всі"
  // begggingNumberList = 0; // Скидаємо лічильник
fetchInfotmation()
  // showNextList(); // Запускаємо показ з нуля
});

// ///////////////////////////

const btnDelete = document.getElementById("btnDelete");
btnDelete.addEventListener("click", function () {
  ulTodo.innerText = "";
  mainListTodo = allDeleteTodo;
  begggingNumberList = 0;
  if (mainListTodo.length === 0) {
    ulTodo.innerText = "Кошик пустий";
    btnMore.style.display = "none";
  } else {
    // 5. Малюємо
    showNextList();
  }
});
