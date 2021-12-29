<template>
    <form class="input-group" v-on:submit="add($event)">
        <input type="text" v-model="value" class="form-control" v-bind:aria-label="label" v-bind:placeholder="placeholder">
        <div class="input-group-append">
            <button class="btn btn-primary" aria-label="add" type="submit">
                <i aria-hidden="true" class="fa fa-plus"></i>
            </button>
        </div>
    </form>
</template>

<script>
export default {
    name: "Create",
    props: ["label"],
    data(){
        return {
            value: ""
        };
    },
    methods: {
        add(event){
            event.preventDefault();

            if(!this.value) return;

            this.$emit("add", this.value);
            this.value = "";
        }
    },
    computed: {
        placeholder(){
            return `input a ${this.label}`;
        }
    }
};
</script>

<style scoped></style>
