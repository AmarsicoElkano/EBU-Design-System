import Util from '../../util/util.js';

export default class ShareButton {
  constructor(el){
    this.$el = el;
    this.category = 'Molecules';
    this.componentName = 'ShareButton';
    this.isActive = false;
    this.$button = this.$el.querySelector('.filled-button, .primary-button, .ghost-button, .text-button');
    if(this.$button)
      this.$button.addEventListener('click', this.toggle.bind(this));

    Array.from(this.$el.querySelectorAll('.share-item[data-share-type]')).forEach(item => {
      item.addEventListener('click', () => {
        const url = item.getAttribute('data-url') || location.href;
        this.shareByType(item.getAttribute('data-share-type'), url);
      });
    });
  }
  toggle() {
    this.setState(!this.isActive);
    if (this.onClick) {
      this.onClick({isActive: this.isActive});
    }
  }
  setState(state) {
    this.$el.classList.toggle('active', state);
    this.isActive = state;
  }
  shareByType(type, copy){
    let hash = copy.match(/#[^ ]+/);
    let url = copy.match(/(http|https):\/\/[^ ]+/);
    
    if(url && url[0]) url = url[0];
    else url = window.location.href;
    switch (type) {
      case 'copy':
        navigator.clipboard.writeText(copy);
        this.$el.classList.add('copying');
        setTimeout(() => {
          this.$el.classList.remove('copying');
        }, 1200);
        break;
      case 'twitter':
        window.open(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(`${copy}`)}`,
          'sharer',
          'toolbar=0,status=0,width=580,height=480',
        );
        break;
      case 'facebook':
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${url}`,
          'sharer',
          'toolbar=0,status=0,width=680,height=580',
        );
        break;
      case 'whatsapp':
        window.open(
          `https://wa.me/?text=${url}`,
          '_blank'
        );
        break;
      case 'linkedin':
        window.open(
          `https://linkedin.com/shareArticle?mini=true&url=${url}&summary=`,
          'sharer',
          'toolbar=0,status=0,width=580,height=325',
        );
        break;
      default:
        break;
    }
  }
}
Array.from(document.querySelectorAll('.share-button:not([data-no-auto])')).forEach((el) => {
  Util.addComponent(new ShareButton(el));
});