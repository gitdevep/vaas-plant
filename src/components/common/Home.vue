<template>
    <div class="wrapper">
        <v-head></v-head>
        <div style="display: flex;height: 100%;">
            <v-sidebar></v-sidebar>
            <div class="content">
                <router-view></router-view>
            </div> 
        </div>
        <v-foot></v-foot>
    </div>
</template>

<script>
    import vHead from './Header.vue';
    import vSidebar from './Sidebar.vue';
    import vFoot from './Footer.vue';
    export default {
        data(){
            return {
            }
        },
        components:{
            vHead, vSidebar, vFoot
        },
        created(){
          
        }
    }
</script>
