//SELEÇAO DE ITEM
const alert = document.querySelector('.alerta');
const form = document.querySelector('.lista-form');
const tarefa = document.getElementById('tarefas');
const adicionar = document.querySelector('submit-btn');
const container = document.querySelector('container-tarefas');
const lista = document.querySelector('lista-tarefas');
const limparBtn = document.querySelector('clear-btn');

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

        element.innerHTML = ``
    
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