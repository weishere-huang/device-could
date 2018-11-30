exports.install = function (Vue, options) {
  Vue.prototype.messageSuccess = function (msg) {
    this.$message({
      message: msg,
      type: 'success'
    });
    Vue.prototype.messageError = function (msg) {
      this.$message.error(msg);
    };

    Vue.prototype.affirm = function (msg) {
      this.$confirm(msg, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    };

    Vue.prototype.tableResize = function (fn) {
      console.log('tableResize');
    };
  };
}
