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

//FUNÇÕES
function addItem(e){
    e.preventDefault();
    //console.log(tarefa.value);
    const value = tarefa.value;
    const id = new Date().getTime().toString();
    
    if(value && !editFlag){
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
    //localStorage.removeItem('lista');
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

    //APAGANDO DO BANCO DE DADOS
    //removeFromLocalStorage(id);
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
    console.log('adicionado ao banco de dados');
}

function removeFromLocalStorage(id){}
function editLocalStorage (id,value){};

//CONFIGURAÇÃO