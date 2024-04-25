import routerx from 'express-promise-router'
import User from './User'
// import router from './User';

const router = routerx();
router.use('/users',User);

export default router;
