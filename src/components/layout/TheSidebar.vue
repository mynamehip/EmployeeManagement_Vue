<template>
    <div class="sidebar">
        <div class="sidebar__top">
            <div class="sidebar__menu-icon"></div>
            <div class="sidebar__web-logo"></div>
            <div class="sidebar__web-name">KẾ TOÁN</div>
        </div>
        <div class="sidebar__middle">
            <router-link to="/employee" class="menu-item">
                <div class="menu-item__icon">
                    <div class="item-tongquan"></div>
                </div>
                <div class="menu-item__text">Tổng quan</div>
            </router-link>
            <router-link to="/cash" class="menu-item">
                <div class="menu-item__icon">
                    <div class="item-tienmat"></div>
                </div>
                <div class="menu-item__text">Tiền mặt</div>
            </router-link>
            <router-link to="/deposit" class="menu-item">
                <div class="menu-item__icon">
                    <div class="item-tiengui"></div>
                </div>
                <div class="menu-item__text">Tiền gửi</div>
            </router-link>
            <div class="menu-item">
                <div class="menu-item__icon">
                    <div class="item-muahang"></div>
                </div>
                <div class="menu-item__text">Mua hàng</div>
            </div>
            <div class="menu-item">
                <div class="menu-item__icon">
                    <div class="item-banhang"></div>
                </div>
                <div class="menu-item__text">Bán hàng</div>
            </div>
            <div class="menu-item">
                <div class="menu-item__icon">
                    <div class="item-quanlyhoadon"></div>
                </div>
                <div class="menu-item__text">Quản lý hóa đơn</div>
            </div>
            <div class="menu-item">
                <div class="menu-item__icon">
                    <div class="item-kho"></div>
                </div>
                <div class="menu-item__text">Kho</div>
            </div>
            <div class="menu-item">
                <div class="menu-item__icon">
                    <div class="item-congcudungcu"></div>
                </div>
                <div class="menu-item__text">Công cụ dụng cụ</div>
            </div>
            <div class="menu-item">
                <div class="menu-item__icon">
                    <div class="item-taisancodinh"></div>
                </div>
                <div class="menu-item__text">Tài sản cố định</div>
            </div>
            <div class="menu-item">
                <div class="menu-item__icon">
                    <div class="item-thue"></div>
                </div>
                <div class="menu-item__text">Thuế</div>
            </div>
            <div class="menu-item">
                <div class="menu-item__icon">
                    <div class="item-giathanh"></div>
                </div>
                <div class="menu-item__text">Giá thành</div>
            </div>
            <div class="menu-item">
                <div class="menu-item__icon">
                    <div class="item-tonghop"></div>
                </div>
                <div class="menu-item__text">Tổng hợp</div>
            </div>
            <div class="menu-item">
                <div class="menu-item__icon">
                    <div class="item-ngansach"></div>
                </div>
                <div class="menu-item__text">Ngân sách</div>
            </div>
            <div class="menu-item">
                <div class="menu-item__icon">
                    <div class="item-baocao"></div>
                </div>
                <div class="menu-item__text">Báo cáo</div>
            </div>
            <div class="menu-item">
                <div class="menu-item__icon">
                    <div class="item-phantichtaichinh"></div>
                </div>
                <div class="menu-item__text">Phân tích tài chính</div>
            </div>
        </div>
        <div class="sidebar__bottom">
            <div class="sidebar__bottom-icon"><svg  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
              </div>
            <div class="sidebar__bottom-text"></div>
        </div>
    </div>
</template>