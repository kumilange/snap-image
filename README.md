welcome to
<h1>README.md</h1>
This is IMAGESTREAM.  IMAGESTREAM is a viral image streaming website.  Anyone can upload anything and no images are cached for longer than 30 seconds.

<h2>Deployment</h2>
IMAGESTREAM can be deployed with the following steps:

1. `git clone https://github.com/GameKyuubi/imagestream`
2. Install/start Redis.
3. `cd imagestream`
4. `npm install` or preferably `yarn install`
5. `yarn server` to start the server
6. `yarn client` to start the client

The server will run on port 9000 and the client should open automatically at `http://localhost:3000`

Tech used:
* Node
* Express
* React
* Redux
* React-redux
* Redis
