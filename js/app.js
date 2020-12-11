

//TODOS NUESTROS EVENT LISTENER EN UNA SOLA FUNCIÓN
eventListener();









function eventListener(){

  const ui = new UI();
  //ESCONDEMOS EL PRELOADER
window.addEventListener('load',function(){
  ui.hidePreloader();//usamos el método que tenemos en el prototipo del objeto

});
// FIN PRELOADER
/* ------------------------------------------------------------------ */
//NAVBAR
const toggler = document.querySelector('.navBtn')
toggler.addEventListener('click',function() {  
  ui.showNav();
});
/* -------------------------------------------------------------------------- */
//CONTROLAR VIDEO

document.querySelector('.video__switch').addEventListener('click', function(){
  ui.videoControls();
});
/* ------------------------------------------------------------------- */
//SUBMIT FORM

document.querySelector('.drink-form').addEventListener('submit',function(event){
  event.preventDefault();
  const name = document.querySelector('.input-name').value;
  const lastName = document.querySelector('.input-lastname').value;
  const email = document.querySelector('.input-email').value;

  let value = ui.checkEmpty(name,lastName,email);

  if(value){
    let customer = new Customer(name,lastName,email);
    console.log(customer);
    ui.showFeedback('Cliente agregrago a la lista','success');
    ui.addCustomer(customer);
    ui.clearFields();
  }
  else{
    ui.showFeedback('Algunos valores están vacíos','error');
  } 

});

//ICONOS DEL MODAL

const links = document.querySelectorAll('.work-item__icon');

links.forEach(function(item){
  item.addEventListener('click',function(event){
    ui.showModal(event);
  })
});

//OCULTAR MODAL
document.querySelector('.work-modal__close').addEventListener('click',function(){
  ui.closeModal();
});




}

//objeto UI 
function UI(){

}

//Creamos  las callback functions como métodos prototipo del objeto UI
UI.prototype.hidePreloader = function(){
  document.querySelector('.preloader').style.display = 'none';
}
//navbar
UI.prototype.showNav = function(){
  document.querySelector('.nav').classList.toggle('navMove'); 
}
//pley video
UI.prototype.videoControls = function(){
  let btn =document.querySelector('.video__switch-btn');
  if(!btn.classList.contains('video__switch-move')){
    btn.classList.add('video__switch-move');
    document.querySelector('.video__item').pause();
  } 
  else{
    btn.classList.remove('video__switch-move');
    document.querySelector('.video__item').play();
  }
  

}
//revisar campos vacíos

UI.prototype.checkEmpty = function(name,lastName,email){
  let result;

  if(name === '' || lastName === '' || email ===''){
    result = false;
  }
  else{
    result = true;
  }

  return result;
}

UI.prototype.showFeedback = function(text,type){
  if(type === 'success'){
    let feedback = document.querySelector('.drink-form__feedback');
    feedback.classList.add('success');
    feedback.innerText = text;
    this.removeAlert('success');
  }
  else if (type === 'error'){
    let feedback = document.querySelector('.drink-form__feedback');
    feedback.classList.add('error');
    feedback.innerText = text;
    this.removeAlert('error');
    
  }
}

UI.prototype.removeAlert = function(type){
    setTimeout(function(){
    let feedback = document.querySelector('.drink-form__feedback');
    feedback.classList.remove(type);
    
  },3000);
}

//AGREGAR CLIENTE AL UI
UI.prototype.addCustomer = function(customer){
  const images = [1, 2, 3, 4, 5];
  let random =  Math.floor(Math.random()*(images.length));
  const div = document.createElement('div');
  div.classList.add('person');
  div.innerHTML = `<img src="img/person-${random}.jpeg" alt="person" class="person_thumbnail">
  <h4 class="person__name">${customer.name}</h4>
  <h4 class="person__lastname">${customer.lastname}</h4>`

  document.querySelector('.drink-card__list').appendChild(div);
}

//limpiar Campos

UI.prototype.clearFields = function(){
  document.querySelector('.input-name').value = '';
  document.querySelector('.input-lastname').value ='';
  document.querySelector('.input-email').value = '';
}
//MOSTRAR MODAL
UI.prototype.showModal = function(event){
  event.preventDefault();
  if(event.target.parentElement.classList.contains('work-item__icon')){
    let id = event.target.parentElement.dataset.id;
    
    const modal = document.querySelector('.work-modal');
    const modalItem = document.querySelector('.work-modal__item');

    modal.classList.add('work-modal--show');
    let result = modalItem.style.backgroundImage = `url(img/work-${id}.jpeg)`;
  }
}

UI.prototype.closeModal = function(){
  document.querySelector('.work-modal').classList.remove('work-modal--show');
}



//CONSTRUCTORA DE CLIENTES
function Customer(name,lastname,email){
  this.name = name,
  this.lastname = lastname,
  this.email = email
}


