<template>
<div class="settings-container">
    <h2>Cài đặt trang web</h2>
    <ul class="settings-list">
        <li class="setting-item">
            <span>Xóa dữ liệu duyệt web</span>
            <p>Xóa dữ liệu web, cookie, bộ nhớ đệm, v.v.</p>
        </li>
        <li class="setting-item">
            <span>Hướng dẫn và quyền riêng tư</span>
            <p>Xem xét các chế độ kiểm soát quan trọng đối với quyền riêng tư và tính bảo mật</p>
        </li>
        <li class="setting-item">
            <span>Cookie và các dữ liệu khác của trang web</span>
            <p>Đặt các cookie bên thứ ba ở Chế độ ẩn danh</p>
        </li>
        <li class="setting-item">
            <span>Bảo mật</span>
            <p>Tính năng Duyệt web an toàn và các tùy chọn cài đặt bảo mật khác</p>
        </li>
        <li class="setting-item highlighted">
            <span>Cài đặt trang web</span>
            <p>Kiểm soát thông tin mà các trang web có thể sử dụng và hiển thị (vị trí, máy ảnh, cửa sổ bật lên và thông tin khác)</p>
        </li>
        <li class="setting-item">
            <span>Hộp cát về quyền riêng tư</span>
            <p>Kiểm soát tính năng dùng thử đang tắt</p>
        </li>
    </ul>
</div>
</template>

<script>

</script>

<style scoped>
.settings-container {
    width: 600px;
    margin: 0px auto;
    background-color: #f9f9f9;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.settings-list {
    list-style: none;
    padding: 0;
}

.setting-item {
    padding: 15px;
    border-bottom: 1px solid #ddd;
    cursor: pointer;
    transition: background-color 0.3s;
}

.setting-item:hover {
    background-color: #e9e9e9;
}

.highlighted {
    border-left: 5px solid red;
    background-color: #f0f0f0;
}

.setting-item span {
    font-weight: bold;
}

.setting-item p {
    margin: 5px 0 0 0;
    color: #555;
    font-size: 14px;
}
</style>
