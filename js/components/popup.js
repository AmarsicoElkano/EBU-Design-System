Array.from(document.querySelectorAll('.popup')).forEach(popup => {
  const closeButton = popup.querySelector('.popup-close');
  const iframe = popup.querySelector('iframe');

  closeButton.addEventListener('click', () => {
    if(iframe) iframe.src = '';
    popup.classList.remove('show');
  });
});
Array.from(document.querySelectorAll('[data-open-popup], .video-preview')).forEach(button => {
  const name = button.getAttribute('data-open-popup');
  button.addEventListener('click', () => {
    const popup = button.classList.contains('video-preview') ? document.getElementById('popup-video') : document.querySelector(`.popup#${name}`);
    if(popup) {
      const iframe = popup.querySelector('iframe');
      if(iframe) iframe.src = button.getAttribute('data-src');
      popup.classList.add('show');
    }
  });
});