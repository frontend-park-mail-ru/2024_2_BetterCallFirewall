express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

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

const users = [
	{
		id: 1,
		sessionId: null,
		email: 'test@mail.com',
		password: 'password',
		firstName: 'firstName',
		lastName: 'lastName',
	},
];

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./public', { fallthrough: true }));
app.use(express.static('./node_modules'));

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:8000');
	next();
});

app.post('/auth/login', (req, res) => {
	console.log('login');
	const body = req.body;
	console.log('body:', body);
	let sessionId;
	users.forEach((user) => {
		if (body.email === user.email && body.password === user.password) {
			user.sessionId = user.id;
			sessionId = user.sessionId;
			console.log('user:', user);
		}
	});
	if (sessionId) {
		res.status(200);
		res.cookie('sessionid', sessionId, { maxAge: '3600000' });
	} else {
		res.status(401);
	}
	res.send();
});

app.post('/auth/signup', (req, res) => {
	console.log('signup');
	const body = req.body;
	const user = {
		id: users.length + 1,
		sessionId: users.length + 1,
		email: body.email,
		password: body.password,
		firstName: body.firstName,
		lastName: body.lastName,
	};
	users.push(user);
	console.log('users:', users);
	res.cookie('sessionid', user.sessionId, { maxAge: 86400000 });
	res.send();
});

app.post('/auth/logout', (req, res) => {
	console.log('logout');
	console.log('cookies:', req.cookies);
	let sessionId = req.cookies['sessionid'];
	users.forEach((user) => {
		if (sessionId == user.sessionId) {
			user.sessionId = null;
			console.log('user:', user);
		}
	});
	res.cookie('sessoinid', 0, { maxAge: -1 });
	res.send();
});

let counter = 0;
app.get('/api/post', (req, res) => {
	// console.log('Запрос пришел:');
	const data = posts[counter];
	// console.log('Отправили:', data);
	counter++;
	if (posts.length <= counter) {
		counter = 0;
	}
	res.json(data);
});

app.get('/public/img/', (req, res) => {
	console.log('надо картинку');
	res.setHeader('Content-Type', 'image/jpeg');
	res.sendFile(path.join(__dirname, 'public'));
});

app.get('*', (req, res) => {
	console.log('Запрос:', req.originalUrl);
	console.log('Куки:', req.cookies);
	res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

app.listen(port, () => {
	console.log(`Server is listening on port ${port}`);
});
