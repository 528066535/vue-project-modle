import Vuex from 'vuex'
import common from  './common/common'
// import page from  './pages/page'

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        common,
        // page
    }
});

export default store