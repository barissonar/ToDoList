

     let IdCounter = localStorage.getItem('IdCounter') ? Number(localStorage.getItem('IdCounter')) : 1;
     
     let globalListDOM = document.querySelector('#list');

     for (let i=0 ; i < localStorage.length ; i++){

        if ( localStorage.key(i) !== 'IdCounter' ) {

        let key = localStorage.key(i);
        let storageDataObj = JSON.parse(localStorage.getItem(key));
        let liDOM = document.createElement('li');
        liDOM.id = `task-${key}`;
        liDOM.onclick = function() {
          selectElement(this);
       };
       
       liDOM.style.display = 'flex';
       liDOM.style.flexDirection = 'row';
       liDOM.style.justifyContent = 'space-between';
       liDOM.innerHTML = `<span>${storageDataObj.input}</span> <span><button id='${key}' 
                          onclick='removeElement(this)' type='button' class='btn btn-danger'>
                          <i class="bi bi-x-lg"></i></button></span>`
      
       if (storageDataObj.select){
        liDOM.style.backgroundColor = '#006666';
        liDOM.style.textDecoration = 'line-through';
        liDOM.innerHTML = `<i class="bi bi-check-lg"></i> ${liDOM.innerHTML}`;
       }                   

       globalListDOM.append(liDOM);

      }

     }

function newElement(){
     let InputDOM = document.querySelector('#task');
     if (InputDOM.value){
     let listDOM = document.querySelector('#list');
     let liDOM = document.createElement('li');
     liDOM.id = `task-${IdCounter}`;
     liDOM.onclick = function() {
        selectElement(this);
     };
     liDOM.style.display = 'flex';
     liDOM.style.flexDirection = 'row';
     liDOM.style.justifyContent = 'space-between';
     liDOM.innerHTML = `<span>${InputDOM.value}</span> <span><button  id='${IdCounter}' 
                        onclick='removeElement(this)' type='button' class='btn btn-danger'>
                        <i class="bi bi-x-lg"></i></button></span>`

     let storageObj = {input:`${InputDOM.value}`,select:false}
   
     localStorage.setItem(`${IdCounter}`,JSON.stringify(storageObj))

     IdCounter ++;

     localStorage.setItem('IdCounter',`${IdCounter}`)

     listDOM.append(liDOM)
     let toast = document.querySelector('.success');
     let bootstrapToast = new bootstrap.Toast(toast);
     bootstrapToast.show();
     }
     else {
     let toast = document.querySelector('.error');
     let bootstrapToast = new bootstrap.Toast(toast);
     bootstrapToast.show();
     }

}

function selectElement(element){
    if (element.style.textDecoration === 'line-through'){
        element.style.backgroundColor = 'white';
        element.style.textDecoration =  'none';
        element.innerHTML = element.innerHTML.replace('<i class="bi bi-check-lg"></i>',"");

        let idStorage = element.id.split("-")[1];
        storageDataObj = JSON.parse(localStorage.getItem(idStorage));
        storageDataObj.select = false;
        localStorage.setItem(idStorage,JSON.stringify(storageDataObj))
        
    }
    else {
      
    element.style.backgroundColor = '#006666';
    element.style.textDecoration = 'line-through';
    element.innerHTML = `<i class="bi bi-check-lg"></i> ${element.innerHTML}`;

    let idStorage = element.id.split("-")[1];
    storageDataObj = JSON.parse(localStorage.getItem(idStorage));
    storageDataObj.select = true;
    localStorage.setItem(idStorage,JSON.stringify(storageDataObj))


    }
}

function removeElement(element){
   
  removeLiElement = document.querySelector(`#task-${element.id}`);
  removeLiElement.remove();
  localStorage.removeItem(`${element.id}`)

}


