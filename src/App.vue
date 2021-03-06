<template>
    <div class="app">
        <div class="app__header">
            <img class="app__image" src="./assets/logo.jpg" alt="fullbranas logo">
            <h1 class="app__title">fullbranas <i aria-hidden="true" class="fa fa-tint"></i></h1>
            <p class="app__text">name generators with NodeJS, GraphQL and VueJS (run API to work better).</p>
        </div>

        <div class="app__content">
            <div class="app__container">
                <div class="w-100 app__card">
                    <Title v-bind:list="prefixes" title="prefixes"></Title>

                    <Create label="prefix" v-on:add="add(prefixes, $event, 'prefix')"></Create>

                    <List v-bind:domain="false" v-bind:items="prefixes" v-on:destroy="destroy($event, prefixes)"></List>
                </div>

                <div class="w-100 app__card">
                    <Title v-bind:list="suffixes" title="suffixes"></Title>

                    <Create label="suffix" v-on:add="add(suffixes, $event, 'suffix')"></Create>

                    <List v-bind:domain="false" v-bind:items="suffixes" v-on:destroy="destroy($event, suffixes)"></List>
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
import axios from "axios";
import HttpMethodsEnum from "http-methods-enum";
import { v4 } from "uuid";

import Create from "./components/Create";
import Title from "./components/Title";
import List from "./components/List";
import { env } from "./env";
import { KEYWORDS } from "./enums";

export default {
	name: "App",
    components: {
        Create,
        Title,
        List
    },
    data(){
		return {
			prefixes: [],
			suffixes: [],
            domains: []
		};
	},
    async created(){
        await this.get(KEYWORDS.PREFIX);
        await this.get(KEYWORDS.SUFFIX);
        await this.generateDomains();
    },
    methods: {
		async add(list, text, type){
            try {
                await axios({
                    url: env.API_URL,
                    method: HttpMethodsEnum.POST,
                    data: {
                        query: `
                            mutation($item: PieceOfDomainInput){
                                save(item: $item){
                                    id, type, text
                                }
                            }
                        `,
                        variables: {
                            item: {
                                type, text
                            }
                        }
                    }
                });

                await this.get(type);
                await this.generateDomains();
            } catch(error){
                console.error(error);

                list.push({ text, type, id: v4() });
            }
        },
        async destroy(index, list){
            try{
                const { id, type } = list[index];

                const response = await axios({
                    url: env.API_URL,
                    method: HttpMethodsEnum.POST,
                    data: {
                        query: `
                            mutation{
                                deleted: delete(id: ${id})
                            }
                        `
                    }
                });

                if(response.data.data.deleted){
                    await this.get(type);
                    await this.generateDomains();
                }
            } catch(error){
                console.error(error);

                list.splice(index, 1);
            }
        },
        async get(type){
            try{
                const listName = `${type}es`;

                const response = await axios({
                    url: env.API_URL,
                    method: HttpMethodsEnum.POST,
                    data: {
                        query: `
                            {
                                ${listName}: pieces(type: "${type}") {
                                    id, text, type
                                }
                            }
                        `
                    }
                });

                this[listName] = response.data.data[listName];
            } catch(error){
                console.error(error);
            }
        },
        async generateDomains(){
            try{
                const response = await axios({
                    url: env.API_URL,
                    method: HttpMethodsEnum.POST,
                    data: {
                        query: `
                            mutation{
                                domains{ name, link, available }
                            }
                        `
                    }
                });

                this.domains = response.data.data.domains;
            } catch(error){
                console.error(error);
            }
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
