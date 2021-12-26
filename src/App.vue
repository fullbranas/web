<template>
    <div class="app">
        <img class="app__image" src="./assets/logo.jpg" alt="fullbranas logo">
        <h1 class="app__title">fullbranas <i aria-hidden="true" class="fa fa-tint"></i></h1>
        <p class="app__text">name generators with NodeJS, GraphQL and VueJS.</p>
    </div>
</template>

<script>
    import "bootstrap/dist/css/bootstrap.min.css";
    import "font-awesome/css/font-awesome.min.css";

    export default {
        name: 'App'
    }
</script>

<style>
    :root{
        --space: 16px;
        --double-space: calc(var(--space) * 2);
        --primary: #651FFF;
    }

    html, body{
        font-size: var(--space);
    }

    .app{
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        margin-top: var(--double-space);
        row-gap: var(--space);
    }

    .app .app__image{
        width: 200px;
    }

    .app .app__title, .app .app__text{
        margin: 0;
        text-align: center;
    }

    .app .app__text{
        font-size: 1rem;
    }

    .app .app__title{
        font-size: 3rem;
        display: flex;
        align-items: center;
        justify-content: center;
        column-gap: var(--space);
    }
</style>
