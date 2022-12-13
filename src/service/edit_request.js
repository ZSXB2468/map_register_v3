import axios from 'axios'
import { get_user_token } from './user_info'
import { create_notify } from "../api/common"
const baseurl = `${process.env.VITE_API_BASE}/api`
// Const baseurl = 'http://localhost:9000/api/api'
async function default_request(method, url, data = undefined) {
    try {
        return await axios({
            method,
            url,
            data: JSON.stringify(data),
            transformRequest(data) {
                if (get_user_token() === null) {
                    window.alert('登录认证已失效，请重新登录！')
                    window.location.reload();
                }

                return data
            },
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${get_user_token()}`
            }
        })
    } catch (error) {
        if (error.response) {
            create_notify(`${error.response.status} ${error.response.statusText}`, 'negative')

        } else if (error.request) {
            create_notify('链接失败，请稍后重试', 'negative')
        } else {
            create_notify(error.message, 'negative')
        }
    }
}

// 上传点位
function upload_layer(data) {
    return default_request('put', `${baseurl}/marker/single`, data)
}

// 修改点位
function edit_layer(data) {
    return default_request('post', `${baseurl}/marker/single`, data)
}

// 删除点位
function delete_layer(data) {
    return default_request('delete', `${baseurl}/marker/${data}`)
}

// 上传点位额外信息
function upload_layer_extralabel(data) {
    return default_request('put', `${baseurl}/marker/extra`, data)
}

function edit_layer_extralabel(data) {
    return default_request('post', `${baseurl}/marker/extra`, data)
}

export {
    upload_layer,
    edit_layer,
    delete_layer,
    upload_layer_extralabel,
    edit_layer_extralabel
}
