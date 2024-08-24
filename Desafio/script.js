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
  //console.log(tarefa);
}

function addTarefa (frela){
  const ul = document.getElementById('listaFrela');
  const li = document.createElement('li');
  li.textContent = ' # ' + frela.id + ' → ' + frela.nome;
  ul.appendChild(li);
  
  //console.log(tarefas);
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



// addTarefa();