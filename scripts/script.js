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

form.addEventListener('submit',addItem)
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
            //APPEND CHILD
            lista.appendChild(element);
            //DISPLAY ALERT
            displayAlert('Item adicionado a lista', 'success')
    
    } else if(value && editFlag){
        console.log('editando')
    
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

//LOCAL STORAGE

//CONFIGURAÇÃO