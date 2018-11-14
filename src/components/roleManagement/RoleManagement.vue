<template>
    <div class="roleManagement">
        <div class="case">
            <div class="left">
                <ul>
                    <li>系统管理员</li>
                    <li>数据分析员</li>
                    <li>设备管理员</li>
                    <li>运维管理员</li>
                    <li>企业管理员</li>
                    <li>工单管理员</li>
                    <li>工单审核专员</li>
                    <li>知识库管理员</li>
                    <li>消息管理员</li>
                </ul>
            </div>
            <div class="right">

            </div>
        </div>
    </div>
</template>
<style lang="less" scoped>
@blue: #409eff;
@Success: #67c23a;
@Warning: #e6a23c;
@Danger: #f56c6c;
@Info: #dde2eb;
@border: 1px solid #dde2eb;
.roleManagement {
  padding-left: 180px;
  .case {
    .left {
      width: 30%;
      border: @border;
      float: left;
      border-radius: 5px;
    }
    .right {
      width: 60%;
      border: @border;
      float: left;
      border-radius: 5px;
    }
  }
}
</style>
