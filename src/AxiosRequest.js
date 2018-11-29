/*
 * @Author: weisheres.huang 
 * @Date: 2018-11-28 15:31:51 
 * @Last Modified by: weishere.huang
 * @Last Modified time: 2018-11-29 11:10:11
 */
import axios from 'axios';
import global from './components/global/Global';
import { Message,Loading } from 'element-ui';
axios.defaults.withCredentials = true;

export default ({ url, type, params, config,loadingConfig},vue) => {
    //api的url加入统一前缀
    url=`${global.apiSrc}${url}`;
    // if (process.env.NODE_ENV === 'development') {
    //     url = `/api${url}`;
    // }
    
    return new Promise((resolve, reject) => {
        //这里加一个通用的数据重置后门
        if (params.reset === true) {
            resolve({ code: 0, data: params.resetData });
            return;
        }
        window.setTimeout(()=>{
            const loading=Loading.service(Object.assign({
                lock: true,
                text: '玩命加载中，请稍候...',
                spinner: 'el-icon-loading',
                background: 'rgba(255,255,255, 0.8)',
                target: document.querySelector('.mainContentWrapper'),
                customClass:'loadingStyle'
                },loadingConfig||{}));

                axios[type||'post'](url, {params:params}, config || {}).then(res => {
                    if (res.status === 200 && res.data.code === 200) {
                        //success && success(res.data);
                        Message.success({message:'请求成功', customClass:'e-message', duration:1500});
                        resolve(res);
                    } else {
                        //faild && faild(res.data);
                        console.log(info);
                        Message.error({message:`${res.data.msg}(${res.data.code})`,customClass:'e-message', duration:5000});
                        reject({ type: 'faild', info: res.data });
                    }
                    loading.close();
                }).catch(res => {
                    //error && error(res);
                    loading.close();
                    console.log(info);
                    Message.error({message:`网络异常：${res.message}`,customClass:'e-message', duration:5000});
                    reject({ type: 'error', info: res });
                    // dispatch({
                    //     type: 'FAILED',
                    //     payload: res
                    // });
                    window.setTimeout(() => {
                        //2秒后自动重置错误信息
                        // dispatch({
                        //     type: 'RESET_FAILED'
                        // });
                    }, 2000);
                })
        },10)
        
        
    })
}
