const htttp = "https://jsonplaceholder.typicode.com/";
const btn = document.getElementById("btn");
const ulContainer = document.createElement("ul");
document.body.appendChild(ulContainer);

btn.addEventListener("click", () => {
  ulContainer.innerText = "Завантаження...";
  fetch(`${htttp}users`)
    .then((data) => data.json())
    .then((users) => {
      ulContainer.innerText = "";
      const userData = users.map((data) => {
        return {
          name: data.name,
          surnmae: data.username,
        };
      });
      userData.forEach(function (item) {
        const li = document.createElement("li");
        li.innerText = `Name: ${item.name}, Username: ${item.surnmae}`;
        ulContainer.appendChild(li);
      });
    })
    .catch((error) => console.error("Помилка:", error));
});


const filter = document.getElementById("filter");
const output = document.getElementById("output");
const input = document.getElementById("falseOrTrue");

const containerUl = document.createElement("ul");
output.appendChild(containerUl);

filter.addEventListener("click", function () {
  containerUl.innerText = " Завантаження...";

 const textValue = input.value.trim().toLowerCase();

  if (textValue !== "false" && textValue !== "true") {
    containerUl.innerText = "Помилка";
    input.value = "";
    return;
  }

  const needCompleted = textValue === "true";
  fetch(`${htttp}todos`)
    .then((data) => data.json())
    .then((data) => {
      containerUl.innerText = "";
      const informFalse = data.filter((data) => {
        return data.completed === needCompleted;
      });
      informFalse.forEach((data) => {
        const li = document.createElement("li");
        li.innerText = `${data.title}`;
        containerUl.appendChild(li);
      });
    })
    .catch((error) => console.error("Помилка:", error));
});
