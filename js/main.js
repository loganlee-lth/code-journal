const $photoURL = document.querySelector('#photo-url');
const $photoPreview = document.querySelector('#photo-preview');

$photoURL.addEventListener('input', event => {
  const url = event.target.value;
  $photoPreview.setAttribute('src', url);
});
