<template>
    <div class="app">
        <div class="app__header">
            <img class="app__image" src="./assets/logo.jpg" alt="fullbranas logo">
            <h1 class="app__title">fullbranas <i aria-hidden="true" class="fa fa-tint"></i></h1>
            <p class="app__text">name generators with NodeJS, GraphQL and VueJS.</p>
        </div>
        <div class="app__content">
            <div class="app__container">
                <div class="w-100">
                    <h2 class="app__card-title">prefixes ({{ prefixes.length }})</h2>
                    <ul class="card app__list">
                        <li v-for="prefix in prefixes" v-bind:key="prefix" class="card"><span class="card-body">{{ prefix }}</span></li>
                    </ul>
                </div>
                <div class="w-100">
                    <h2 class="app__card-title">sufixes ({{ sufixes.length }})</h2>
                    <ul class="card app__list">
                        <li v-for="sufix in sufixes" v-bind:key="sufix" class="card"><span class="card-body">{{ sufix }}</span></li>
                    </ul>
                </div>
            </div>
            <div class="app__container">
                <div class="w-100">
                    <h2 class="app__card-title">domains ({{ domains.length }})</h2>
                    <ul class="card app__list">
                        <li v-for="domain in domains" v-bind:key="domain" class="card"><span class="card-body">{{ domain }}</span></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";

export default {
	name: "App",
	data(){
		return {
			prefixes: ["air", "light"],
			sufixes: ["car", "ball"],
			domains: ["aircar", "lightball"]
		};
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
        font-size: var(--space);
        height: 100%;
    }

    .app{
        display: flex;
        align-items: center;
        flex-direction: column;
        row-gap: var(--double-space);
        height: 100%;
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
    }

    .app .app__container{
        display: flex;
        margin: 0 auto;
        width: 100%;
        max-width: 1200px;
        column-gap: var(--double-space);
    }

    .app .app__list{
        padding: var(--double-space);
        margin: 0;
        display: flex;
        flex-direction: column;
        row-gap: var(--half-space);
        width: 100%;
    }

    .app .app__card-title{
        font-size: 2rem;
        margin-bottom: var(--half-space);
    }
</style>
