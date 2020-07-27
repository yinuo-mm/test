$(function () {
    $('#link_reg').on('click', function () {
        $('.reg-box').show();
        $('.login-box').hide();
    });
    $('#link_login').on('click', function () {
        $('.reg-box').hide();
        $('.login-box').show();
    })
    var form = layui.form;
    // console.log(layui.form);
    var layer = layui.layer;
    // console.log(layui);

    form.verify({
        // 密码校验
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        // 验证2次密码是否一致
        repwd: function (value) {
            // 通过形参拿到的是确认密码框中的内容
            // 还需要拿到密码框中的内容
            // 然后进行一次等于的判断
            // 如果判断失败,则return一个提示消息即可
            var pwd = $('.reg-box [name=password]').val()
            if (pwd !== value) {
                return '两次密码不一致！'
            }
        }
    })
    // 给注册表单添加AJAX请求
    $('#form_reg').on('submit', function (e) {
        // 阻止默认提交行为
        e.preventDefault();
        var data = {
            username: $('#form_reg [name=username]').val(),
            password: $('#form_reg [name=password]').val()
        }
        $.ajax({
            method: 'POST',
            url: '/api/reguser',
            data,
            success: function (res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg('用户名注册成功，请登录');
                $('#link_login').click();
            }
        })
    })
    // 给登录页面添加AJAX请求
    $('#form_login').on('submit', function (e) {
        e.preventDefault();
        var data = {
            username: $('#form_login [name=username]').val(),
            password: $('#form_login [name=password]').val()
        }
        $.ajax({
            method: 'POST',
            url: '/api/login',
            data,
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg('登录成功')
                localStorage.setItem('token', res.token)
                location.href = '/index.html'
            }
        })
    })

})