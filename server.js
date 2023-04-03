const express = require('express');
const app = express();
const port = 8080;
const bodyParser = require('body-parser');
const routes = require('./routes/articles');
const { readFiles } = require('./helper-functions');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set('view engine', 'ejs');

app.get('/', async (req, res) => {
    const posts = await readFiles();
    res.render('pages/index', { posts: posts });
});


app.use("/", routes)


app.listen(port, async () => {
    console.log(`Your app is listening on port ${port}`);
});

