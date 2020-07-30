$(function () {
    var layer = layui.layer;
    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }
    // 1.3 创建裁剪区域
    $image.cropper(options)
    $('#btnChooseImage').on('click', function () {
        $('#file').click();
    })
    // 实现裁剪区域图片切换
    $('#file').on('change', function (e) {
        var fileList = e.target.files;
        // console.log(fileList);
        if (fileList.length === 0) {
            return layer.msg('请选择照片！')
        }
        // 拿到用户选择的文件
        var file = e.target.files[0];
        // 将文件转换为路径
        var imgURL = URL.createObjectURL(file)
        // 3. 重新初始化裁剪区域
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', imgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域
    })
    // 将裁剪后的图片上传到服务器
    // 给确定按钮注册点击事件
    $('#btnUpload').on('click', function () {
        // 1.拿到用户裁剪后的头像
        var dataURL = $image
            .cropper('getCroppedCanvas', {
                // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png') // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
        // 进行数据请求
        $.ajax({
            method: 'POST',
            url: '/my/update/avatar',
            data: {
                avatar: dataURL
            },
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg('更新用户头像失败')
                }
                layer.msg('更新用户头像成功');
                window.parent.getUserInfo();
            }
        })
    })
})