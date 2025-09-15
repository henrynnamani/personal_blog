import express from 'express'
import session from 'express-session';
import path from 'path'
import { fileURLToPath } from 'url';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.urlencoded())
app.use(session({
    secret: 'akpBlob',
    resave: false,
    saveUninitialized: true
}))

app.set('view engine', 'ejs')
app.set('views', path.join(__filename, 'views'))

app.listen(3000, () => {
    console.log('Server is running')
})
