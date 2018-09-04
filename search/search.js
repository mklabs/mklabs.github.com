const yo = require('yo-yo');
const qs = require('qs');
const bel = require('bel');
const path = require('path');
const delegate = require('delegate');
const debounce = require('lodash.debounce');

const BASE_URL = 'http://mklabs.github.io/';

// Search def
class Search {
  get endpoint() {
    return 'https://api.github.com/search/code?q=';
  }

  constructor(template, options = {}) {
    this.template = template;
    this.options = options;
  }

  search(query, options = {}) {
    // console.log('Searching with query', query);
    if (!query) {
      return Promise.resolve().then(() => this.template(query, {}));
    }

    return this.fetch(query).then(this.dom.bind(this, query));
  }

  url(query, { language, repo }) {
    return this.endpoint + `${query}+in:file+language:${language}+repo:${repo}`;
  }

  fetch(query) {
    const opts = { ...this.options };

    return fetch(this.url(query, opts))
      .catch(e => console.error('HTTP ERR', e))
      .then(this.fetchBody);
  }

  fetchBody(res) {
    // console.log('=>', res);
    return res.json();
  }

  dom(query, res) {
    if (res.statusText == 'Forbidden') {
      // console.log('Forbidden request', res);
      return this.template(query, {
        error: 'API rate limit exceeded. Try again later.'
      });
    }

    return this.template(query, res);
  }
}

// Search entry point
const opns = (template, options = {}) => {
  if (!template) {
    throw new Error('Missing template');
  }

  if (typeof template !== 'function') {
    throw new Error('Template must be a function');
  }

  return new Search(template, options);
};

// Templates
const template = (query, { error, items }) => {
  if (error) return errorTemplate(query, error);
  if (!items || !items.length) return noResult(query);

  return bel`<section class="js-result">
    ${items.map(item => {
      let name = path.basename(item.name);
      name = name.replace(/\d{4}-\d\d?-\d\d?-/, '');
      name = name.replace(/\.md/, '');

      const parts = item.name.split('-');
      let href = BASE_URL;
      href += parts.slice(0, 3).join('/') + '/' + parts.slice(3).join('-');
      href = href.replace(/\.md/, '.html');

      return bel`<div class="opns-item">
        <header class="header">
          <h3><a href="${href}">${name}</a></h3>
          <a class="repo" href="${item.url}">${item.path}</a>
        </header>
        <p><a href="${href}">${item.name} (${item.path})</a></p>
      </div>`;
    })}
  </section>`;
};

// No result template helper
const noResult = query => {
  // console.log('no result template with query "%s"', query);
  return bel`
  <section class="js-result">
    <div class="opns-item">
      <p>
      ${query ? `No results for ${query}` : `Type in a query in the form below.`}
      </p>
    </div>
  </section>
  `;
};

const errorTemplate = (query, error) => {
  return bel`
  <section class="js-result">
    <div class="opns-item">
      <p class="error">
      ${error ? `${error}` : `Got an error for query "${query}"`}
      </p>
    </div>
  </section>
  `;
};

// Init the view
const view = opns(template, {
  repo: 'mklabs/mklabs.github.com',
  language: 'markdown'
});

const input = document.querySelector('.js-search');
const submit = document.querySelector('.js-submit');
const container = document.querySelector('.js-results');

delegate(
  document.body,
  '.js-search',
  'input',
  debounce(e => {
    const value = input.value;
    search(value);
  }, 300),
  false
);

delegate(
  document.body,
  '.js-form',
  'submit',
  e => {
    e.preventDefault();

    const value = input.value;
    search(value);
  },
  false
);

const initialQuery = qs.parse(location.search.replace(/^\?/, '')).q || '';
const search = value => {
  if (value) {
    document.querySelector('.js-search').value = value;
  }

  return view.search(value).then(el => {
    yo.update(container, el);
    input.focus();
  });
};

search(initialQuery);
