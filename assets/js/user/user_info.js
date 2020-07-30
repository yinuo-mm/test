$(function () {
    // 表单验证
    var form = layui.form;
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称长度必须在1-6字符之间'
            }
        }
    })
    initUserInfo();
    // 实现重置效果
    $('#reset_btn').on('click', function (e) {
        e.preventDefault();
        initUserInfo();
    })
    // 发起请求更新用户信息
    $('.layui-form').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layui.layer.msg('更新信息失败！')
                }
                layui.layer.msg('更新信息成功！')
                // 调用父元素的方法，重新渲染用户头像和信息
                window.parent.getUserInfo()
            }

        })
    })
})
// 获取用户信息
function initUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        success: function (res) {
            if (res.status !== 0) {
                layui.layer.msg('获取用户信息错误')
            }
            // console.log(res.data);
            layui.form.val('formUserInfo', res.data);
        }
    })
}