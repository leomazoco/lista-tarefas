//SELEÇAO DE ITEM
const alert = document.querySelector('.alerta');
const form = document.querySelector('.lista-form');
const tarefa = document.getElementById('tarefas');
const adicionar = document.querySelector('.submit-btn');
const container = document.querySelector('.container-tarefas');
const lista = document.querySelector('.lista-tarefas');
const limparBtn = document.querySelector('.clear-btn');

//OPÇÃO EDITAR
let editElement;
let editFlag = false;
let editID = "";

//adicionar item
form.addEventListener('submit',addItem)

//DELETAR ITENS
limparBtn.addEventListener('click',limparLista)

window.addEventListener('DOMContentLoaded', setupItems());

//FUNÇÕES
function addItem(e){
    e.preventDefault();
    //console.log(tarefa.value);
    const value = tarefa.value;
    const id = new Date().getTime().toString();
    
    if(value && !editFlag){
        criarLista(id, value);
            //DISPLAY ALERT
        displayAlert('Tarefa adicionada a lista', 'success');
        container.classList.add('mostrar-container');

            //ADICIONANDO AO LOCAL STORAGE
        addToLocalStorage(id,value);
            //VOLTADO O PLACEHOLDER
        setBackToDefault();
    
    } else if(value && editFlag){
        editElement.innerHTML = value;
        displayAlert('Tarefa editada', 'success');
        //edit local storage
        editLocalStorage(editID,value);
        setBackToDefault();
    } else{
        displayAlert('Adicione uma tarefa', 'danger')
    }
}

//ALERTA DISPLAY
function displayAlert(text,action){
    alert.textContent = text;
    alert.classList.add(`alerta-${action}`);

    setTimeout(function(){
        alert.textContent = '';
        alert.classList.remove(`alerta-${action}`)
    }, 1500)
}

//FUNÇÃO APAGAR
function limparLista(){
    const itens = document.querySelectorAll('.tarefa-item');

    if(itens.length > 0){
        itens.forEach(function(item){
            lista.removeChild(item);
        });
    }
    container.classList.remove("mostrar-container");
    displayAlert('Tarefas apagadas', 'danger');
    setBackToDefault();
    localStorage.removeItem('lista');
}

//FUNÇÃO EDITAR
function editarItem(e){
    const element = e.currentTarget.parentElement.parentElement;
    editElement = e.currentTarget.parentElement.previousElementSibling;

    tarefa.value = editElement.innerHTML;
    editFlag = true;
    editID = element.dataset.id;
    adicionar.textContent = "editar"
}

//FUNÇÃO APAGAR
function apagarItem(e){
    const element = e.currentTarget.parentElement.parentElement;
    const id = element.dataset.id;
    lista.removeChild(element);

    if(lista.children.length === 0){
        container.classList.remove('mostrar-container');
    }
    displayAlert('Tarefa apagada', 'danger');
    setBackToDefault();

    removeFromLocalStorage(id);
}

//APAGANDO O PLACEHOLDER
function setBackToDefault(){
    tarefa.value = "";
    editFlag = false;
    editID = "";
    adicionar.textContent = "adicionar";
}

//LOCAL STORAGE
function addToLocalStorage(id, value){
    const tarefa = {id,value};
    let items = getLocalStorage();
    console.log(items)
    items.push(tarefa);
    localStorage.setItem('lista', JSON.stringify(items));
};

function removeFromLocalStorage(id){
    let items = getLocalStorage();

    items = items.filter(function(item){
        if(item.id !== id){
            return item
        }
    })
    localStorage.setItem("lista", JSON.stringify(items));
};

function editLocalStorage (id,value){
    let items = getLocalStorage();
    items = items.map(function(item){
        if(item.id === id) {
            item.value = value;
        }
        return item;
    });
    localStorage.setItem("lista", JSON.stringify(items));
};

function getLocalStorage () {
    return localStorage.getItem("lista")?JSON.parse(localStorage.getItem('lista')):[];
};

localStorage.setItem('orange', JSON.stringify(["item", "item2"]));
const oranges = JSON.parse(localStorage.getItem('orange'));
localStorage.removeItem("orange");

//CONFIGURAÇÃO
function setupItems(){
    let items = getLocalStorage();
    if (items.length > 0){
        items.forEach(function(item){
            criarLista(item.id, item.value)
        })
        container.classList.add('mostrar-container');
    }
}

function criarLista(id, value) {
    const element = document.createElement('article');
        //add class
        element.classList.add('tarefa-item');
        //add ID
        const attr = document.createAttribute('data-id');
        attr.value = id;
        element.setAttributeNode(attr);

        //Texto ao article

        element.innerHTML = `<p class="title">${value}</p>
            <div class="btn-container">
                <button type="button" class="edit-btn">
                    <i class="material-icons">edit_note</i>
                </button>
                <button type="button" class="delete-btn">
                    <i class="material-icons">delete_outline</i>
                </button>
            </div>`;
            const deleteBtn = element.querySelector('.delete-btn');
            const editBtn = element.querySelector('.edit-btn');
            deleteBtn.addEventListener('click',apagarItem);
            editBtn.addEventListener('click',editarItem);
            //APPEND CHILD
            lista.appendChild(element);
}