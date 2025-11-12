// main.js
function loadPage(page) {
  const content = document.getElementById('content');
  if (page === 'message') {
    content.innerHTML = '<iframe src="message.html" frameborder="0" width="100%" height="100%"></iframe>';
  } else if (page === 'contacts') {
    content.innerHTML = '<iframe src="contacts.html" frameborder="0" width="100%" height="100%"></iframe>';
  } else if (page === 'moments') {
    content.innerHTML = '<iframe src="moments.html" frameborder="0" width="100%" height="100%"></iframe>';
  } else if (page === 'profile') {
    content.innerHTML = '<iframe src="profile.html" frameborder="0" width="100%" height="100%"></iframe>';
  }
}
