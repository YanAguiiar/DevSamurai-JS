const contacts = [
  {
    "name":"Jhon Doe",
    "email":"john@example.com",
    "phone":"55 5555-5555",
    "id": "1",
    "tag":[
      "Friends",
      "Work"
    ]
  },
  {
    "name":"Jane Smith",
    "email":"jane@example.com",
    "phone":"55 5555-5555",
    "id": "2",
    "tag":[
      "Friends"
    ],
  },
  {
    "name":"Bob Jhonson",
    "email":"bob@example.com",
    "phone":"55 5555-5555",
    "id": "3",
    "tag":[
    "Family", "Coquinha gelada"
    ]
  },
  {
    "name":"Nilton",
    "email":"nilton@serasa.com",
    "phone":"55 5555-5555",
    "id": "4",
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
  },
  {
    "tagName":"Coquinha gelada",
    "contacts":[2]
  },
  {
    "tagName":"School",
    "contacts":[]
  },
  {
    "tagName":"College",
    "contacts":[]
  },
  {
    "tagName":"University",
    "contacts":[]
  },
  {
    "tagName":"Church",
    "contacts":[]
  },
  {
    "tagName":"Sports",
    "contacts":[]
  },
  {
    "tagName":"Music",
    "contacts":[]
  },
  {
    "tagName":"Movies",
    "contacts":[]
  },
  {
    "tagName":"Books",
    "contacts":[]
  },
  {
    "tagName":"Travel",
    "contacts":[]
  },
  {
    "tagName":"Food",
    "contacts":[]
  },
  {
    "tagName":"Fashion",
    "contacts":[]
  },
  {
    "tagName":"Health",
    "contacts":[]
  },
  {
    "tagName":"Fitness",
    "contacts":[]
  },
  {
    "tagName":"Beauty",
    "contacts":[]
  },
  {
    "tagName":"Home",
    "contacts":[]
  },
  {
    "tagName":"Garden",
    "contacts":[]
  },
  {
    "tagName":"DIY",
    "contacts":[]
  },
  {
    "tagName":"Tech",
    "contacts":[]
  },
  {
    "tagName":"Auto",
    "contacts":[]
  },
  {
    "tagName":"Pets",
    "contacts":[]
  },
  {
    "tagName":"Photography",
    "contacts":[]
  },
  {
    "tagName":"Art",
    "contacts":[]
  },
  {
    "tagName":"Design",
    "contacts":[]
  },
  {
    "tagName":"Crafts",
    "contacts":[]
  },
  {
    "tagName":"Kids",
    "contacts":[]
  },
  {
    "tagName":"Parenting",
    "contacts":[]
  },
  {
    "tagName":"Weddings",
    "contacts":[]
  },
  {
    "tagName":"Events",
    "contacts":[]
  },
  {
    "tagName":"Marketing",
    "contacts":[]
  },
  {
    "tagName":"Business",
    "contacts":[]
  },
  {
    "tagName":"Finance",
    "contacts":[]
  },
  {
    "tagName":"Real Estate",
    "contacts":[]
  },
  {
    "tagName":"Travel",
    "contacts":[]
  },
  {
    "tagName":"Food",
    "contacts":[]
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
const newTag = document.getElementById('new-tag');

/* Referente a editar o contato */
const modal = document.getElementById('modal');
const editNameContact = document.getElementById('editNameContact');
const editEmailContact = document.getElementById('editEmailContact');
const editPhoneContact = document.getElementById('editPhoneContact');
const saveEditContact = document.getElementById('saveEditContact');
const cancelEditContact = document.getElementById('cancelEditContact');

/* Totais contatos e etiquetas */
const totalContacts = document.getElementById('totalContatos');
const totalTags = document.getElementById('totalEtiquetas');

function gerarListas() {
  for (let itens of contacts){
    adicionarContatos(itens)
  }
  for (let etiqueta of tagContacts){
    adicionarEtiquetas(etiqueta)
  }
  totalContacts.textContent = contacts.length;
  totalTags.textContent = tagContacts.length;
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
    modal.setAttribute('data-id', itens.id);
  }
  /* Colocar onclick para estar removendo o contato */
  iDelete.onclick = function () {
    contacts.splice(contacts.indexOf(itens), 1);
    listaContatos.innerHTML = '';
    listaEtiquetas.innerHTML = '';
    gerarListas();
  }
  
  contactDiv.className = 'contact-item'
  contactDiv.id = itens.id
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
  
  //Limpar os values dos inputs
  contactName.value = '';
  contactEmail.value = '';
  contactPhone.value = '';
 /* Criação dos elementos tags, nos contatos. */
  for (tags of itens.tag){
    const tagSpan = document.createElement('span');
    tagSpan.className = 'tag';
    tagSpan.textContent = tags;
    tagDiv.appendChild(tagSpan);
    }
}
function adicionarEtiquetas(etiqueta) {
  const tagSpan = document.createElement('span');
  tagSpan.className = 'tag';
  tagSpan.textContent = etiqueta.tagName;
  listaEtiquetas.appendChild(tagSpan);
}
btnAddContact.addEventListener('click', (e) => {
  e.preventDefault();
  contacts.push({
    name: contactName.value,
    email: contactEmail.value,
    phone: contactPhone.value,
    id: (contacts.length + 1).toString(),
    tag: []
  });
  totalContacts.textContent = contacts.length;
  adicionarContatos(contacts[contacts.length - 1]);
});

btnAddTag.addEventListener('click', (e) => {
  e.preventDefault();
  tagContacts.push({
    tagName: newTag.value,
    contacts: []
  });
  totalTags.textContent = tagContacts.length;
  newTag.value = '';
  adicionarEtiquetas(tagContacts[tagContacts.length - 1]);
});

saveEditContact.onclick = function (e) {
  modal.close();
  e.preventDefault();
  const nome = document.getElementById('editNameContact').value;
  const email = document.getElementById('editEmailContact').value;
  const phone = document.getElementById('editPhoneContact').value;
  const contactID = modal.getAttribute('data-id');
  editarDados(contacts ,nome, email, phone, contactID);
}

function editarDados(array, nome, email, phone, id) {
  const contato = array.find((contato) => contato.id === id)

  if (contato) {
    contato.name = nome;
    contato.email = email;
    contato.phone = phone;
    console.log(contato)
    listaContatos.innerHTML = '';
    listaEtiquetas.innerHTML = '';
    gerarListas();
  }
}

cancelEditContact.onclick = function (e) {
  modal.close();
  e.preventDefault();
}, false;