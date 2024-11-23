express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');

const port = 8001;

const app = express();

app.use(cookieParser());
app.use(express.json({ strict: false }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./public', { fallthrough: true }));
app.use(express.static('./node_modules'));

app.get('/dist/bundle.js', (req, res) => {
	res.sendFile(path.join(__dirname, '../../../dist', 'bundle.js'));
});

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, '../', 'index.html'));
});

app.listen(port, () => {
	console.log(`Server is listening on port ${port}`);
});