<template>
    <div class="app">
        <div class="app__header">
            <img class="app__image" src="./assets/logo.jpg" alt="fullbranas logo">
            <h1 class="app__title">fullbranas <i aria-hidden="true" class="fa fa-tint"></i></h1>
            <p class="app__text">name generators with NodeJS, GraphQL and VueJS.</p>
        </div>

        <div class="app__content">
            <div class="app__container">
                <div class="w-100 app__card">
                    <Title v-bind:list="prefixes" title="prefixes"></Title>

                    <Create label="prefix" v-on:add="add(prefixes, $event)"></Create>

                    <List v-bind:domain="false" v-bind:items="prefixes" v-on:destroy="destroy($event, prefixes)"></List>
                </div>

                <div class="w-100 app__card">
                    <Title v-bind:list="sufixes" title="sufixes"></Title>

                    <Create label="sufix" v-on:add="add(sufixes, $event)"></Create>

                    <List v-bind:domain="false" v-bind:items="sufixes" v-on:destroy="destroy($event, sufixes)"></List>
                </div>
            </div>

            <div class="app__container">
                <div class="w-100 app__card">
                    <Title v-bind:list="domains" title="domains"></Title>

                    <List v-bind:domain="true" v-bind:items="domains"></List>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import Create from "./components/Create";
import Title from "./components/Title";
import List from "./components/List";

export default {
	name: "App",
    components: {
        Create,
        Title,
        List
    },
    data(){
		return {
			prefixes: ["air", "light"],
			sufixes: ["car", "ball"]
		};
	},
	methods: {
		add(list, value){
            list.push(value);
        },
        destroy(index, list){
            list.splice(index, 1);
        }
    },
    computed: {
        domains(){
            const domains = [];

            for(const index in this.prefixes){
                const prefix = this.prefixes[index];

                this.sufixes.forEach(sufix => {
                    const name = `${prefix}${sufix}`;
                    const link = `https://checkout.hostgator.com.br/?a=add&sld=${name}&tld=.com.br&domaincycle=1&pid=5&billingcycle=annually&promocode=PRATODAHORA35HG&titan=1&titanSource=1`;

                    domains.push({ name, link });
                });
            }

            return domains;
        }
    }
};
</script>

<style>
    :root{
        --space: 16px;
        --double-space: calc(var(--space) * 2);
        --bigger-space: calc(var(--space) * 4);
        --half-space: calc(var(--space) / 2);
        --primary: #651FFF;
        --primary-rgb: 101, 31, 255;
        --primary-opacity: rgba(var(--primary-rgb), .12);
        --white: #fff;
    }

    html, body, #app{
        min-height: 100vh;
    }

    body, #app{
        height: 100%;
    }

    html, body, #app{
        font-size: var(--space);
    }

    .app{
        display: flex;
        align-items: center;
        flex-direction: column;
        row-gap: var(--double-space);
        height: 100%;
        min-height: 100vh;
    }

    .app .app__header{
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        margin-top: var(--bigger-space);
        row-gap: var(--space);
    }

    .app .app__image{
        width: 164px;
    }

    .app .app__title, .app .app__text{
        margin: 0;
        text-align: center;
    }

    .app .app__text{
        font-size: 1rem;
    }

    .app .app__title{
        font-size: 2.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
        column-gap: var(--space);
    }

    .app .app__content{
        width: 100%;
        display: flex;
        flex-direction: column;
        height: 100%;
        background-color: var(--primary-opacity);
        padding: var(--double-space);
        row-gap: var(--double-space);
        flex-grow: 1;
    }

    .app .app__container{
        display: flex;
        margin: 0 auto;
        width: 100%;
        max-width: 1200px;
        column-gap: var(--double-space);
    }

    .app .app__card{
        display: flex;
        flex-direction: column;
        row-gap: var(--space);
    }
</style>
