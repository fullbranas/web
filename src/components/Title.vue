<template>
    <h2 class="title">{{ title }} ({{ list.length }})</h2>
</template>

<script>
export default {
    name: "Title",
    props: ["title", "list"]
};
</script>

<style scoped>
    .title{
        font-size: 2rem;
        margin: 0;
    }
</style>
