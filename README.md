# SnapImage
**What if you can share your favorite images only for 30 seconds?** SnapImage is an image loader with no caching, anyone can upload any images and share them via sns BUT those images will be gone in 30 seconds. Have fun with the exciting moment!

![2018-01-27 17 35 59](https://user-images.githubusercontent.com/28984604/35470225-9a8c8d76-0388-11e8-85f7-45679a0f4b1a.png)

## Getting Started
### 1. Installing
```
git clone https://github.com/kumiko-haraguchi/snap-image.git
cd snap-image
yarn install
```

### 2. Running Redis Server(Redis is required)
```
redis-server
```

### 3. Running Dev & API Servers
```
yarn client
yarn server
```
=> You'll see the app on http://localhost:3000! 💃

## Built With
* [React](https://facebook.github.io/react/) - Frontend
* [Redux](https://github.com/reactjs/redux) - State Management
* [Express](https://expressjs.com/) - Backend
* [Redis](https://redis.io/) - Database
* [Knex](http://knexjs.org/) - Query Builder
* [Yarn](https://yarnpkg.com/en/) - Dependency Management
* [Heroku](https://heroku.com/) - Continuous Integration / Continuous Deployment
