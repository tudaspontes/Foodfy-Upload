const cards = document.querySelectorAll('.card');
const expandButtons = document.querySelectorAll('.expand-button');
const PhotosUpload = {
  preview: document.querySelector('#photos-preview'),
  uploadLimit: 5,
  handleFileInput(event) {
    const { files: fileList } = event.target
    
    if(PhotosUpload.hasLimit(event)) return

    Array.from(fileList).forEach(file => {
      const reader = new FileReader()

      reader.onload = () => {
        const image = new Image()
        image.src = String(reader.result)

        const div = PhotosUpload.getContainer(image)
        PhotosUpload.preview.appendChild(div)
        
    }
    reader.readAsDataURL(file)
  })
  },
  hasLimit(event) {
    const { uploadLimit } = PhotosUpload
    const { files:fileList } = event.target

    if(fileList.length > uploadLimit ) {
      alert(`envie no maximo ${uploadLimit} fotos`)
      event.preventDefault()
      return true
    }

    return false

  },
  getContainer(image) {
      const div = document.createElement('div')
      div.classList.add('photo')
      
      div.onclick = PhotosUpload.removePhoto
    
      div.appendChild(image)

      div.appendChild(PhotosUpload.getRemoveButton())

      return div
  },
  getRemoveButton() {
    const button = document.createElement('i')
    button.classList.add('material-icons')
    button.innerHTML = "close"
    return button
  },
  removePhoto(event) {
    const photoDiv = event.target.parentNode
    const photosArray = Array.from(PhotosUpload.preview.children)
    const index = photosArray.indexOf(photoDiv)

    photoDiv.remove()
  }
}


for (let card of cards) {
  card.addEventListener('click', function() {
    const id = card.getAttribute('data-id');

    // window.location.href = `/recipes/${id - 1}`;
  })
}

for (let button of expandButtons) {
  button.addEventListener('click', function() {
    const id = button.getAttribute('data-js');

    button.classList.toggle('hide');
    document.querySelector(`#${id}`).classList.toggle('hide');
    changeButtonText(button);
  });
}

function changeButtonText(button) {
  if (button.classList.contains('hide')) {
    button.innerText = 'show';
  } else {
    button.innerText = 'hide';
  }
}

function addIngredient() {
  const ingredients = document.querySelector("#ingredients");
  const fieldContainer = document.querySelectorAll(".ingredient");

  // to make a clone of the last ingredient
  const newField = fieldContainer[fieldContainer.length - 1].cloneNode(true);

  // do not add a new input if empty
  if (newField.children[0].value == "") return false;

  // leave the input value empty
  newField.children[0].value = "";
  ingredients.appendChild(newField);
}

function addStep() {
  const ingredients = document.querySelector("#directions");
  const fieldContainer = document.querySelectorAll(".direction");

  // to make a clone of the last ingredient
  const newField = fieldContainer[fieldContainer.length - 1].cloneNode(true);

  // do not add a new input if empty
  if (newField.children[0].value == "") return false;

  // leave the input value empty
  newField.children[0].value = "";
  ingredients.appendChild(newField);
}

document
  .querySelector(".add-ingredient")
  .addEventListener("click", addIngredient);

document
  .querySelector(".add-step")
  .addEventListener("click", addStep);
