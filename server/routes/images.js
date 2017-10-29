var redis = require('redis');
var client = redis.createClient();
var express = require('express');
var router = express.Router();

const THIRTY_SECONDS_IN_MS = 30000;

/* GET images listing. */
router.get('/', async function(req, res, next) {
  const currentTime = Date.now();

  await client.zrangebyscore('images', currentTime, currentTime + THIRTY_SECONDS_IN_MS, 'WITHSCORES',
    (err, images) => {
      if(err) {
        res.status(400).send(err.message);
      } else {
        let result = [];
        let counter = 0;
        let imageObj = {};

        for(let index in images) {
          if(index%2 !== 0) {
            imageObj.id = Number(images[index]);
            counter++
          } else {
            imageObj.imageData = images[index];
            counter++
          }
          if(counter === 2) {
            result.push(imageObj);
            counter = 0;
            imageObj = {}
          }
        }
        res.send(result);
      }
    });
});

router.get('/image/:id', async function(req, res, next) {
  try {
    const dirs = req.path.split("/");
    const id = dirs[dirs.length -1];

    await client.hget('images:', Number(id),
      (err, imageData)=> {
        if(err) {
          res.status(400).send(err.message);
        } else {
          res.status(200).send({id, imageData}).json();
        }
      });
  } catch(err) {
    res.status(400).send(err.message);
  }
});

/* POST images */
router.post('/', async function(req, res, next) {
  try {
    const timeKey = Date.now() + THIRTY_SECONDS_IN_MS;
    const imageData = req.body.image;

    await client.zadd('images', timeKey, imageData);
    await client.hset('images:', timeKey, imageData);

    res.status(200).send({id : timeKey, imageData}).json();
  } catch(err) {
    res.status(400).send(err.message);
  }
});

/* DELETE images */
router.delete('/', async function(req, res) {
  try {
    const targetImage = req.body;

    await client.zrem('images', targetImage.imageData);
    res.status(200).send(targetImage);
  } catch(err) {
    res.status(400).send(err.message);
  }
});

module.exports = router;
