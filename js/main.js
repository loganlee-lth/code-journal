const $photoURL = document.querySelector('#photo-url');
const $photoPreview = document.querySelector('#photo-preview');
const $form = document.querySelector('form');
const $ul = document.querySelector('ul');
const $noEntries = document.querySelector('#no-entries');

const $entryFormDiv = document.querySelector('[data-view="entry-form"]');
const $entriesDiv = document.querySelector('[data-view="entries"]');
const $entryFormAnchor = document.querySelector('#navbar-anchor');
const $entriesAnchor = document.querySelector('#new');

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

  $ul.prepend(renderEntry(entryJSON));
  data.nextEntryId++;
  data.entries.unshift(entryJSON);
  $photoPreview.setAttribute('src', './images/placeholder-image-square.jpg');
  $form.reset();

  viewSwap('entries');

  if ($noEntries.getAttribute('class') !== 'row hidden') {
    toggleNoEntries();
  }
});

function renderEntry(entry) {
  const $li = document.createElement('li');
  $li.setAttribute('class', 'row');

  const $imgCol = document.createElement('div');
  $imgCol.setAttribute('class', 'column-half');
  const $img = document.createElement('img');
  $img.setAttribute('src', entry.photoURL);
  $img.setAttribute('alt', entry.title);

  const $infoCol = document.createElement('div');
  $infoCol.setAttribute('class', 'column-half');
  const $titleRow = document.createElement('div');
  $titleRow.setAttribute('class', 'row');
  const $entryTitle = document.createElement('h3');
  $entryTitle.textContent = entry.title;
  const $notesRow = document.createElement('div');
  $notesRow.setAttribute('class', 'row');
  const $entryNotes = document.createElement('p');
  $entryNotes.textContent = entry.notes;

  $li.appendChild($imgCol);
  $imgCol.appendChild($img);
  $li.appendChild($infoCol);
  $infoCol.appendChild($titleRow);
  $titleRow.appendChild($entryTitle);
  $infoCol.appendChild($notesRow);
  $notesRow.appendChild($entryNotes);

  return $li;
}

function toggleNoEntries() {
  $noEntries.classList.toggle('hidden');
}

function viewSwap(view) {
  if (view === 'entries') {
    $entriesDiv.classList.remove('hidden');
    $entryFormDiv.classList.add('hidden');
  } else if (view === 'entry-form') {
    $entriesDiv.classList.add('hidden');
    $entryFormDiv.classList.remove('hidden');
  }

  data.view = view;
}

document.addEventListener('DOMContentLoaded', event => {
  for (let i = 0; i < data.entries.length; i++) {
    $ul.appendChild(renderEntry(data.entries[i]));
  }
});

$entryFormAnchor.addEventListener('click', function (event) {
  viewSwap('entries');
});
$entriesAnchor.addEventListener('click', function (event) {
  viewSwap('entry-form');
});
