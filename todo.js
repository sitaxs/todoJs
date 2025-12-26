const divTodo = document.getElementById("todo");
const btnSeeTodo = document.getElementById("btnSeeTodo");

const ulTodo = document.createElement("ul");
divTodo.appendChild(ulTodo);
ulTodo.classList.add("ul");

const btnMore = document.createElement("button");
btnMore.innerText = "More + 10 Todo \\/";
btnMore.classList.add("btnMore");

const httpTodo = "https://jsonplaceholder.typicode.com/";

let allTodo = [];
let currentIndex = 0;
const step = 10;
let currentFilter = "all";

function createLI(item) {
  const li = document.createElement("li");
  ulTodo.appendChild(li);
  li.classList.add("todoItem");
  li.innerText = item.title;

  const divForDeleteCatagor = document.createElement("div");
  divForDeleteCatagor.classList.add("divForDeleteCatagor");
  li.appendChild(divForDeleteCatagor);

  const btnDlete = document.createElement("button");
  btnDlete.classList.add("btnDelete");
  btnDlete.innerText = "❌️";
  divForDeleteCatagor.appendChild(btnDlete);

    btnDlete.addEventListener("click", function(){
      li.remove();
      allTodo=allTodo.filter(i=>{
        i.id != item.id
      })
      console.log(item.title)
    })

  const stateTodo = document.createElement("label");
  //   stateTodo.innerText = "";
  divForDeleteCatagor.appendChild(stateTodo);

  const stateTodoSelect = document.createElement("select");

  const optionStateTodo = [
    { value: "done", text: "Done" },
    { value: "inProcess", text: "In process" },
  ];

  optionStateTodo.forEach((optData) => {
    const option = document.createElement("option");
    option.value = optData.value;
    option.innerText = optData.text;
    stateTodoSelect.appendChild(option);
  });

  divForDeleteCatagor.appendChild(stateTodoSelect);

  if (item.completed === true) {
    stateTodoSelect.value = "done";
  } else {
    stateTodoSelect.value = "inProcess";

  }

// stateTodoSelect.addEventListener("change", function () {
//     // А) Оновлюємо дані в масиві
//     if (stateTodoSelect.value === "done") {
//       item.completed = true;
    
//     } else {
//       item.completed = false;
      
//     }

//     // Б) Перевірка: чи треба приховати елемент з поточного списку?
//     // Якщо ми дивимось "Done", а змінили на "In Process" -> видаляємо li
//     if (currentFilter === true && item.completed === false) {
//       li.remove();
//     }
//     // Якщо ми дивимось "In Process", а змінили на "Done" -> видаляємо li
//     if (currentFilter === false && item.completed === true) {
//       li.remove();
//     }
//   });



}

function showNextBatch() {
  const nextItem = allTodo.slice(currentIndex, currentIndex + step);
  nextItem.forEach((item) => {
    createLI(item);
  });
  currentIndex += step;

  if (currentIndex >= allTodo.length) {
    btnMore.style.display = "none";
  } else {
    btnMore.style.display = "block";
  }
}

btnSeeTodo.addEventListener("click", function () {
  ulTodo.innerText = "Loading...";
  btnMore.style.display = "none";

  fetch(`${httpTodo}todos`)
    .then((data) => data.json())
    .then((todo) => {
      ulTodo.innerText = "";
      allTodo = todo;
      currentIndex = 0;
      showNextBatch();
      console.log(allTodo);
    })
    .finally((item) => {
      divTodo.appendChild(btnMore);
    })
    .catch((error) => {
      console.log(error);
    });
});

btnMore.addEventListener("click", function () {
  showNextBatch();
});

const btnDone = document.getElementById("btnDone");
const btnInProcess = document.getElementById("btnInProcess");

btnDone.addEventListener("click", function () {
  dneInProcess(true);
});

btnInProcess.addEventListener("click", function () {
  dneInProcess(false);
});

function dneInProcess(state) {
  // Якщо дані ще не завантажені, кажемо користувачу спочатку завантажити
  if (allTodo.length === 0) {
    ulTodo.innerText = "Спочатку натисніть 'See Todo' щоб завантажити дані";
    return;
  }

  currentFilter = state; // Запам'ятовуємо, який фільтр активний
  ulTodo.innerText = ""; // Очищаємо список
  btnMore.style.display = "none"; // Ховаємо кнопку More при фільтрації

  // Фільтруємо ЛОКАЛЬНИЙ масив (не робимо fetch)
  const filteredArray = allTodo.filter((todo) => {
    return todo.completed === state;
  });

  if (filteredArray.length === 0) {
    ulTodo.innerText = "Нічого не знайдено в цій категорії";
  } else {
    filteredArray.forEach((item) => {
      createLI(item);
    });
  }
}

