const cards = document.querySelectorAll('.card');
const expandButtons = document.querySelectorAll('.expand-button');
const PhotosUpload = {
  uploadLimit: 5,
  handleFileInput(event) {
    const { files: fileList } = event.target
    const { uploadLimit } = PhotosUpload

    if(fileList.length > uploadLimit ) {
      alert(`envie no maximo ${uploadLimit} fotos`)
      event.preventDefault()
      return
    }

    Array.from(fileList).forEach(file => {
      const reader = new FileReader()

      reader.onload = () => {
        const image = new Image()
        image.src = String(reader.result)

        const div = document.createElement('div')
        div.classList.add('photo')
        
        div.onclick = () => alert('cliquei')
      
        div.appendChild(image)

        document.querySelector('#photos-preview').appendChild(div)
    }
    reader.readAsDataURL(file)
  })
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
