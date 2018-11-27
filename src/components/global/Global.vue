<script>
// const apiSrc = "http://www.hyazi.com:9881";
const apiSrc = 'http://192.168.1.104:9881';
// const apiSrc = 'http://192.168.1.103:8080';




function message(params) {
  this.$message("这是一条消息提示");
}
export default {
  apiSrc,
  message
};
</script>
