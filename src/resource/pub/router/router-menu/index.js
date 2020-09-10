import test from './test';
import home from './home';
import business from './business';
import client from './client';
import order from './order';
import working from './working';

let component = {};
let router = [];

router = router.concat(home.router);
router = router.concat(business.router);
router = router.concat(client.router);
router = router.concat(order.router);
router = router.concat(working.router);
router = router.concat(test.router);

Object.assign(component, home.component);
Object.assign(component, business.component);
Object.assign(component, client.component);
Object.assign(component, order.component);
Object.assign(component, working.component);
Object.assign(component, test.component);

export default {
    components: component,
    routers: router
};