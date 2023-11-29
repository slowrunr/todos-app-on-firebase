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

const storageTodos = storage.pull();

if (storageTodos) {
  model.update(storageTodos);
}

view.render(model.get());

addTaskBtnNode.addEventListener("click", function () {
  const todo = inputNode.value;

  model.add(todo);

  view.render(model.get());

  storage.push(model.get());
});

clearBtnNode.addEventListener("click", function () {
  model.clear();

  view.render(model.get());

  storage.push(model.get());
});
