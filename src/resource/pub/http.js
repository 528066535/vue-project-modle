/**
 * Created by 周文博 on 2017/1/17.
 * 封装ajax操作
 */
import dialog from './dialog';
import util from './util';
import store from '../core/store';
import {isIe} from './util';
import config from '@Core/config';
import Data from '@Core/data';

let PROXY_URL = config.PROXY_URL

/**
 * 去除空值
 * @param data 请求数据
 * @param method 请求方法
 * @private
 */
function trimData(data, method) {
    data = data || {};
    for(let key in data){
        let v = data[key];
        if(((v === '' || v === 'all') && method === 'GET') || v === undefined){
            delete data[key];
        }
        if(v === 'ALL'){
            data[key] = 'all';
        }
    }
    return data;
}

/**
 * ajax请求
 * @param url
 * @param data
 * @param method
 * @param silent 是否静默
 * @returns {*}
 */

function ajax(url, data={}, method, silent){
    let dtd = $.Deferred();
    let param = '';
    let headers = {
        'Cache-Control': "no-cache"
    };
    if(util.isString(data)){
        param = data;
        headers['Content-type'] = 'application/json;charset=utf-8';
    }else{
        if(isIe){
            data = data || {};
            data.timestamp = new Date().getTime();
        }
        param = trimData(data, method);
    }

    if(isIe){
        if(url.indexOf('?') >= 0){
            url += '&t=' + new Date().getTime();
        }else{
            url += '?t=' + new Date().getTime();
        }
    }
    const token = Data.getToken();
    if(token){
        headers.Token = token;
        data.token = token
    }
    // param.token = token;
    param.tokenname = param.tokenname?param.tokenname:Data.getUser();
    // param.adminname = param.tokenname?param.tokenname:Data.getUser();

    $.ajax(`${PROXY_URL}${url}`, {
        data: param,
        type: method,
        headers: headers,
        timeout: 600000,
        complete: function (XHR, TS) {
            XHR = null
        },
        success: function(data, status, response){
            data = JSON.parse(data);
            if(data !== undefined){
                if(data.token){
                    Data.setToken(data.token)
                }
                if(data.code == '0') {
                    dtd.resolve(data, response);
                }
                else if(data.code == '-2') {
                    this.dialog && this.dialog.close();
                    Data.removeToken('')
                    Data.removeLevel()
                    dtd.reject(data, response);
                    document.location.href = '/#/login'
                }
                else {
                    dialog.error(data.msg);
                    dtd.reject(data)
                }
            }else{
                dtd.resolve({});
                console.log('请求地址: '+url+',请求参数:'+JSON.stringify(param)+',返回结果:' + JSON.stringify(data));
            }
        },
        error: function(xhr){
            if(xhr.statusText !== 'abort'){
                if(parseInt(xhr.status) === 0){
                    dialog.error('网络连接失败!');
                }else if(parseInt(xhr.status) === 503){
                    dialog.error('服务不可用，请联系管理员!');
                }else if(parseInt(xhr.status) === 405){
                    dialog.error('接口调用Method错误!');
                }else if(parseInt(xhr.status) === 404){
                    dialog.error('接口不存在!');
                }else if(parseInt(xhr.status) === 401){
                    if(!silent){
                        util.noticeLogOut();
                    }else{
                        dtd.reject({msg: '没有登录！', status: -1});
                    }
                }else {
                    let result = null;
                    try{
                        result = $.parseJSON(xhr.responseText);
                        dialog.error(result.msg);
                    }catch(e){
                        dialog.error(xhr.responseText || '系统报错！请联系管理员');
                    }
                }
            }
            dtd.reject();
        }
    });

    return dtd.promise();
}

/**
 *
 * @param url
 * @param file
 * @param progress
 * @param success
 * @param error
 * @param param
 */
function doUpload(url, file, progress, success, error, param){
    if(file){
        let xhr = new XMLHttpRequest();
        xhr.upload.addEventListener("progress", function (e) {
            progress && progress(e.loaded/e.total);
        }, false);

        xhr.addEventListener("load", function (e) {
            if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
                try{
                    let ret = $.parseJSON(xhr.responseText);
                    if(ret.status === undefined && ret.result !== undefined){
                        ret.status = ret.result;
                    }
                    if(ret.result === 0 || parseInt(ret.status) === 0){
                        dialog.error(ret.msg);
                        error && error();
                    }else{
                        success(ret, file);
                    }
                }catch (e){
                    dialog.error('系统报错，请联系管理员');
                    error && error();
                }
            }
            if(xhr.status === 500){
                try{
                    let ret = $.parseJSON(xhr.responseText);
                    dialog.error(ret.msg);
                }catch (e){
                    dialog.error('上传失败');
                    error && error();
                }
                error && error();
            }
        }, false);

        xhr.addEventListener("error", function (e) {
            dialog.error('上传失败');
            error && error();
        }, false);

        let formData = new FormData();
        formData.append("file", file);
        if(param){
            for(let key in param){
                formData.append(key, param[key]);
            }
        }

        xhr.open("post", '/api' + url, true);
        const token = store.get('token');
        if(token){
            xhr.setRequestHeader('Token', token);
        }
        xhr.send(formData);
    }
}

function parseUrl(url) {
    const token = store.get('token') || '';
    const params = util.getUrlParams(url);
    url = url.split('?')[0];
    if(token){
        params.Token = token;
    }
    let paramArr = [];
    for(var key in params){
        if(params[key]){
            paramArr.push(`${key}=${encodeURIComponent(decodeURIComponent(params[key]))}`);
        }
    }

    return `${url}?${paramArr.join('&')}`;
}

export default {

    /**
     * get 请求
     * @param url
     * @param data
     * @returns {*}
     */
    get(url, data) {
        return ajax(url, data, 'GET');
    },

    /**
     * 静默请求，失败不做任何提示
     * @param url
     * @param data
     */
    getSilent(url, data) {
        return ajax(url, data, 'GET', true);
    },

    /**
     * 静默请求，失败不做任何提示
     * @param url
     * @param data
     */
    postSilent(url, data) {
        return ajax(url, data, 'POST', true);
    },

    /**
     * post 请求
     * @param url
     * @param data
     * @returns {*}
     */
    post(url, data){
        return ajax(url, data, 'POST');
    },

    /**
     * put 请求
     * @param url
     * @param data
     * @returns {*}
     */
    put(url, data){
        return ajax(url, data, 'PUT');
    },

    /**
     * DELETE 请求
     * @param url
     * @param data
     * @returns {*}
     */
    delete(url, data){
        return ajax(url, data, 'DELETE');
    },

    uploadByUrl: doUpload,

    getJSON(url){
        const dtd = $.Deferred();
        $.getJSON(parseUrl(url), {timespan: new Date().getTime()}, function (data) {
            dtd.resolve(data);
        });
        return dtd.promise();
    },

    link(url){
        window.open(`/luke${parseUrl(url)}`, 'download');
    },

    downloadFile(path,name=''){
        if(!path) {
            return dialog.error('暂无文件');
        }
        const token = store.get('token');
        window.open(`/api/file/download?filePath=${path}&fileName=${name}&Token=${token}`);
    }
};
