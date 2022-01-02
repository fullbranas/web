<template>
    <ul class="card list">
        <li v-for="(item, index) in items" v-bind:key="domain ? item.name : item.id" class="card">
            <span class="card-body list__item">
                {{ domain ? item.name : item.text }}

                <span v-if="domain">
                    <span v-if="item.available" class="list__domain-actions">
                        <button class="btn btn-secondary" @click="openDomain(item)" aria-label="domain details">
                            <i aria-hidden="true" class="fa fa-info-circle"></i>
                        </button>

                        <a v-bind:href="item.link" target="_blank" class="btn btn-info" rel="noopener" aria-label="shopping">
                            <i aria-hidden="true" class="fa fa-shopping-cart"></i>
                        </a>
                    </span>

                    <span v-else class="badge bg-danger">already registered</span>
                </span>

                <button v-else @click="destroy(index)" class="btn btn-danger" aria-label="delete" type="button">
                    <i aria-hidden="true" class="fa fa-trash"></i>
                </button>
            </span>
        </li>
    </ul>
</template>

<script>
export default {
    name: "List",
    props: ["items", "domain"],
    methods: {
        destroy(index){
            this.$emit("destroy", index);
        },
        openDomain(domain){
            this.$router.push({ path: `/domains/${domain.name}` });
        }
    }
};
</script>

<style scoped>
    .list{
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: column;
        background-color: transparent;
        border: none;
        row-gap: var(--half-space);
        width: 100%;
    }

    .list .list__item{
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .list .list__domain-actions{
        display: flex;
        align-items: center;
        column-gap: var(--space);
    }
</style>
