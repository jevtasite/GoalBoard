export function setSEO({ title, description }) {
  if (typeof document === 'undefined') return;

  if (title) {
    document.title = title;
    setMetaProperty('og:title', title);
    setMetaProperty('twitter:title', title);
  }

  if (description) {
    setNamedMeta('description', description);
    setMetaProperty('og:description', description);
    setMetaProperty('twitter:description', description);
  }
}

function setNamedMeta(name, content) {
  let el = document.head.querySelector(`meta[name="${name}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute('name', name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setMetaProperty(property, content) {
  let el = document.head.querySelector(`meta[property="${property}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute('property', property);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

