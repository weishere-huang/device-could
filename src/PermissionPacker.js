
//import v_button from 'element-ui/packages/button';
//import {Button} from 'element-ui/src';
import { Message,Button,Switch } from 'element-ui';

let permissionUrl = "";
const validate=(permCode)=>{
  if(!permissionUrl) permissionUrl = JSON.parse(localStorage.getItem("permissionUrl")||'[]');
  const permCodeArr=permCode.split('.');
  for(let i=0,l=permissionUrl.length;i<l;i++){
    if(permissionUrl[i].module===permCodeArr[0]&&permissionUrl[i].permissionItem.find(item=>item===permCodeArr[1])){
      return true;
    }
  }
  return false;
}
function hoc (component) {
  return {
    data(){
      //let _hasPermission=false;
      if(!/\|\|/.test(this.$props.permCode)&&!/&&/.test(this.$props.permCode)){
        return {hasPermission:validate(this.$props.permCode)};
      }else{
        if(/\|\|/.test(this.$props.permCode)){
          const permCodeRegArr=this.$props.permCode.split('||');
          for(let i=0,l=permCodeRegArr.length;i<l;i++){
            if(validate(permCodeRegArr[i])){
              return {hasPermission:true};
            }
          }
          return {hasPermission:false};
        }else if(/&&/.test(this.$props.permCode)){
          const permCodeRegArr=this.$props.permCode.split('&&');
          let isPass=false;
          for(let i=0,l=permCodeRegArr.length;i<l;i++){
            if(!validate(permCodeRegArr[i])){
              return {hasPermission:false};
            }
          }
          return {hasPermission:true};
        }else{
          console.log('XXX');
          return {hasPermission:false};
        }
      }
      // return {
      //   hasPermission:_hasPermission
      // }
    },
    mounted () {
      //console.log('I have already mounted')
    },
    props: {
      permCode: {
        type: String,
        required: true
      },
      banType: {
        type: String,
        required: true
      },
      // resetBack:{
      //   type: Function,
      // },
      ...component.props
    },
    render (h) {
      //if(!permissionUrl) permissionUrl = JSON.parse(localStorage.getItem("permissionUrl"));
      
      const slots = Object.keys(this.$slots)
        .reduce((arr, key) => arr.concat(this.$slots[key]), [])
        .map(vnode => {
          vnode.context = this._self
          return vnode
        });

        let isHide=false;
        if(!this.hasPermission){
          switch(this.$props.banType){
            case "disable":
              this.$props.disabled=true;break;
            case "hide":
              isHide=true;
              break;
            case "alert":
              const noPerHandler=(newState)=>{
                Message.error({ message: `抱歉，您所在的权限组不能进行此操作` });
                this.$listeners.resetBack&&this.$listeners.resetBack(newState);
              }
              ['click','change'].forEach(handler=>{
                if(this.$listeners[handler])this.$listeners[handler]=noPerHandler;
              })
            break;
          }
        }
      return isHide?null:h(component, {
        on: this.$listeners,
        props: this.$props,
        // 透传 scopedSlots
        scopedSlots: this.$scopedSlots,
        attrs: this.$attrs
      }, slots)
    }
  }
}

// 定义 Loading 对象
const PermissionPacker={
    install:function(Vue){
        Vue.component('permission-button',hoc(Button));
        Vue.component('permission-switch',hoc(Switch));
        Vue.component('permission-wrapper',hoc({
          props: {
            tag:{
              type:String
            }
          },
          render: function (createElement) {
            return createElement(this.tag,
              this.$slots.default // 子元素数组
            )
          }
        }));
    }
}
// 导出
export default PermissionPacker;
