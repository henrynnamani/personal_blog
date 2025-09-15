import express from 'express'
import session from 'express-session';
import guestRouter from './routes/guest.js'
import path from 'path'
import { fileURLToPath } from 'url';
import fs from 'fs'

const app = express();

const filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(filename)

app.use(express.urlencoded())
app.use(session({
    secret: 'akpBlob',
    resave: false,
    saveUninitialized: true
}))

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.get('/', (req, res) => res.redirect('/home'))

app.get('/home', (req, res) => { // default url -> /
    fs.readFile('articles/index.json', (err, data) => {
        if(err) {
            console.log('Error reading file...')
        }

        const articles = JSON.parse(data);

        return res.render('guest/index', { articles, title: 'List of articles' })
    })
})

app.get('/articles/:id', (req, res) => {
    const { id } = req.params;

    fs.readFile('articles/index.json', (err, data) => {
        if(err) {
            console.log('Error reading file...')
        }

        const articles = JSON.parse(data)

        const article = articles.filter((article) => article.id == Number(id) )[0]

        return res.render('guest/article', { article, title: 'Article content' })
    })
})


app.listen(3000, () => {
    console.log('Server is running')
})
