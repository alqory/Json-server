const Postlist = document.querySelector('.post-list')
const AddForm  = document.querySelector('.add-form')
const titleValue = document.querySelector('#form-title')
const bodyValue  = document.querySelector('#form-body')
const btn   = document.querySelector('.btn-submit')

const url = 'http://localhost:3000/posts'

function DisplayData(data) {
    return  `  <div class="col-sm-4">
                    <div class="card" style="margin-bottom:10px;">
                        <div class="card-body" data-id=${data.id}>
                            <p>${data.time}</p>
                            <h5 class="card-title">${data.title}</h5>
                            <p class="card-text">${data.post}</p>
                            <a href="#" class="card-link" id="edit-post">Edit</a>
                            <a href="#" class="card-link" id="hapus-post">Hapus</a>
                        </div>
                    </div>
                </div>`
}

// Get data
async function getData() {
    const resquest = await fetch(url)
    const response = await resquest.json()

    const data = response.map(res => DisplayData(res))
    Postlist.innerHTML += data;
}

getData();

// POST Method
AddForm.addEventListener('submit', async () => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    console.log('post it!!')

    try {
        const response = await fetch(url, {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json'
           },
           body: JSON.stringify({
                                title: titleValue.value,
                                post : bodyValue.value,
                                time : new Date().toLocaleDateString(undefined, options)
                                })
                            });

         const data = await response.json();
         location.reload()
         console.log(data);

       } catch(error) {
          console.log(error)
         } 


    })


document.addEventListener('click', (e)=> {
    // e.preventDefault()

    let id = e.target.parentElement.getAttribute('data-id')
    const hapusBtn = e.target.id == 'hapus-post'
    const editBtn  = e.target.id == 'edit-post'

    // Delete Method

    if(hapusBtn){
        fetch(`http://localhost:3000/posts/${id}`, {
            method : 'DELETE',
        })
        .then(res => {
            res.json()
            location.reload()
            console.log('Delete it!')
        })
    }

    if(editBtn){

        const parent = e.target.parentElement
        let titlePost = parent.querySelector('.card-title').textContent
        let bodyPost  = parent.querySelector('.card-text').textContent
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

        titleValue.value = titlePost
        bodyValue.value  = bodyPost
        
        console.log(titleValue.value)
        btn.addEventListener('click', (e) => {
            e.preventDefault()

            fetch(`http://localhost:3000/posts/${id}`, {
                method : 'PATCH',
                headers : {
                    'Content-Type': 'application/json'
                },
                body : JSON.stringify({
                    title : titleValue.value,
                    post : bodyValue.value,
                    time : new Date().toLocaleDateString(undefined, options)
                })

            })
            .then(res => {
                res.json()
                location.reload()
                console.log('Update it!!!')

            })
        })

        
    }

})
