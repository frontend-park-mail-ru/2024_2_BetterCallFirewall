express = require('express');
const path = require('path');

const ip = 'http://127.0.0.1';
const port = 8000;

const posts = [
	{ title: 'Это заголовок поста', text: 'Это пост', date: '23.09.2024' },
	{
		title: 'Это заголовок другого поста',
		text: 'А это другой пост',
		date: '32.09.2024',
	},
];

const app = express();

app.use(express.static('./public', { fallthrough: true }));
app.use(express.static('./node_modules'));

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:8000');
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
