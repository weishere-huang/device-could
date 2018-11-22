<template>
  <div class="home">
    默认页面
  </div>
</template>
<script>
  export default {
    data() {
      return {
      };
    },
    methods: {
      // toLogin() {
      //   this.$router.push({
      //     path: "/Login"
      //   });
      // },
      // isToHome(){
      //   axios
      //     .get("/api/role/listAllRole")
      //     .then(response => {
      //       // console.log(response.data.code);
      //       if (response.data.code === 204){
      //
      //       }else{
      //         this.toLogin()
      //       }
      //     })
      //     .catch(function(error) {
      //       console.log(error);
      //     });
      // }
    },
    created(){
      // this.isToHome();
    }
  };
</script>
<style lang="less" scoped>
  .home {
    text-align: left;
    padding-left: 220px;
  }
</style>
