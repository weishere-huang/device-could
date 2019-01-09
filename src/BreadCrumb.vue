<template>
    <div class="navbar clearfix">
        <el-breadcrumb class="breadcrumb-container" separator-class="el-icon-arrow-right">
            <el-breadcrumb-item v-for="item in levelList" :key="item.path" :to="item.path">{{item.meta.pageName}}</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>

<script>
    export default {
        name: 'Navbar',
        data() {
            return {
                levelList: []
            }
        },
        watch: {
            $route() {
                this.getBreadcrumb()
            }
        },
        created(){
            this.getBreadcrumb()
        },
        methods:{
            getBreadcrumb() {
                // let matched = this.$route.matched.filter(item => item.name)
                // const first = matched[0];
                
                // if (first && first.name.trim().toLocaleLowerCase() !== 'Dashboard'.toLocaleLowerCase()) {
                //     matched = [{ path: '/dashboard', meta: { title: 'dashboard' }}].concat(matched)
                // }
                // this.levelList = matched
                let matched = this.$route.matched.filter(item => item&&item.name)
                let rList = [{ path: '/Home', meta: { pageName: '工作台' }}];
                matched.forEach(item => {
                    if(item.path!=='/Home')
                        rList.push({ path: item.path, meta: { pageName: item.props.default.pageName}});
                });
                this.levelList = rList;
            }
        }
    }
</script>