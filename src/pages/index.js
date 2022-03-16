import './normalize.css';
import './index.css';

const container = document.querySelector('.container');
const noTaskElement = container.querySelector('.task-container__text');
const form = container.querySelector('.input');
const addTaskButton = form.querySelector('.input__btn_action_add');
const taskContainer = container.querySelector('.task-container');

const tasks = document.querySelectorAll('.task');
const taskArr = Array.from(tasks);

let arr = [];
const task = document.querySelector('.input__text_type_task');
let valInp = task.value;

//ФУНКЦИЯ ДОБАВЛЕНИЯ ЗАДАЧИ ИЗ ТЕМПЛЕЙТА
const addTask = (taskValue) => {
  const taskTemplate = document.querySelector('#task-template').content;
  const taskElement = taskTemplate.querySelector('.task').cloneNode(true);

  taskElement.querySelector('.task__text').textContent = taskValue;

  taskElement
    .querySelector('.task__remove')
    .addEventListener('click', (evt) => {
      arr.pop(valInp);
      evt.target.closest('.task').remove();
      renderNoTask();
    });
  taskContainer.prepend(taskElement);
};

const pushTask = () => {
  if (task.value.length > 0) {
    addTask(task.value);
    arr.push(valInp);
    task.value = '';
    setSubmitButtonState();
  }
  renderHasTask();
};

addTaskButton.addEventListener('click', () => {
  pushTask();
});

const renderHasTask = () => {
  if (arr.length > 0) {
    noTaskElement.classList.add('no-task_hidden');
  }
  return;
};
const renderNoTask = () => {
  if (arr.length === 0) {
    noTaskElement.classList.remove('no-task_hidden');
  }
};

const setSubmitButtonState = (isFormValid) => {
  if (isFormValid) {
    addTaskButton.removeAttribute('disabled');
    addTaskButton.classList.remove('input__btn_disabled');
  } else {
    addTaskButton.setAttribute('disabled', true);
    addTaskButton.classList.add('input__btn_disabled');
  }
};

form.addEventListener('input', (evt) => {
  const isValid = task.value.length > 0;
  setSubmitButtonState(isValid);
});

form.addEventListener('keydown', (evt) => {
  if (evt.keyCode === 13) {
    pushTask();
  }
});
