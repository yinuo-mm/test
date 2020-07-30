$(function () {
    // 设置校验规则
    var form = layui.form;
    form.verify({
        // pwd: [/^[/s]{6,12}$/, '密码必须是6到12位，且不能出现空格'],
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        samePwd: function (value) {
            if (value === $('[name=oldPwd]').val()) {
                return '新密码不能跟原密码相同'
            }
        },
        rePwd: function (value) {
            if (value !== $('[name=newPwd]').val()) {
                return '两次密码输入不一致'
            }
        }
    })
})