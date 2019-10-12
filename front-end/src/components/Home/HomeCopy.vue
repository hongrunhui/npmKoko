<template>
    <div class='tree-box'>
        hi
    </div>
</template>

<script>
    import api2html from '@/js/api2html';
    import renderTree from '@/js/renderTree';
    import * as API from '${name}';
    export default {
        name: 'Home',
        data () {
            return {
            }
        },
        mounted() {
            const data = api2html(API, '${name}');
            const boxSelector = '.tree-box';
            renderTree(boxSelector, data, (d) => {
            });
        }
    }
</script>

<style>
    @import './Home.less';
</style>
