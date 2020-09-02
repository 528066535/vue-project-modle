import home from './home';
import test from './test';
import account from './account';
import video from './video';
import setting from './setting';
import money from './money';
import suggess from './suggess';

let component = {};
let router = [];

router = router.concat(home.router);
// router = router.concat(test.router);
router = router.concat(account.router);
router = router.concat(video.router);
router = router.concat(setting.router);
router = router.concat(money.router);
router = router.concat(suggess.router);

Object.assign(component, home.component);
// Object.assign(component, test.component);
Object.assign(component, account.component);
Object.assign(component, video.component);
Object.assign(component, setting.component);
Object.assign(component, money.component);
Object.assign(component, suggess.component);

export default {
    components: component,
    routers: router
};