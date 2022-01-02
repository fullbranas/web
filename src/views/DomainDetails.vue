<template>
    <section class="domain-details">
        <div class="domain-details__header">
            <router-link class="btn btn-primary domain-details__button" to="/">Back</router-link>
            <h2 class="domain-details__title">{{ domain }}</h2>
        </div>
        <div v-if="notFound" class="domain-details__not-found">not found data about this domain</div>
        <ul v-else class="domain-details__list">
            <li v-for="item in list" v-bind:key="item.title" class="domain-details__item">
                <strong>{{ item.title }}:</strong> <a v-if="item.isLink" target="_blank" rel="noopener" :href="item.text">{{ item.text }}</a><span v-else>{{ item.text }}</span>
            </li>
        </ul>
    </section>
</template>

<script>
import axios from "axios";
import HttpMethodsEnum from "http-methods-enum";

import { env } from "../env";

export default {
    name: "DomainDetails",
    props: ["domain"],
    data(){
        return {
            notFound: true,
            list: []
        };
    },
    created() {
        this.get();
    },
    methods: {
        async get(){
            try{
                const response = await axios({
                    url: env.API_URL,
                    method: HttpMethodsEnum.POST,
                    data: {
                        query: `
                            mutation($name: String){
                                domainDetail(name: $name){
                                    link, available, prefix, suffix
                                }
                            }
                        `,
                        variables: {
                            name: this.domain
                        }
                    }
                });

                this.setList(response.data.data.domainDetail);
            } catch(error){
                console.error(error);
            }
        },
        setList(detail){
            if(!detail) return;

            this.notFound = false;

            this.list = [
                { title: "prefix", text: detail.prefix, isLink: false },
                { title: "suffix", text: detail.suffix, isLink: false },
                { title: "URL to buy", text: detail.link, isLink: true },
                { title: "available", text: detail.available ? "yes" : "no", isLink: false }
            ];
        }
    }
};
</script>

<style scoped>
    .domain-details{
        display: flex;
        flex-direction: column;
    }

    .domain-details .domain-details__button{
        width: fit-content;
    }

    .domain-details .domain-details__title{
        text-align: center;
        font-size: 2.75rem;
        margin: 0;
        line-height: 1.2;
    }

    .domain-details .domain-details__not-found, .domain-details .domain-details__header, .domain-details .domain-details__list{
        display: flex;
        flex-direction: column;
        padding: var(--double-space);
        row-gap: var(--space);
    }

    .domain-details .domain-details__header{
        background-color: var(--primary-opacity);
    }

    .domain-details .domain-details__list, .domain-details .domain-details__not-found{
        align-items: center;
    }

    .domain-details .domain-details__list{
        list-style: none;
        margin: 0;
        display: flex;
        flex-direction: column;
        row-gap: var(--space);
    }

    .domain-details .domain-details__item{
        font-size: 1.25rem;
        text-align: center;
    }
</style>
