import { TODOS_STORAGE_KEY } from "./constants";
import { createTodosModel } from "./model";
import { createStorage } from "./storage";
import { createView } from "./view";

const inputNode = document.querySelector(".js-input");
const addTaskBtnNode = document.querySelector(".js-add-task-btn");
const clearBtnNode = document.querySelector(".js-clear-btn");

const initialTodos = [];
const model = createTodosModel(initialTodos);
const view = createView(".js-output");
const storage = createStorage(TODOS_STORAGE_KEY);

const storageTodos = storage.pull().then((todos) => {
  model.update(todos);

  view.render(model.get());
});

addTaskBtnNode.addEventListener("click", function () {
  const todo = {
    title: inputNode.value,
    status: "active",
  };

  model.add(todo);

  view.render(model.get());

  storage.push(todo);
  //in case of error show in console - undone
});

clearBtnNode.addEventListener("click", function () {
  model.clear();

  view.render(model.get());

  storage.push(model.get());
});

function triggerBtnEnter(e) {
  if (e.key === "Enter") {
    e.preventDefault();
    document.getElementById("addTaskBtn").click();
  }
}

inputNode.addEventListener("keypress", triggerBtnEnter);
