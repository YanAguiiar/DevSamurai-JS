const idButaum = document.getElementById('butaumEnviar');
const tarefas = [
  {
    nome: 'Fazer café',
    id: '1'
  },
  {
    nome: 'Estudar',
    id: '2'
  },
  {
    nome: 'Fazer exercícios',
    id: '3'
  }
];
for (let tarefa of tarefas) {
  addTarefa(tarefa);
}

function addTarefa (frela){
  const ul = document.getElementById('listaFrela');
  const li = document.createElement('li');
  li.id = frela.id;
  li.textContent = ' # ' + frela.id + ' → ' + frela.nome;
  ul.appendChild(li);
  
};

idButaum.addEventListener('click', (e) => {
  const ul = document.getElementById('listaFrela');
  const input = document.getElementById('idFrela');
  const nextID = tarefas.length + 1;
  e.preventDefault();
  
  tarefas.push({
    nome: input.value,
    id: nextID
  });
  input.value = '';
  addTarefa(tarefas[tarefas.length - 1]);

});

/* Fim area de adição de tasks */

const idButaum2 = document.getElementById('butaumRemover');
const inputRemover = document.getElementById('idRemover').value - 1;



function removeTask() {
  tarefas.splice(inputRemover, 1);
  console.log(tarefas);
  removerElemento();
};

function removerElemento() {
  const elementRemover = document.getElementById('idRemover').value;
  const elementString = elementRemover.toString();

  const elementDel = document.getElementById(elementString)
  elementDel.remove();
  idRemover.value = '';
  console.log(elementString);
}

idButaum2.addEventListener('click', (e) => {
  e.preventDefault();
  removeTask();

});

//Limpar a lista de tarefas, e realizar o "for" novamente.
//Testar remover li através do ID