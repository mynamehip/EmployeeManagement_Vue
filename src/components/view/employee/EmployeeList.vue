<template>
    <div class="page__header">
        <div class="page__title">Nhân viên</div>
        <div class="page__button">
            <button class="btn" @click="openInputForm">Thêm mới một nhân viên</button>
        </div>
    </div>
    <div class="page__container">
        <div class="m-table">
            <div class="m-table__toolbar">
                <div class="m-table__toolbar--left">

                    <div class="m-table__check-count" v-if="isCountShowing">
                        <div class="check-count__text">
                            Đã chọn: {{ checkboxCount }}
                        </div>
                        <MISAButton :type="'btn btn--no-color btn--hover-red'" @click="unCheck" :title="'Bỏ chọn tất cả'">
                        </MISAButton>
                        <MISAButton :type="'btn-with-icon btn--color-red'" :icon="'button-delete__icon'"
                            @click="onDeleteAll" :title="'Xóa tất cả'"></MISAButton>
                    </div>
                </div>
                <div class="m-table__toolbar--right">
                    <div class="m-table__searchbar">
                        <button class="searchbar__button" @click="loadPage">
                            <div class="searchbar__button-icon"></div>
                        </button>
                        <input v-bind="searchInfor" type="text" class="searchbar__input" placeholder="Tìm kiếm trong danh sách">
                    </div>
                    <button @click="reloadTable">
                        <div class="m-table__toolbar-button"></div>
                    </button>
                </div>
            </div>
            <div class="m-table__body">
                <MProgress v-if="this.isLoading"></MProgress>
                <MTable v-if="!this.isLoading" ref="table" :tableTitle="tableTitle" :tableData="employees" :rowId="rowId"
                    v-model:idArray="entityIdArray" @onDeleteRow="onDeleteEmployee" @getCheckedRow="getCheckedRow"
                    @onUpdate="onUpdate"></MTable>
            </div>
            <div class="m-table__paging">
                <div class="paging__right">
                    Tổng số: {{ total }} bản ghi
                </div>
                <div class="paging__left">
                    <div class="paging__title">

                    </div>
                    <div class="select paging__select">
                        <MISACombobox type="small" 
                            :inData="paingData"
                            itemDisplay="Display"
                            itemGet="Number"
                            up
                            v-model="numberRecord"
                        ></MISACombobox>
                    </div>
                    <div class="paging__button">
                        <MISAButton type="btn-icon--medium" icon="icon--move-left" @click="toPreviousPage"></MISAButton>
                        <!-- <MISAButton type="btn-icon--medium" title="1"></MISAButton>
                        <span style="cursor: pointer;"> ... </span>
                        <MISAButton type="btn-icon--medium" title="1"></MISAButton> -->
                        <MISAButton type="btn-icon--medium" :title="currentPage"></MISAButton>
                        <!-- <MISAButton type="btn-icon--medium" title="3"></MISAButton>
                        <span style="cursor: pointer;"> ... </span>
                        <MISAButton type="btn-icon--medium" title="10"></MISAButton> -->
                        <MISAButton type="btn-icon--medium" icon="icon--move-right" @click="toNextPage"></MISAButton>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <ToastMessage v-if="isShowToast" @onCloseToast="deleteToast" :title="toastTitle" :content="toastContent"></ToastMessage>
    <TheDialog v-if="isShowDiaLog" :title="dialogTitle" :content="dialogContent" :showDialog="closeDiaLog"
        :dialogMode="dialogMode" @dialogConfirm="dialogConfirm"></TheDialog>
    <InputForm v-if="isShowForm" 
        :isShowing="openInputForm" 
        :employeeEdit="employeeForUpdate"
        @formResult="formResult">
    </InputForm>
</template>

<script>
import axios from 'axios';
import MProgress from '@/components/base/Progress/MProgress.vue';
import InputForm from './Form/InputForm.vue';
import TheDialog from '@/components/base/Dialog/TheDialog.vue';
import ToastMessage from '@/components/base/Toast/ToastMessage.vue';
import MISACombobox from '@/components/base/Combobox/MISACombobox.vue';
import MTable from '@/components/base/Table/MTable.vue';

