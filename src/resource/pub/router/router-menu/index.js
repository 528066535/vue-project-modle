import test from './test';
import home from './home';
import business from './business';
import client from './client';
import order from './order';
import working from './working';

let router = []

router = router.concat(home.router)
router = router.concat(business.router)
router = router.concat(client.router)
router = router.concat(order.router)
router = router.concat(working.router)
router = router.concat(test.router)


export default {
  routers: router
};