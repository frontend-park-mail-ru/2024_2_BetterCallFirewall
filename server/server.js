express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');

const port = 8000;

const posts = [
	{
		header: 'Это заголовок поста',
		body: 'Это пост',
		created_at: '23.09.2024',
	},
	{
		header: 'Это заголовок другого поста',
		body: 'А это другой пост',
		created_at: '32.09.2024',
	},
	{
		header: 'Это заголовок поста',
		body: 'Это пост',
		created_at: '23.09.2024',
	},
	{
		header: 'Это заголовок другого поста',
		body: 'А это другой пост',
		created_at: '32.09.2024',
	},
	{
		header: 'Это заголовок поста',
		body: 'Это пост',
		created_at: '23.09.2024',
	},
	{
		header: 'Это заголовок другого поста',
		body: 'А это другой пост',
		created_at: '32.09.2024',
	},
	{
		header: 'Это заголовок поста',
		body: 'Это пост',
		created_at: '23.09.2024',
	},
	{
		header: 'Это заголовок другого поста',
		body: 'А это другой пост',
		created_at: '32.09.2024',
	},
	{
		header: 'Это заголовок поста',
		body: 'Это пост',
		created_at: '23.09.2024',
	},
	{
		header: 'Это заголовок другого поста',
		body: 'А это другой пост',
		created_at: '32.09.2024',
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
	res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
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
		body.data = posts;
		res.send(JSON.stringify(body));
	} else {
		res.status(401);
		res.send('{}');
	}
});

const profiles = {
    lukeskywalker: {
        key: 'profile',
        firstName: 'Luke',
        secondName: 'Skywalker',
        description: 'Jedi, master',
        friendsCount: 99,
        groupsCount: 3,
		img: '../img/avatar.png',
    },
    johndoe: {
        key: 'profile',
        firstName: 'John',
        secondName: 'Doe',
        description: 'A mysterious individual',
        friendsCount: 10,
        groupsCount: 1,
    }
};

app.get('/api/profiles/:user', (req, res) => {
    const user = req.params.user.toLowerCase();
    
    const profile = profiles[user];

    if (profile) {
        res.json(profile);
    } else {
        res.status(404).json({
            key: 'profile',
            firstName: 'Неизвестно',
            secondName: '',
            description: '',
            friendsCount: 0,
            groupsCount: 0,
        });
    }
});

app.get('/dist/bundle.js', (req, res) => {
	res.sendFile(path.join(__dirname, '../dist', 'bundle.js'));
});

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

app.listen(port, () => {
	console.log(`Server is listening on port ${port}`);
});


