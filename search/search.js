const yo       = require('yo-yo');
const qs       = require('qs');
const bel      = require('bel');
const path     = require('path');
const delegate = require('delegate');
const throttle = require('throttle');

const BASE_URL = 'http://mklabs.github.io/';

// Search def
class Search {
  get endpoint () {
    return 'https://api.github.com/search/code?q=';
  }

  constructor (template, options = {}) {
    this.template = template;
    this.options = options;
  }

  search (query, options = {}) {
    return this.fetch(query)
      .then(this.dom.bind(this, query));
  }

  url (query, { language, repo }) {
    return this.endpoint + `${query}+in:file+language:${language}+repo:${repo}`;
  }

  fetch (query) {
    const opts = { ...this.options };
    const optsArchivedRepo = { ...this.options, repo: this.options.archivedRepo}

    return Promise.all([
      fetch(this.url(query, opts)),
      fetch(this.url(query, optsArchivedRepo))
    ])
    .catch(e => console.error('HTTP ERR', e))
    .then(([res, resArchived]) => {
      return Promise.all([res.json(), resArchived.json()]);
    })
    .then(this.fetchBody)
  }

  fetchBody([res, resArchived]) {
    console.log('=>', res);
    console.log('=>', resArchived);
    return res;
  }

  dom (query, res) {
    return this.template(query, res);
  }
}

// Search entry point
const opns = (template, options = {}) => {
  if (!template) throw new Error('Missing template');
  if (typeof template !== 'function') throw new Error('Template must be a function');
  return new Search(template, options);
};

// Templates
const template = (query,  { items }) => {
  if (!items || !items.length) return noResult(query);

  return bel`<section class="js-result">
    ${items.map((item) => {
      let name = path.basename(item.name)
      name = name.replace(/\d{4}-\d\d?-\d\d?-/, '');
      name = name.replace(/\.md/, '')

      const parts = item.name.split('-')
      let href = BASE_URL + parts.slice(0, 3).join('/') + '/' + parts.slice(3).join('-')
      href = href.replace(/\.md/, '.html')

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
const noResult = (query) => {
  return bel`<div class="opns-item">
    <p>No results for ${query}</p>
  </div>`;
};

// Init the view
const view = opns(template, {
  repo: 'mklabs/mklabs.github.com',
  archivedRepo: 'mklabs/blog.mklog.fr',
  language: 'markdown'
});

const input = document.querySelector('.js-search');
const container = document.querySelector('.js-results');

delegate(document.body, '.js-search', 'input', (e) => {
  const value = input.value;
  search(value);
}, false);

let initialQuery = qs.parse(location.search.replace(/^\?/, '')).q;
if (!initialQuery) {
  initialQuery = 'ES6';
}

const search = (value) => {
  return view.search(value)
    .then((el) => {
      yo.update(container, el)
      input.focus();
    });
};

search(initialQuery);
