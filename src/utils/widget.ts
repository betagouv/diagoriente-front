const getLBFUrl = function (path: string, env: any) {
  const location = window.location.href;

  if (
    env === 'recette'
    || location.indexOf('https://labonneformation.beta.pole-emploi.fr') !== -1
  ) {
    return `https://labonneformation.beta.pole-emploi.fr${path}`;
  }
  if (env === 'dev' || location.indexOf('load_lbf_widget_iframe_from_localhost=true') !== -1) {
    return `http://localhost${path}`;
  }
  return `https://labonneformation.pole-emploi.fr${path}`;
};

const appendChild = function (name: string, element: any, attach: any) {
  element.appendChild(document.createComment(`immersion-${name}-start`));
  element.appendChild(attach);
  element.appendChild(document.createComment(`immersion-${name}-end`));
};

function getWidgetIframe(attributes: any) {
  let path = '/widget-immersion/';
  if (attributes.format !== '') path += attributes.format;
  else path += 'horizontal';

  if (attributes.metier !== '' && attributes.lieu !== '') {
    path += `/${attributes.metier}/${attributes.lieu}`;
  }
  const iframe = document.createElement('iframe');
  iframe.className = 'immersion-widget-iframe';
  iframe.style.width = '1px';
  iframe.style.height = '600px';
  iframe.style.margin = '0';
  iframe.style.minWidth = '100%';
  iframe.style.minHeight = '100%';
  iframe.scrolling = 'no';
  iframe.frameBorder = '0';
  iframe.src = getLBFUrl(path, attributes.env);
  // alert(getLBFUrl(path, attributes.env));

  return iframe;
}

export function appendWidget() {
  const elements = document.querySelectorAll('.immersion-widget');
  for (let i = 0; i < elements.length; i += 1) {
    const element = elements[i];
    const attributes = {
      lieu: element.getAttribute('data-lieu'),
      metier: element.getAttribute('data-metier'),
      env: element.getAttribute('data-env'),
      format: element.getAttribute('data-format'),
    };

    appendChild('widget', element, getWidgetIframe(attributes));
  }
}