export default {
    components: {
        InputForm,
        TheDialog,
        ToastMessage,
        MProgress,
        MTable,
        MISACombobox
    },

    name: "EmployeeList",
    created() {
        this.isLoading = true;
        this.$_axios.get("https://localhost:7230/api/v1/Employees")
        .then((res) => {
            console.log(res);
            this.employees = res.data;
            this.isLoading = false;
        })
        .catch((error) =>{
            console.log(error);
        });
        //this.loadPage();
    },
    unmounted() {
    },
    updated() {
        this.countTotal();
        this.countCheckbox();
    },
    watch: {
        numberRecord: function(){
            this.loadPage();
        }
    },
    data() {
        return {
            tableData: [],
            employees: [],
            employeeForUpdate: {},
            isLoading: false,
            tableTitle: [
                { title: "MÃ NHÂN VIÊN", width: 110, alight: "left", data: "EmployeeCode" },
                { title: "TÊN NHÂN VIÊN", width: 150, alight: "left", data: "FullName" },
                { title: "GIỚI TÍNH", width: 76, alight: "left", data: "Gender" },
                { title: "NGÀY SINH", width: 84, alight: "center", data: "DateOfBirth" },
                { title: "SỐ CMND", width: 120, alight: "left", data: "IdentityNumber" },
                { title: "CHỨC DANH", alight: "left", data: "PositionName" },
                { title: "TÊN ĐƠN VỊ", alight: "left", data: "DepartmentName" },
                { title: "SỐ TÀI KHOẢN", width: 120, alight: "left", data: "BankNumber" },
                { title: "CHI NHÁNH TÀI KHOẢN NGÂN HÀNG", alight: "left", data: "BankBranches" },
            ],
            rowId: "EmployeeId",

            isShowForm: false,
            isCountShowing: false,
            checkboxCount: 0,
            total: 0,

            isShowDiaLog: false,
            dialogTitle: undefined,
            dialogContent: undefined,
            dialogMode: 0,
            entityId: undefined,
            entityIdArray: [],

            isShowToast: false,
            toastTitle: undefined,
            toastContent: undefined,

            paingData:[
                {Display: "10 bản ghi/trang", Number: 10},
                {Display: "20 bản ghi/trang", Number: 20},
                {Display: "50 bản ghi/trang", Number: 50},
            ],
            numberRecord: 0,
            currentPage: 1,
            previousPage: null,
            nextPage: null,
            firstPage: null,
            lastPage: null,

            searchInfor: null,
        }
    },
    methods: {
        loadPage(){
            this.isLoading = true;
            const pageSize = "pageSize=" + this.numberRecord;
            const pageNumber = "pageNumber" + this.currentPage;
            const searchText = "searchText" + this.searchInfor;
            this.tableData = [];
            this.employees = [];
            this.$_axios.get(`https://cukcuk.manhnv.net/api/v1/Employees/filter?${pageSize}&${pageNumber}&${searchText}`)
            .then((res) => {
                this.tableData = res.data;
                this.isLoading = false;
                this.total = this.tableData.TotalRecord;
                for(let i = 0; i < this.numberRecord; i++){
                    const records = i + (this.currentPage - 1) * this.numberRecord;
                    if(records <this.tableData.TotalRecord){
                        this.employees[i] = this.tableData.Data[records];
                    }
                }
            })
            .catch((error) => {
                console.log(error);
            });
        },

        toPreviousPage(){
            try {
                if(this.currentPage > 1){
                    this.currentPage--;
                    this.loadPage();
                }
            } catch (error) {
                console.log(error);
            }
        },

        toNextPage(){
            try {
                if(this.currentPage < this.tableData.TotalPage){
                    this.currentPage++;
                    this.loadPage();
                }
            } catch (error) {
                console.log(error);
            }
        },



        //#region Xử lý dialog
        //Đóng, mở dialog
        closeDiaLog() {
            this.isShowDiaLog = !this.isShowDiaLog;
        },

        //Gọi hàm khi xác nhận trên dialog
        dialogConfirm(_confirm) {
            if (_confirm == 1) {
                //Dialog bình thường
                if (this.dialogMode == this.$_MISAEnum.DIALOG_MODE.PRIMARY) {
                    return;
                }
                //Dialog xóa 1
                else if (this.dialogMode == this.$_MISAEnum.DIALOG_MODE.DELETE) {
                    //Xóa nhân viên
                    this.deleteEmployee();
                    this.dialogMode = this.$_MISAEnum.DIALOG_MODE.PRIMARY;
                }
                //Dialog xóa nhiều
                else if (this.dialogMode == this.$_MISAEnum.DIALOG_MODE.DELETE_ALL) {
                    //Xóa nhân viên
                    this.deleteAll();
                    this.dialogMode = this.$_MISAEnum.DIALOG_MODE.PRIMARY;
                }
            }
        },
        //#endregion

        //#region Xoá một nhân viên
        //Xét id và gọi dialog xác nhận xóa
        onDeleteEmployee(index) {
            //Xét id được chọn
            this.settingIndex(index);
            //Đặt giá trị và gọi dialog
            this.dialogTitle = "Xác nhận xóa";
            this.dialogContent = "Bạn có chắc chắn muốn xóa nhân viên không";
            this.dialogMode = this.$_MISAEnum.DIALOG_MODE.DELETE;
            this.isShowDiaLog = !this.isShowDiaLog;
        },

        //Xóa nhân viên
        deleteEmployee() {
            //Xóa nhân viên
            axios.delete(`https://localhost:7230/api/v1/Employees/${this.entityId}`)
                .then(() => {
                    this.reloadTable();
                })
                .catch(error => {
                    console.log(error);
                });
            //Xóa id nhân viên khỏi danh sách id được chọn
            this.entityIdArray.splice(this.entityId, 1);
            this.countCheckbox();
            this.deleteToast();
        },
        //#endregion

        //#region Phương thức xóa nhiều
        //Gọi dialog xác nhận xóa tất cả nhân viên được chọn
        onDeleteAll() {
            //Xét giá trị cho dialog
            this.dialogTitle = "Xác nhận xóa";
            this.dialogContent = "Bạn có chắc chắn muốn xóa toàn bộ nhân viên được chọn không";
            this.dialogMode = this.$_MISAEnum.DIALOG_MODE.DELETE_ALL;
            //Hiển thị dialog
            this.isShowDiaLog = !this.isShowDiaLog;
        },

        //Xóa tất cả
        deleteAll() {
            //Duyệt danh sách bản ghi được chọn
            for (let i = 0; i < this.entityIdArray.length; i++) {
                //Xóa từng bản ghi
                axios.delete(`https://localhost:7230/api/v1/Employees/${this.entityIdArray[i]}`)
                    .then(() => {
                        //Load lại bảng
                        this.reloadTable();
                    })
                    .catch(error => {
                        console.log(error);
                    });
                //Xóa id bản ghi khỏi danh sách bản ghi được chọn
                this.entityIdArray.splice(this.entityIdArray[i], 1);
                i--;
            }
            this.countCheckbox();
            this.deleteToast();
        },
        //#endregion

        //#region Các phương thức chọn
        //Bỏ chọn tất cả
        unCheck() {
            this.$refs.table.unCheckAll();
        },

        //Láy danh sách id được chọn
        getCheckedRow(idArray) {
            //Lấy số lượng bản ghi được chọn từ table
            this.entityIdArray = idArray;
            //Gọi hàm đếm và hiển thị số bản ghi được chọn
            this.countCheckbox();
        },

        //Đếm số checkbox(bản ghi) được chọn và hiển thị
        countCheckbox() {
            //Gán só lượng bản ghi được chọn
            this.checkboxCount = this.entityIdArray.length;
            //Hiển thị nếu số lượng bản ghi lớn hơn 0
            if (this.checkboxCount) {
                this.isCountShowing = true;
            }
            else {
                this.isCountShowing = false;
            }
        },

        //Đếm tổng số bản ghi
        countTotal() {
            this.total = this.employees.length;
        },
        //#endregion

        //Mở form
        openInputForm() {
            this.isShowForm = !this.isShowForm;
            this.employeeForUpdate = {};
        },

        //Xét id
        settingIndex(index) {
            this.entityId = index;
        },

        //#region Các loại toast
        //Xét giá trị cho toast xóa thành công
        deleteToast() {
            //Xét giá trị cho toast
            this.toastTitle = this.$_MISAResource["VN"].Toast.Success;
            this.toastContent = "Xóa nhân viên thành công";
            this.isShowToast = !this.isShowToast;
            //Tự ẩn toast sau 5s
            if (this.isShowToast == true) {
                setTimeout(() => {
                    this.isShowToast = false;
                }, 5000);
            }
        },

        //Xét giá trị cho toast thêm thành công
        postToast() {
            //Xét giá trị cho toast
            this.toastTitle = this.$_MISAResource["VN"].Toast.Success;
            this.toastContent = "Thêm nhân viên thành công";
            this.isShowToast = !this.isShowToast;
            //Tự ẩn toast sau 5s
            if (this.isShowToast == true) {
                setTimeout(() => {
                    this.isShowToast = false;
                }, 5000);
            }
        },

        //Xét giá trị cho toast sửa thành công
        putToast() {
            //Xét giá trị cho toast
            this.toastTitle = this.$_MISAResource["VN"].Toast.Success;
            this.toastContent = "Sửa nhân viên thành công";
            this.isShowToast = !this.isShowToast;
            //Tự ẩn toast sau 5s
            if (this.isShowToast == true) {
                setTimeout(() => {
                    this.isShowToast = false;
                }, 5000);
            }
        },
        //#endregion

        //Gọi form sửa
        onUpdate(_employee) {
            this.isShowForm = !this.isShowForm;
            this.employeeForUpdate = _employee;
        },

        //Kết quả form
        formResult(_formResult) {
            this.reloadTable();
            //Kiểm tra loại form
            if (_formResult == this.$_MISAEnum.FORM_MODE.ADD) {
                //Gọi toast thêm thành công
                this.postToast();
            }
            if (_formResult == this.$_MISAEnum.FORM_MODE.UPDATE) {
                //Gọi toast sửa thành công
                this.putToast();
            }
        },

        //Load lại table
        reloadTable() {
            this.isLoading = true;
            //Lấy danh sách nhân viên
            fetch("https://localhost:7230/api/v1/Employees")
                .then(res => res.json())
                .then(data => {
                    this.employees = data;
                    this.isLoading = false;
                })
            //this.loadPage();
        }
    }
}
</script>