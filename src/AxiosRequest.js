/*
 * @Author: weisheres.huang 
 * @Date: 2018-11-28 15:31:51 
 * @Last Modified by: weisheres.huang
 * @Last Modified time: 2018-12-05 10:12:21
 */
import axios from 'axios';
import global from './components/global/Global';
import { Message, Loading } from 'element-ui';
axios.defaults.withCredentials = true;

export default ({ url, type, params, config, option, loadingConfig }, vue) => {

    //process.env.NODE_ENV === 'development' && url = `/api${url}`;
    option = Object.assign({
        requestTarget: 'd',
        enableMsg: true,
        successMsg: '数据请求完成~',
        enableLoad:true
    }, option || {});
    const loadInit = function () {
        if(!option.enableLoad){
            return {close:()=>{}}
        }
        return Loading.service(Object.assign({
            lock: true,
            text: '正加载中，请稍候...',
            spinner: 'el-icon-loading',
            background: 'rgba(255,255,255, 0.8)',
            target: document.querySelector('.mainContentWrapper'),
            customClass: 'loadingStyle'
        }, loadingConfig || {}));
    }
    if (Object.prototype.toString.call(url) === '[object Array]') {
        //数组
        // params = Object.prototype.toString.call(params)!== '[object Array]'?[params||{},params||{}]:params;
        // type=Object.prototype.toString.call(type)!== '[object Array]'?[(type||"post"),(type||"post")]:type;
        const loading = loadInit();
        const runAsync = url.map((_url, index) => {
            //api的url加入统一前缀
            _url = `${global.apiSrc}/${option.requestTarget}${_url}`;
            const _params = Object.prototype.toString.call(params) !== '[object Array]' ? params || {} : params[index];
            const _type = Object.prototype.toString.call(type) !== '[object Array]' ? type || "post" : type[index];
            return new Promise(function (resolve, reject) {
                //window.setTimeout(() => {
                    axios[_type](_url, _type === "get" ? { params: _params } : _params, config || {}).then(res => {
                        loading.close();
                        if (res.status === 200 && (res.data.code === 200||res.data.code === 204)) {
                            //success && success(res.data);
                            //option.enableMsg && Message.success({message:option.successMsg, customClass:'e-message', duration:1500});
                            resolve(res);
                        } else if(res.status === 200 && res.data.code >= 300&&res.data.code < 400){
                            Message.error({ message: `登录失效，即将跳转至登录页`, customClass: 'e-message', duration: 5000 });
                            window.setTimeout(()=>{
                                vue.$router.replace("/Login");
                            },1000);
                        } else {
                            //console.log(res.data.msg);
                            Message.error({ message: `${res.data.msg}(${res.data.code})`, customClass: 'e-message', duration: 5000 });
                            reject({ type: 'faild', info: res.data });
                        }
                    }).catch(res => {
                        //error && error(res);
                        loading.close();
                        //console.log(info);
                        Message.error({ message: `网络异常：${res.message}`, customClass: 'e-message', duration: 5000 });
                        reject({ type: 'error', info: res });
                    })
                //}, 10);
            });
        });
        return new Promise((resolve, reject) => {
            window.setTimeout(() => {
                Promise.all(runAsync).then(function (results) {
                    option.enableMsg && Message.success({ message: option.successMsg, customClass: 'e-message', duration: 2000 });
                    resolve(results);
                });
            }, 10);
        });
    } else {
        url = `${global.apiSrc}/${option.requestTarget}${url}`;
        params = params || {};
        return new Promise((resolve, reject = () => { }) => {
            //这里加一个通用的数据重置后门
            if (params.reset === true) {
                resolve({ code: 0, data: params.resetData });
                return;
            }
            //window.setTimeout(() => {
                const loading = loadInit();
                axios[type || 'post'](url, type === 'get' ? { params: params } : params, config || {}).then(res => {
                    if (res.status === 200 && (res.data.code === 200||res.data.code === 204)) {
                        //success && success(res.data);
                        option.enableMsg && Message.success({ message: option.successMsg, customClass: 'e-message', duration: 2000 });
                        //option.enableMsg && Message.success({message:option.successMsg, customClass:'e-message', duration:1500});
                        resolve(res);
                    }else if(res.status === 200 && res.data.code >= 300&&res.data.code < 400){
                        Message.error({ message: `登录失效，即将跳转至登录页`, customClass: 'e-message', duration: 5000 });
                        window.setTimeout(()=>{
                            vue.$router.replace("/Login");
                        },1000);
                    } else {
                        //faild && faild(res.data);
                        console.log(res.data.msg);
                        Message.error({ message: `${res.data.msg}(${res.data.code})`, customClass: 'e-message', duration: 5000 });
                        reject({ type: 'faild', info: res.data });
                    }
                    loading.close();
                }).catch(res => {
                    //error && error(res);
                    loading.close();
                    //console.log(info);
                    Message.error({ message: `网络异常：${res.message}`, customClass: 'e-message', duration: 5000 });
                    reject({ type: 'error', info: res });
                    // window.setTimeout(() => {
                    //     2秒后自动重置错误信息
                    //     dispatch({
                    //         type: 'RESET_FAILED'
                    //     });
                    // }, 2000);
                })
            //}, 10)
        })
    }
}
