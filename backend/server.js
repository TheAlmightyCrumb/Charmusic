const app = require('./app');
const port = 3001;

app.listen(port, () => {
  console.log(`App listening on http://localhost:${port}`)
})