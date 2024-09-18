/* Requisição para pegar informações da Lista */
const boardGeral = document.getElementById('board-geral');

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
      const statusTasks = data.statuses.map(item => item.status)
      console.log(statusTasks)
      criarElemento(statusTasks)
    })
    .catch((error) => {
      console.error('Erro:', error);
    });
    
}

function obterTarefas() {
  const url = 'https://api.clickup.com/api/v2/list/901303163858/task'
  const headers = {
    Authorization: 'pk_90622172_X3CMIRGA17LZHHWR4LFYPWYDS7J2FPNG',
    'Content-Type':'application/json'
  }
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
      const tasksLista = data.tasks.map(({name, status, id, priority, url}) => ({
        nome: name,
        status: status.status,
        id: id,
        prioridade: priority?.priority || '',
        url: url
      }))


      console.log("Separou",tasksLista)
      criarElementoTarefas(tasksLista,)
    })
    .catch((error) => {
      console.error('Erro:', error);
    });

}

function criarElemento(statusTasks) {
  for (let status of statusTasks) {
    const div = document.createElement('div');
    const hStatus = document.createElement('h3')
    hStatus.textContent = status.toUpperCase();
    div.className = 'task-section';
    div.id = status;
    div.appendChild(hStatus);
    boardGeral.appendChild(div);
    
}
}

function criarElementoTarefas(tasksLista) {
  for(let tarefa of tasksLista){
    const statusTarefa = document.getElementById(tarefa.status)
    const div = document.createElement('div');
    const spanName = document.createElement('span');
    const spanPriority = document.createElement('span');
    div.className = 'task-item';
    spanName.textContent = tarefa.nome;
    spanPriority.textContent = tarefa.prioridade.toUpperCase();
    spanPriority.className = `priority ${tarefa.prioridade.toLowerCase()}-priority`;
    div.appendChild(spanName);
    div.appendChild(spanPriority);
    statusTarefa.appendChild(div);
  }
}

obterDadosLista();
obterTarefas()







// Função para adicionar uma nova tarefa (apenas exemplo)
function addTaskExample(section, taskName, assignee, dueDate, priority) {
  const taskBoard = document.querySelector(`.${section}`);
  const newTask = document.createElement('div');
  newTask.classList.add('task-item');

  newTask.innerHTML = `
        <span>${taskName}</span>
        <div class="assignee">
            <span>${assignee}</span>
            <span class="due-date">Due: ${dueDate}</span>
        </div>
        <span class="priority ${priority.toLowerCase()}-priority">${priority}</span>
    `;

  taskBoard.appendChild(newTask);
}

// Exemplo de como adicionar uma tarefa dinamicamente
// addTask('task-section', 'Nova Tarefa Dinâmica', 'RP', 'Sep 20', 'High');
