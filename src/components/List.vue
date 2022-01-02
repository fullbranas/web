<template>
    <ul class="card list">
        <li v-for="(item, index) in items" v-bind:key="domain ? item.name : item.id" class="card">
            <span class="card-body list__item">
                {{ domain ? item.name : item.text }}

                <a v-if="domain" v-bind:href="item.link" target="_blank" class="btn btn-info" rel="noopener" aria-label="shopping">
                    <i aria-hidden="true" class="fa fa-shopping-cart"></i>
                </a>

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
</style>
