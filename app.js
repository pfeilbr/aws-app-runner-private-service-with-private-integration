const express = require('express');
const app = express();
const port = 8000;

function removeKeysWithPrefix(obj, prefix) {
  for (const key in obj) {
    if (key.toLowerCase().startsWith(prefix)) {
      delete obj[key];
    }
  }
  return obj;
}

app.get('/', (req, res) => {
  const cleanedEnvironmentVariables = removeKeysWithPrefix(Object.assign({}, process.env), "npm_")
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(cleanedEnvironmentVariables, null, 2)
  );
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});