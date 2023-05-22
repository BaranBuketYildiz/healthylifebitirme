
const createUser = (data) => {
    let productContainer = document.querySelector('.users');
    productContainer.innerHTML += `
       
    <tr>
    <td>
      <div class="d-flex px-2 py-1">
       
        <div class="d-flex flex-column justify-content-center">
          <h6 class="mb-0 text-sm">${data.name}</h6>
          <p class="text-xs text-secondary mb-0">${data.name}</p>
        </div>
      </div>
    </td>
    <td>
      <p class="text-xs font-weight-bold mb-0">${data.email}</p>
    </td>
   
    <td class="align-middle">
    <button class="text-secondary font-weight-bold text-xs" onclick="deleteItem('${data.email}') || deleteItem('${data.id}') " >SİL</button>

    </td>
  </tr>
         `
   
}

const deleteItem = (email, id) => {
    fetch('/delete-users', {
        method: 'post',
        headers: new Headers({'Content-Type': 'application/json'}),
        body: JSON.stringify({email:email, id:id})

    }).then(res => res.json())
    .then(data => {
        // process data
        if(data == 'success'){
            location.reload();
        } else{
            showAlert('some error occured');
        }
    })
}
const deleteItemm = (id) => {
  fetch('/delete-users', {
      method: 'post',
      headers: new Headers({'Content-Type': 'application/json'}),
      body: JSON.stringify({id:id})

  }).then(res => res.json())
  .then(data => {
      // process data
      if(data == 'success'){
          location.reload();
      } else{
          showAlert('some error occured');
      }
  })
}

