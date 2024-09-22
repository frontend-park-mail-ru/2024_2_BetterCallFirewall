express = require('express');
const path = require('path');

const ip = 'http://127.0.0.1';
const port = 8080;

const posts = [{ text: 'Это пост' }, { text: 'А это другой пост' }];

const app = express();

app.use(express.static('./public', { fallthrough: true }));
app.use(express.static('./node_modules'));

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:8080');
	next();
});

let counter = 0;
app.get('/api/post', (req, res) => {
	console.log('Запрос пришел:');
	const data = posts[counter];
	console.log('Отправили:', data);
	counter++;
	if (posts.length <= counter) {
		counter = 0;
	}
	res.json(data);
});

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

app.listen(port, () => {
	console.log(`Server is listening on port ${port}`);
});
