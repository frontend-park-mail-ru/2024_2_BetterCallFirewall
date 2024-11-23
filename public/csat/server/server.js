express = require('express');
const path = require('path');

const port = 8001;

const app = express();

app.use(express.static('../../'));

app.get('/handlebars.runtime.js', (req, res) => {
	res.sendFile(
		path.join(
			__dirname,
			'../node_modules/handlebars/dist/handlebars.runtime.js',
		),
	);
});

app.get('/precompiled.js', (req, res) => {
	res.sendFile(path.join(__dirname, '../precompiled.js'));
});

app.get('/dist/bundle.js', (req, res) => {
	res.sendFile(path.join(__dirname, '../dist', 'bundle.js'));
});

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, '../', 'index.html'));
});

app.listen(port, () => {
	console.log(`Server is listening on port ${port}`);
});
