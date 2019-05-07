module.exports = () => {
  return Object.assign({},
    require('./temperature.json'),
    require('./precipitation.json'));
}

