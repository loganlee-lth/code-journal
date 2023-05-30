const $photoURL = document.querySelector('#photo-url');
const $photoPreview = document.querySelector('#photo-preview');
const $form = document.querySelector('form');

$photoURL.addEventListener('input', event => {
  const url = event.target.value;
  $photoPreview.setAttribute('src', url);
});

$form.addEventListener('submit', event => {
  event.preventDefault();

  const entryJSON = {};
  entryJSON.title = $form.elements.title.value;
  entryJSON.photoURL = $form.elements.url.value;
  entryJSON.notes = $form.elements.notes.value;
  entryJSON.entryID = data.nextEntryId;

  data.nextEntryId++;
  data.entries.unshift(entryJSON);
  $photoPreview.setAttribute('src', './images/placeholder-image-square.jpg');
  $form.reset();
});
