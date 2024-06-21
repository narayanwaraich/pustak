// import { sign } from 'jsonwebtoken';
import express from 'express';
const router = express.Router();
// import { SECRET } from '../util/config';
// import { findOne } from '../models/user';
/*
router.post('/', async (request, response) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const body = request.body;

  const user = await findOne({
    where: {
      username: body.username
    }
  });

  const passwordCorrect = body.password === 'secret';

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password'
    });
  }

  if (user.disabled) {
    return response.status(401).json({
      error: 'account disabled, please contact admin'
    });
  }

  const userForToken = {
    username: user.username,
    id: user.id,
  };

  const token = sign(userForToken, SECRET);

  response.status(200).send({ token, username: user.username, name: user.name });

});
*/
export default router;
