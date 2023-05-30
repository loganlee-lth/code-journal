/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

window.addEventListener('beforeunload', event => {
  const dataJSON = JSON.stringify(data);
  localStorage.setItem('localStorage', dataJSON);
});

if (localStorage.getItem('localStorage') !== null) {
  data = JSON.parse(localStorage.getItem('localStorage'));
}
