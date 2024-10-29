/* Requisição para pegar informações da Lista */
const boardGeral = document.getElementById('board-geral');
const botaoEditar = document.getElementsByClassName('bx-edit');

// Variável global para armazenar o ID da tarefa selecionada
let tarefaSelecionadaId = null;

// Editar tarefa Modal
const editNomeTarefa = document.getElementById('inputNomeTarefa');
const saveEditTarefa = document.getElementById('saveEditTask');
const descriptionTarefa = document.getElementById('inputDescricaoTarefa');
const cancelEditTarefa = document.getElementById('cancelEditTask');
const priorityTarefa = document.getElementById('inputPrioridadeTarefa');

const modal = document.getElementById('modal');

// Modal para crair nova tarefa

const btnNovaTarefa = document.getElementById('btnCriarTarefa');
const saveAddTask = document.getElementById('saveAddTask');
const cancelAddTask = document.getElementById('cancelAddTask');

const inputNomeTarefa = document.getElementById('inputNomeTarefaAdd');
const inputDescricaoTarefa = document.getElementById('inputDescricaoTarefaAdd');
const inputPrioridadeTarefa = document.getElementById('inputPrioridadeTarefaAdd');

function obterDadosLista() {
  const url = 'https://api.clickup.com/api/v2/list/901303163858';
  const headers = {
    Authorization: 'pk_90622172_X3CMIRGA17LZHHWR4LFYPWYDS7J2FPNG',
    'Content-Type': 'application/json',
  };
  fetch(url, {
    method: 'GET',
    headers: headers,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Erro ao obter dados da Lista');
      }
      return response.json();
    })
    .then((data) => {
      console.log('Sucesso', data);
      const statusTasks = data.statuses.map(item => item.status);
      console.log(statusTasks);
      criarElemento(statusTasks);
    })
    .catch((error) => {
      console.error('Erro:', error);
    });
}

function obterTarefas() {
  const url = 'https://api.clickup.com/api/v2/list/901303163858/task';
  const headers = {
    Authorization: 'pk_90622172_X3CMIRGA17LZHHWR4LFYPWYDS7J2FPNG',
    'Content-Type':'application/json',
  };
  fetch(url, {
    method: 'GET',
    headers: headers,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Erro ao obter dados da Lista');
      }
      return response.json();
    })
    .then((data) => {
      console.log('Sucesso', data);
      const tasksLista = data.tasks.map(({name, status, id, priority, url, description}) => ({
        nome: name,
        status: status.status,
        id: id,
        prioridade: priority?.priority || '',
        url: url,
        description: description,
        idPrioridade: priority?.id || '',
      }));

      console.log("Separou", tasksLista);
      criarElementoTarefas(tasksLista);
    })
    .catch((error) => {
      console.error('Erro:', error);
    });
}

function criarElemento(statusTasks) {
  for (let status of statusTasks) {
    const div = document.createElement('div');
    const hStatus = document.createElement('h3');
    hStatus.textContent = status.toUpperCase();
    div.className = 'task-section';
    div.id = status;
    div.appendChild(hStatus);
    boardGeral.appendChild(div);
  }
}

function criarElementoTarefas(tasksLista) {
  for(let tarefa of tasksLista) {
    const statusTarefa = document.getElementById(tarefa.status);
    const div = document.createElement('div');
    const spanName = document.createElement('span');
    const spanPriority = document.createElement('span');
    const iEditTarefa = document.createElement('span');
    const iDeleteTarefa = document.createElement('span');
    
    iEditTarefa.className = 'bx bx-edit bx-xs';
    iEditTarefa.onclick = function() {
      console.log('Clicou');
      editNomeTarefa.value = tarefa.nome;
      descriptionTarefa.value = tarefa.description;
      priorityTarefa.value = tarefa.idPrioridade;
      tarefaSelecionadaId = tarefa.id; // Armazena o ID da tarefa atual
      modal.showModal();
    };

    iDeleteTarefa.className = 'bx bx-trash bx-xs';
    div.className = 'task-item';
    spanName.textContent = tarefa.nome;
    spanPriority.textContent = tarefa.prioridade.toUpperCase();
    spanPriority.className = `priority ${tarefa.prioridade.toLowerCase()}-priority`;
    div.appendChild(spanName);
    div.appendChild(iEditTarefa);
    div.appendChild(iDeleteTarefa);
    div.appendChild(spanPriority);
    statusTarefa.appendChild(div);
  }
}

saveEditTarefa.addEventListener('click', function(event) {
  event.preventDefault();
  console.log('Clicou');
  modal.close();
  atualizarTarefa(tarefaSelecionadaId, editNomeTarefa.value, descriptionTarefa.value, priorityTarefa.value);
});

cancelEditTarefa.addEventListener('click', function(event) {
  event.preventDefault();
  modal.close();
});

function atualizarTarefa(idTask, name, description, priority) {
  const url = `https://api.clickup.com/api/v2/task/${idTask}`;
  const headers = {
    Authorization: 'pk_90622172_X3CMIRGA17LZHHWR4LFYPWYDS7J2FPNG',
    'Content-Type': 'application/json',
  };
  const body = {
    name: name,
    description: description,
    priority: priority,
  };

  fetch(url, {
    method: 'PUT',
    headers: headers,
    body: JSON.stringify(body),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Erro ao atualizar a tarefa');
      }
      return response.json();
    })
    .then((data) => {
      console.log('Sucesso', data);
      window.location.reload();
    })
    .catch((error) => {
      console.error('Erro:', error);
    });
}

obterDadosLista();
obterTarefas();

function criarTarefa(name, description, priority) {
  const url = 'https://api.clickup.com/api/v2/list/901303163858/task';
  const headers = {
    Authorization: 'pk_90622172_X3CMIRGA17LZHHWR4LFYPWYDS7J2FPNG',
    'Content-Type': 'application/json',
  };
  const body = {
    name: name,
    description: description,
    priority: priority,
  };
  fetch(url, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(body),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Erro ao criar a tarefa');
      }
      return response.json();
    })
    .then((data) => {
      console.log('Sucesso', data);
      window.location.reload();
    })
    .catch((error) => {
      console.error('Erro:', error);
    });
}

btnNovaTarefa.onclick = function() {
  modalAddTask.showModal();
};

cancelAddTask.onclick = function() {
  modalAddTask.close();
};

saveAddTask.addEventListener('click', function(event) {
  event.preventDefault();
  criarTarefa(inputNomeTarefa.value, inputDescricaoTarefa.value, inputPrioridadeTarefa.value);
  modalAddTask.close();
});