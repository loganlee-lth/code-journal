const $entryFormDiv = document.querySelector('[data-view="entry-form"]');
const $entryFormTitle = document.querySelector('#entry-form-title');
const $photoURL = document.querySelector('#photo-url');
const $photoPreview = document.querySelector('#photo-preview');
const $form = document.querySelector('form');
const $entryFormAnchor = document.querySelector('#navbar-anchor');
const $deleteButton = document.querySelector('#delete-button');

const $entriesDiv = document.querySelector('[data-view="entries"]');
const $ul = document.querySelector('ul');
const $noEntries = document.querySelector('#no-entries');
const $entriesAnchor = document.querySelector('#new');

$photoURL.addEventListener('input', event => {
  const url = event.target.value;
  $photoPreview.setAttribute('src', url);
});

$form.addEventListener('submit', event => {
  event.preventDefault();

  const entryObj = {};
  entryObj.title = $form.elements.title.value;
  entryObj.photoURL = $form.elements.url.value;
  entryObj.notes = $form.elements.notes.value;
  entryObj.entryId = data.nextEntryId;

  if (data.editing === null) {
    data.nextEntryId++;
    data.entries.unshift(entryObj);
    $ul.prepend(renderEntry(entryObj));
  } else if (data.editing !== null) {
    entryObj.entryId = data.editing.entryId;

    for (let i = 0; i < data.entries.length; i++) {
      if (data.entries[i].entryId === data.editing.entryId) {
        data.entries[i] = entryObj;
      }
    }

    const $oldEntryLi = document.querySelector("[data-entry-id='" + entryObj.entryId + "']");
    $oldEntryLi.replaceWith(renderEntry(entryObj));
    $entryFormTitle.textContent = 'New Entry';
    $deleteButton.classList.add('hidden');
    data.editing = null;

  }

  if (data.entries.length > 0) {
    toggleNoEntries();
  }
  $form.reset();
  $photoPreview.setAttribute('src', './images/placeholder-image-square.jpg');
  viewSwap('entries');
});

function renderEntry(entry) {
  const $li = document.createElement('li');
  $li.setAttribute('class', 'row');
  $li.setAttribute('data-entry-id', entry.entryId);

  const $imgCol = document.createElement('div');
  $imgCol.setAttribute('class', 'column-half');
  const $img = document.createElement('img');
  $img.setAttribute('src', entry.photoURL);
  $img.setAttribute('alt', entry.title);

  const $infoCol = document.createElement('div');
  $infoCol.setAttribute('class', 'column-half');
  const $titleRow = document.createElement('div');
  $titleRow.setAttribute('class', 'row space-between');
  const $entryTitle = document.createElement('h3');
  $entryTitle.textContent = entry.title;
  const $entryEditIcon = document.createElement('i');
  $entryEditIcon.setAttribute('class', 'fa-solid fa-pencil fa-xl');
  const $notesRow = document.createElement('div');
  $notesRow.setAttribute('class', 'row');
  const $entryNotes = document.createElement('p');
  $entryNotes.textContent = entry.notes;

  $li.appendChild($imgCol);
  $imgCol.appendChild($img);
  $li.appendChild($infoCol);
  $infoCol.appendChild($titleRow);
  $titleRow.appendChild($entryTitle);
  $titleRow.appendChild($entryEditIcon);
  $infoCol.appendChild($notesRow);
  $notesRow.appendChild($entryNotes);

  return $li;
}

function toggleNoEntries() {
  $noEntries.classList.add('hidden');
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
  if (data.entries.length > 0) {
    toggleNoEntries();
  }
  for (let i = 0; i < data.entries.length; i++) {
    $ul.appendChild(renderEntry(data.entries[i]));
  }
  viewSwap(data.view);
});

$entryFormAnchor.addEventListener('click', function (event) {
  viewSwap('entries');
});

$entriesAnchor.addEventListener('click', function (event) {
  viewSwap('entry-form');
});

$ul.addEventListener('click', event => {
  if (event.target.tagName === 'I') {
    const clickedEntryId = Number(event.target.closest('li').getAttribute('data-entry-id'));
    for (let i = 0; i < data.entries.length; i++) {
      if (data.entries[i].entryId === clickedEntryId) {
        data.editing = data.entries[i];
      }
    }
    $entryFormTitle.textContent = 'Edit Entry';
    $form.elements.title.value = data.editing.title;
    $form.elements.url.value = data.editing.photoURL;
    $photoPreview.setAttribute('src', data.editing.photoURL);
    $form.elements.notes.value = data.editing.notes;
    $deleteButton.classList.remove('hidden');
    viewSwap('entry-form');
  }
});
