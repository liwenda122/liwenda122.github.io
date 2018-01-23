<style lang="less" scoped>
    @import "../less/navmenu.less";
</style>
<template>
    <el-menu mode="horizontal" unique-opened  menu-trigger="hover" :default-active="activePath" class="el-menu-vertical" :router=true theme="dark" @open="handleOpen"
             @close="handleClose">
        <div v-for="(item, index) in menus"  class="items-wrap">
            <el-menu-item :index="item.path" v-if="!item.group">
                <i :class="item.icon"></i>{{item.name}}
            </el-menu-item>
            <el-submenu :index="item.path" v-if="item.group" :class="{'is-active':item.isActive}">
                <template slot="title"><i :class="item.icon"></i>{{item.name}}</template>
                <el-menu-item v-for="groupItem in item.group" :index="groupItem.path">
                    {{groupItem.name}}
                </el-menu-item>
            </el-submenu> 
        </div>
    </el-menu>
</template>
<script>
    import { mapState } from 'vuex'
    export default {
        data(){
            /*当前激活的菜单*/
            var activePath = '/';
            return {
                activePath,
                menus: [
                    {path: '/', name: '首页', icon: 'icon-toolbar_ico_home',pmsModuleCode:'PMS001',auth:true},
                    {path: '/purchase', name: '追踪', icon: 'el-icon-search',pmsModuleCode:'PMS002',auth:true},
                    {
                        path: '/reports', name: '图表', icon: 'icon-toolbar_ico_baobiao',
                        pmsModuleCode:'PMS005',
                        auth:true
                    },
                    {
                        path:'/settings',name: '基础设置', icon: 'icon-toolbar_ico_setting',
                        group: [
                            {path: '/settings/handleUser/index', name: '司机管理'},
                            {path: '/settings/handlePurchase/index', name: '设备管理'},
                            {path: '/settings/handleMateriel/index', name: '车辆管理'},
                        ],
                        pmsModuleCode:'PMS006',
                        auth:true,
                        isActive:false
                    }
                ]
            }
        },
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            },
            handleActiveMenu(){
                var that = this;
                if (this.$route.path == '/') {
                    this.activePath = '/';
                } else {
                    var parent = this.$route.path.substring(0, this.$route.path.lastIndexOf("/")+1);
                    for (var n of this.menus){
                        //this.menus.forEach(function (n, key) {
                        if(n.group){
                            for (var data of n.group){
                                if( data.path.indexOf(parent) > -1){
                                    that.activePath = data.path;
                                    n.isActive =true;
                                    break;
                                }
                            }

                        }else{
                            if (n.path !='/' ) {
                                if(parent !=''){
                                    if(parent.indexOf(n.path) > -1 || that.$route.path == n.path){
                                        that.activePath = n.path;
                                        break;
                                    }
                                }else if(that.$route.path == n.path){
                                    that.activePath = n.path;
                                    break;
                                }
                            }
                        }
                    }
                }
            }
        },
        created: function () {
            this.handleActiveMenu();
        },
        computed: mapState({
            user: state => state.user
        })
    }
</script>