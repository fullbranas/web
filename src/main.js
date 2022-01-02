import { createApp } from "vue";
import { createWebHistory, createRouter } from "vue-router";

import App from "./App";
import Root from "./Root";
import DomainDetails from "./views/DomainDetails";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: "/", component: App },
        { path: "/domains/:domain", component: DomainDetails, props: true },
        { path: "/:catchAll(.*)", redirect: "/" }
    ]
});

const app = createApp(Root);

app.use(router);
app.mount("#app");
