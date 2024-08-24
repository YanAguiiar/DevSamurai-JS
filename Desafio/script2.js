const idButaum = document.getElementById('butaumEnviar');

const url = 'https://hook.us1.make.com/pt78a1wba97xpm3km1of2ry83a8vfs0q';
const data = {
  "tipe": "TASK"
};

const xhr = new XMLHttpRequest();
xhr.open("POST", url, true);
xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

let tarefas = []; // Inicializa o array de tarefas

xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
        const response = JSON.parse(xhr.responseText);
        console.log('Success:', response);

        // Mapeando a resposta para o formato esperado
        tarefas = response.map(frela => ({
            id: frela[0],  // Acessa a chave numérica 0
            nome: frela[1] // Acessa a chave numérica 1
        }));

        // Iterando sobre as tarefas e adicionando-as à lista
        for (let tarefa of tarefas) {
            addTarefa(tarefa);
        }
    } else if (xhr.readyState === 4) {
        console.error('Error:', xhr.statusText);
    }
};

xhr.send(JSON.stringify(data));

function addTarefa(frela) {
  const ul = document.getElementById('listaFrela');
  const li = document.createElement('li');
  li.textContent = ' # ' + frela.id + ' → ' + frela.nome;
  ul.appendChild(li);
}

idButaum.addEventListener('click', (e) => {
  const ul = document.getElementById('listaFrela');
  const input = document.getElementById('idFrela');
  const nextID = tarefas.length + 1;
  e.preventDefault();

  // Adiciona a nova tarefa ao array e à lista
  tarefas.push({
    nome: input.value,
    id: nextID
  });
  input.value = '';
  addTarefa(tarefas[tarefas.length - 1]);
});
