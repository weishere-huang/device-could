<template>
 <div >
  <el-row class="warp">
   <el-col :span="24" class="warp-breadcrum">
      <el-button type="primary" @click="onSubmit" size="small"><i style='font-size:12px' class='iconfont'>&#xe645;</i>&nbsp;保存</el-button>
   </el-col>
<!--
Form 组件提供了表单验证的功能，只需要通过 rule 属性传入约定的验证规则，并 Form-Item 的 prop 属性设置为需校验的字段名即可。具体可以参考官网：http://element.eleme.io/#/zh-CN/component/form
-->
   <el-col :span="24" class="warp-main">
    <el-form ref="infoForm" :model="infoForm" :rules="rules" label-width="60px">
     <el-form-item label="标题" prop="a_title">
      <el-input v-model="infoForm.a_title"></el-input>
     </el-form-item>
     <el-form-item label="详细">
      <div class="edit_container">
       <quill-editor v-model="infoForm.a_content"
              ref="myQuillEditor"
              class="editer"
              :options="editorOption" @ready="onEditorReady($event)">
       </quill-editor>
      </div>
     </el-form-item>
    </el-form>
   </el-col>
  </el-row>
 </div>
</template>
 
<script>
 import { quillEditor } from 'vue-quill-editor' //调用编辑器
 export default {
  data() {
   return {
    infoForm: {
     a_title: '',
     a_source: '',
     a_content:'',
     editorOption: {}
    },
    //表单验证
    rules: {
     a_title: [
      {required: true, message: '请输入标题', trigger: 'blur'}
     ],
     a_content: [
      {required: true, message: '请输入详细内容', trigger: 'blur'}
     ]
    },
   }
  },
  computed: {
   editor() {
    return this.$refs.myQuillEditor.quill
   }
  },
  mounted() {
   //初始化
  },
  methods: {
   onEditorReady(editor) {
   },
   onSubmit() {
      console.log("ok");
   },
   // editorOption(value){
   //    console.log(value);
   // }
  },
  components: {
//使用编辑器
   quillEditor
  }
 }
</script>
<style lang="less">
  @blue: #409eff;
  @Success: #67c23a;
  @Warning: #e6a23c;
  @Danger: #f56c6c;
  @Info: #dde2eb;
  @border: 1px solid #dde2eb;
.ql-container{
   height: 500px;
   overflow: scroll;
}
.warp-breadcrum{
   border: @border;
   padding: 10px;
   border-radius: 5px;
}
.warp-main{
   margin-top: 10px;
   border: @border;
   padding: 10px;
   border-radius: 5px;
}
</style>
