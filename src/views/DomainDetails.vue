<template>
    <section class="domain-details">
        <div class="domain-details__header">
            <router-link class="btn btn-primary domain-details__button" to="/">Back</router-link>
            <h2 class="domain-details__title">{{ domain }}</h2>
        </div>
    </section>
</template>

<script>
export default {
    name: "DomainDetails",
    props: ["domain"]
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

    .domain-details .domain-details__header{
        display: flex;
        flex-direction: column;
        padding: var(--double-space);
        row-gap: var(--space);
        background-color: var(--primary-opacity);
    }
</style>
