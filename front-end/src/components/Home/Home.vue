<template>
    <div class='tree-box'>
        hi
    </div>
</template>

<script>
    import api2html from '@/js/api2html';
    import renderTree from '@/js/renderTree';
    import * as API from 'vue';
    export default {
        name: 'Home',
        data () {
            return {
            }
        },
        mounted() {
            const data = api2html(API, 'vue');
            const boxSelector = '.tree-box';
            renderTree(boxSelector, data, (d) => {
            });
        }
    }
</script>

<style>
    @import './Home.less';
</style>
