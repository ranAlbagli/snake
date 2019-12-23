const KEY= 'record'


function store(any) {
  localStorage[KEY] = JSON.stringify(any);
}

function load() {
     var str = localStorage[KEY] || 'null';
     let value = JSON.parse(str);
     return value
}

export default {
  store,
  load
}