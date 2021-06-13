const app = require('express')();

app.get('/', (req, res) => res.send('UpTimer Bot Uptimed Your Project.'));

module.exports = () => {
  app.listen(3000);
}