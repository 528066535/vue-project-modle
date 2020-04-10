import { createApp } from '@Pub/main'

const { app, router } = createApp('hash');

router.onReady(() => {
    app.$mount('#body');
});

// import './resource/pub/components'