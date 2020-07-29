$.ajaxPrefilter(function (options) {
    options.url = 'http://ajax.frontend.itheima.net' + options.url;
    // 身份认证字段
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''

        }
    }
    // 限制用户登录
    options.complete = function (res) {
        // console.log('返回来');
        // console.log(res);
        if (res.responseJSON.status !== 0) {
            localStorage.removeItem('token');
            location.href = '/login.html';
        }
    }
})