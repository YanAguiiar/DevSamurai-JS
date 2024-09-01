const contacts = [
  {
    "name":"Jhon Doe",
    "email":"john@example.com",
    "phone":"55 5555-5555",
    "tag":[
      "Friends",
      "Work"
    ]
  },
  {
    "name":"Jane Smith",
    "email":"jane@example.com",
    "phone":"55 5555-5555",
    "tag":[
      "Friends"
    ],
  },
  {
    "name":"Bob Jhonson",
    "email":"bob@example.com",
    "phone":"55 5555-5555",
    "tag":[
      "Family"
    ]
  },
  {
    "name":"Nilton",
    "email":"nilton@serasa.com",
    "phone":"55 5555-5555",
    "tag":[
      "Work"
    ]
  }
];

const tagContacts = [
  {
    "tagName":"Friends",
    "contacts":[0,1]
  },
  {
    "tagName":"Family",
    "contacts":[2]
  },
  {
    "tagName":"Work",
    "contacts":[0,2]
  }
];
/* Listas contatos e Etiquetas */
const listaContatos = document.getElementById('contactList');
const listaEtiquetas = document.getElementById('tagList');
/* Elementos referentes a adicionar contatos */
const btnAddContact = document.getElementById('addContact');
const contactEmail = document.getElementById('contactEmail');
const contactName = document.getElementById('contactName');
const contactPhone = document.getElementById('contactPhone');
/* Elementos referente a adicionar tags */
const btnAddTag = document.getElementById('addTag');
const newTag = document.getElementById('newTag');

/* Referente a editar o contato */
const modal = document.getElementById('modal');
const editNameContact = document.getElementById('editNameContact');
const editEmailContact = document.getElementById('editEmailContact');
const editPhoneContact = document.getElementById('editPhoneContact');
const saveEditContact = document.getElementById('saveEditContact');

function gerarListas() {
  for (let itens of contacts){
    adicionarContatos(itens)
  }
}

gerarListas();

function adicionarContatos(itens) {
  const contactDiv = document.createElement('div');
  const pContactName = document.createElement('p');
  const pContactEmailPhone = document.createElement('p');
  const tagDiv = document.createElement('div');
  const iEdit = document.createElement('i');
  const iDelete = document.createElement('i');
  const actions = document.createElement('div');

  iEdit.className = 'bx bx-edit bx-sm';
  iDelete.className = 'bx bx-trash bx-sm';

  iEdit.onclick = function () {
    modal.showModal();
    document.getElementById('editNameContact').value = itens.name;
    document.getElementById('editEmailContact').value = itens.email;
    document.getElementById('editPhoneContact').value = itens.phone;
  }
  /* Colocar onclick para estar removendo o contato */

  contactDiv.className = 'contact-item'
  pContactName.className = 'name'
  pContactEmailPhone.className = 'email'
  tagDiv.className = 'tags'

  pContactName.textContent = itens.name
  pContactEmailPhone.textContent = `${itens.email} | ${itens.phone}`

  contactDiv.appendChild(pContactName)
  contactDiv.appendChild(pContactEmailPhone)
  contactDiv.appendChild(tagDiv)
  listaContatos.appendChild(contactDiv)
  actions.appendChild(iEdit)
  actions.appendChild(iDelete)
  contactDiv.appendChild(actions)
  

 /* Criação dos elementos tags, nos contatos. */
  for (tags of itens.tag){
    const tagSpan = document.createElement('span');
    tagSpan.className = 'tag';
    tagSpan.textContent = tags;
    tagDiv.appendChild(tagSpan);
    }
}

btnAddContact.addEventListener('click', (e) => {
  e.preventDefault();
  contacts.push({
    name: contactName.value,
    email: contactEmail.value,
    phone: contactPhone.value,
    tag: []
  });
  adicionarContatos(contacts[contacts.length - 1]);
});

