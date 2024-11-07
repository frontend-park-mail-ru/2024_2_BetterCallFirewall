express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');

const port = 8000;

const posts = [
	{
		id: 1,
		header: {
			authorId: 1,
			author: 'Это автор поста',
			avatar: 'img/avatar.png',
		},
		post_content: {
			text: 'Это текст поста',
			file: 'img/lion.jpg',
			created_at: '2024-11-06T17:04:13.565805Z',
		},
	},
	{
		id: 2,
		header: {
			authorId: 3,
			author: 'Это автор другого поста',
			avatar: 'img/avatar.png',
		},
		post_content: {
			text: 'Это текст другого поста',
			file: 'img/cat.jpg',
			created_at: '2345-22-06T27:05:14.575805Z',
		},
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
app.use(express.json({ strict: false }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./public', { fallthrough: true }));
app.use(express.static('./node_modules'));

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header(
		'Access-Control-Allow-Methods',
		'GET, POST, PUT, DELETE, OPTIONS',
	);
	next();
});

app.post('/auth/login', (req, res) => {
	const body = req.body;
	let sessionId;
	users.forEach((user) => {
		if (body.email === user.email && body.password === user.password) {
			user.sessionId = user.id;
			sessionId = user.sessionId;
		}
	});
	if (sessionId) {
		res.status(200);
		res.cookie('sessionid', sessionId, { maxAge: '3600000' });
	} else {
		res.status(401);
	}
	res.send('{}');
});

app.post('/auth/signup', (req, res) => {
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
	res.cookie('sessionid', user.sessionId, { maxAge: 86400000 });
	res.send('{}');
});

app.post('/auth/logout', (req, res) => {
	let sessionId = req.cookies['sessionid'];
	users.forEach((user) => {
		if (sessionId == user.sessionId) {
			user.sessionId = null;
		}
	});
	res.cookie('sessionid', 0, { maxAge: -1 });
	res.send('{}');
});

app.get('/api/post', (req, res) => {
	const sessionId = req.cookies['sessionid'];
	let isAuthorised = false;
	isAuthorised = true;
	users.forEach((user) => {
		if (sessionId && sessionId == user.sessionId) {
			isAuthorised = true;
		}
	});
	if (isAuthorised) {
		const body = {};
		body.success = true;
		body.data = posts;
		body.message = '';
		res.send(JSON.stringify(body));
	} else {
		res.status(401);
		res.send('{}');
	}
});

const profiles = {
	lukeskywalker: {
		key: 'profile',
		id: 2,
		firstName: 'Luke',
		secondName: 'Skywalker',
		description: 'Jedi, master',
		friendsCount: 99,
		groupsCount: 3,
		img: '../img/avatar.png',
	},
	johndoe: {
		key: 'profile',
		id: 3,
		firstName: 'John',
		secondName: 'Doe',
		description: 'A mysterious individual',
		friendsCount: 10,
		groupsCount: 1,
	},
};

app.get('/api/profiles/:user', (req, res) => {
	const user = req.params.user.toLowerCase();

	const profile = profiles[user];

	if (profile) {
		res.json(profile);
	} else {
		res.status(404).json({
			key: 'profile',
			firstName: '',
			secondName: '',
			description: '',
			friendsCount: 0,
			groupsCount: 0,
		});
	}
});

app.get('/api/currentUserId', (req, res) => {
	const sessionId = req.cookies['sessionid'];

	const user = users.find((user) => user.sessionId === parseInt(sessionId));

	if (user) {
		res.json({ userId: user.id });
	} else {
		res.status(401).json({ error: 'User not authenticated' });
	}
});

app.get('/api/profile/header', (req, res) => {
	res.json({
		success: true,
		message: '',
		data: {
			author_id: 1,
			author: 'Darth Vader',
			avatar: '/img/avatar.png',
		},
	});
});

app.get('/dist/bundle.js', (req, res) => {
	res.sendFile(path.join(__dirname, '../dist', 'bundle.js'));
});

app.get('/favicon.ico', (req, res) => {
	res.sendFile(path.join(__dirname, '../', 'public/img/favicon.ico'));
});

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

app.listen(port, () => {
	console.log(`Server is listening on port ${port}`);
});
