import { createApp } from "vue";
import { createWebHistory, createRouter } from "vue-router";

import App from "./App";
import Root from "./Root";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: "/", component: App },
        { path: "/:catchAll(.*)", redirect: "/" }
    ]
});

const app = createApp(Root);

app.use(router);
app.mount("#app");
