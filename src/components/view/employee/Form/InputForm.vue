<template>
    <div class="m-popup">
        <div class="m-popup__container">
            <div class="m-popup__header">
                <div class="popup__header-title"> {{ formTitle }} nhân viên</div>
                <div class="popup__header-classify">
                    <label class="checkbox-item">
                        <input type="checkbox" class="m-checkbox__input" name="customer-classify" id="customer" />
                        <div class="m-checkbox__check-mark"></div>
                        <label for="customer">Là khách hàng</label>
                    </label>
                    <label class="checkbox-item">
                        <input type="checkbox" class="m-checkbox__input" name="customer-classify" id="provider" />
                        <div class="m-checkbox__check-mark"></div>
                        <label for="provider">Là nhà cung cấp</label>
                    </label>
                </div>
                <div class="popup__header-button">
                    <button class="btn-icon--medium">
                        <div class="icon--question"></div>
                    </button>
                    <button class="btn-icon--medium">
                        <div class="icon--cancel" @click="isShowing"></div>
                    </button>
                </div>
            </div>
            <div class="m-popup__body">
                <div class="m-popup__body-top">
                    <div class="m-popup__top-left">
                        <div class="m-popup__top--r1">
                            <div class="input-id input--46">
                                <MISAInput label="Mã nhân viên" required
                                    v-model:inputValue="employee.EmployeeCode"
                                    :errors="employeeCodeError"
                                    :clickedInput="clickedInput"
                                    @validateData="validateData"
                                ></MISAInput>
                            </div>
                            <div class="input-name input--64">
                                <MISAInput label="Tên nhân viên" required
                                    v-model:inputValue="employee.FullName"
                                    :errors="fullNameError"
                                    :clickedInput="clickedInput"
                                    @validateData="validateData"
                                ></MISAInput>
                            </div>
                        </div>
                        <div class="m-popup__top--r2">
                            <div class="input-unit">
                                <div class="input-unit__label">
                                    Đơn vị
                                    <span class="input__label--required"> *</span>
                                </div>
                                <div>
                                    <MISACombobox class="form__combobox" api="https://localhost:7230/api/v1/Department"
                                        itemDisplay="DepartmentName" itemGet="DepartmentId" v-model="employee.DepartmentId"
                                        type="medium">
                                    </MISACombobox>
                                </div>
                            </div>
                        </div>
                        <div class="m-popup__top--r3">
                            <div class="input-jobtitle">
                                <div class="input-jobtitle__label">
                                    Chức danh
                                </div>
                                <MISACombobox class="form__combobox" api="https://localhost:7230/api/Position"
                                    itemDisplay="PositionName" itemGet="PositionId" v-model="employee.PositionId"
                                    type="medium">
                                </MISACombobox>
                            </div>
                        </div>
                    </div>
                    <div class="m-popup__top-right">
                        <div class="m-popup__top--r1">
                            <div class="input-birth input--46">
                                <div class="input-birth__label">
                                    Ngày sinh
                                </div>
                                <input type="date" class="input" :value="birthDay" ref="dateInput" @input="updateBirthDay">
                            </div>
                            <div class="input-gender">
                                <div class="input-gender__label">
                                    Giới tính
                                </div>
                                <div class="input-gender__box">
                                    <label class="m-radio">
                                        <input type="radio" v-model="employee.Gender" value="0" class="m-radio__input"
                                            name="gender" id="male" />
                                        <div class="m-radio__check-mark"></div>
                                        <label for="male">Nam</label>
                                    </label>
                                    <label class="m-radio">
                                        <input type="radio" v-model="employee.Gender" value="1" class="m-radio__input"
                                            name="gender" id="female" />
                                        <div class="m-radio__check-mark"></div>
                                        <label for="female">Nữ</label>
                                    </label>
                                    <label class="m-radio">
                                        <input type="radio" v-model="employee.Gender" value="2" class="m-radio__input"
                                            name="gender" id="other" />
                                        <div class="m-radio__check-mark"></div>
                                        <label for="other">Khác</label>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div class="m-popup__top--r2">
                            <div class="input-cmnd input--64">
                                <!-- <div class="input-cmnd__label">
                                    Số CMND
                                </div>
                                <input type="text" v-model="employee.IdentityNumber" class="input" placeholder=""> -->
                                <MISAInput label="Số CMND"
                                    v-model:inputValue="employee.IdentityNumber"
                                ></MISAInput>
                            </div>
                            <div class="input-supply-date input--46">
                                <div class="input-date__label">
                                    Ngày cấp
                                </div>
                                <input type="date" class="input" :value="issueDay" ref="dateInput" @input="updateIssueDay">
                            </div>
                        </div>
                        <div class="m-popup__top--r3">
                            <div class="input-cmnd-released">
                                <MISAInput label="Nơi cấp"
                                    v-model:inputValue="employee.IssuePlace"
                                ></MISAInput>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="m-popup__body-mid">
                    <div class="input-address">
                        <MISAInput label="Địa chỉ"
                            v-model:inputValue="employee.Address"
                        ></MISAInput>
                    </div>
                </div>
                <div class="m-popup__body-bot">
                    <div class="m-popup__bot--r1">
                        <div class="input-mobile">
                            <MISAInput label="Đt di động"
                                v-model:inputValue="employee.PhoneNumber"
                            ></MISAInput>
                        </div>
                        <div class="input-phone">
                            <MISAInput label="ĐT cố định"
                                v-model:inputValue="employee.PhoneNumber"
                            ></MISAInput>
                        </div>
                        <div class="input-email">
                            <MISAInput label="Email"
                                v-model:inputValue="employee.Email"
                                :errors="emailError"
                                @validateData="validateData"
                            ></MISAInput>
                        </div>
                    </div>
                    <div class="m-popup__bot--r2">
                        <div class="input-bank-account">
                            <MISAInput label="Tài khoản ngân hàng"
                                v-model:inputValue="employee.BankNumber"
                            ></MISAInput>
                        </div>
                        <div class="input-bank">
                            <MISAInput label="Tên ngân hàng"
                                v-model:inputValue="employee.BankName"
                            ></MISAInput>
                        </div>
                        <div class="input-bank-unit">
                            <MISAInput label="Chi nhánh"
                                v-model:inputValue="employee.BankBranches"
                            ></MISAInput>
                        </div>
                    </div>
                </div>
            </div>
            <div class="m-popup__footer">
                <div class="popup__footer-left">
                    <button class="btn btn--no-color btn--hover-red" @click="isShowing">
                        Hủy
                    </button>
                </div>
                <div class="popup__footer-right">
                    <MISAButton :type="'btn btn--no-color'" @click="saveData">Cất</MISAButton>
                    <MISAButton :type="'btn'" @click="check1ti">Cất và thêm</MISAButton>
                </div>
            </div>
        </div>
    </div>
    <TheDialog v-if="isShowDialog" style="z-index: 100;" :showDialog="showDialog" :title="dialogTitle"
        :content="dialogContent" :errors="inValidErrors"></TheDialog>
    <ToastMessage v-if="isShowToast"></ToastMessage>
</template>

<script>
import TheDialog from '@/components/base/Dialog/TheDialog.vue';
import ToastMessage from '@/components/base/Toast/ToastMessage.vue';
import moment from 'moment';

export default {
    components: {
        TheDialog,
        ToastMessage,
    },
    props: ["isShowing", "employeeEdit"],
    data() {
        return {
            employee: {},
            formTitle: "",
            isShowDialog: false,
            dialogTitle: undefined,
            dialogContent: undefined,
            isShowToast: false,
            inValidErrors: [],
            departmentOptions: [],
            birthDay: "",
            issueDay: "",

            employeeCodeError: [],
            fullNameError: [],
            emailError: [],
            clickedInput: false,
        }
    },
    computed: {
        birthDayFormatted() {
            return moment(this.employee.DateOfBirth).format('YYYY-MM-DD');
        },
        issueDayFormatted() {
            return moment(this.employee.IssueDate).format('YYYY-MM-DD');
        }

    },
    created() {
        /**
         * Lấy dữ liệu nhân viên
         */
        this.employee = this.employeeEdit;
        if (this.formMode() == this.$_MISAEnum.FORM_MODE.ADD) {
            //Lấy mã nhân viên mới
            this.$_axios.get("https://localhost:7230/api/v1/Employees/GetNewEmployeeCode")
                .then((res) => {
                    this.employee.EmployeeCode = res.data;
                })
                .catch((res) =>{
                    this.progressError(res);
                })
        }
    },
    mounted() {
        if (this.formMode() == this.$_MISAEnum.FORM_MODE.UPDATE) {
            this.birthDay = this.birthDayFormatted;
            this.issueDay = this.issueDayFormatted;
        }
        else {
            this.birthDay = "";
            this.issueDay = "";
        }
    },
    methods: {
        check1ti(){
            console.log(this.employee);
        },
        showDialog() {
            this.isShowDialog = !this.isShowDialog;
        },
        hideForm() {
            this.isShowing();
            this.$emit("formResult", this.formMode());
        },
        saveData() {
            try {
                //console.log(this.employee);
                //validate dữ liệu
                this.clickedInput = true;
                this.inValidErrors = [];
                this.validateData();
                if(this.employeeCodeError.length != 0 || this.fullNameError.length != 0){
                    return;
                }
                if (this.inValidErrors.length == 0) {
                    //Lưu thông tin nhân viên
                    if (this.formMode() == this.$_MISAEnum.FORM_MODE.ADD) {
                        console.log(this.employee);
                        this.$_axios.post("https://localhost:7230/api/v1/Employees", this.employee)
                            .then((res) => {
                                this.employees = res.data;
                                this.hideForm();
                            })
                            .catch((res) => {
                                this.progressError(res);
                            });

                    }
                    //Sửa thông tin nhân viên
                    if (this.formMode() == this.$_MISAEnum.FORM_MODE.UPDATE) {
                        this.$_axios.put(`https://localhost:7230/api/v1/Employees/${this.employee.EmployeeId}`, this.employee)
                            .then((res) => {
                                this.employees = res.data;
                                this.hideForm();
                            })
                            .catch((res) => {
                                this.progressError(res);
                            });

                    }
                }
                else {
                    this.dialogTitle = "Lỗi";
                    this.dialogContent = null;
                    this.showDialog();
                }
            } catch (error) {
                console.log(error);
            }
        },
        validateData() {
            this.employeeCodeError = [];
            this.fullNameError = [];
            this.emailError = [];
            //Thông tin bắt buộc
            if (this.employee.EmployeeCode == "" || this.employee.EmployeeCode == null) {
                this.employeeCodeError = this.addError(this.employeeCodeError, this.$_MISAResource["VN"].EmployeeCodeError.Empty);
            }
            if (this.employee.FullName == "" || this.employee.FullName == null) {
                this.fullNameError = this.addError(this.fullNameError, this.$_MISAResource["VN"].EmployeeNameError.Empty);
            }
            //Thông tin đúng định dạng
            const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
            if(regex.test(this.employee.Email) == false){
                this.emailError = this.addError(this.emailError, this.$_MISAResource["VN"].FormatError.EmailFormat);
            }
            //Ngày tháng
            
        },
        addError(errorArray, error){
            const index = errorArray.indexOf(error);
            if(index < 0){
                errorArray.push(error);
            }
            return errorArray;
        },     
        formMode() {
            //Nếu có dữ liệu
            if (this.employee?.EmployeeId) {
                this.formTitle = "Sửa";
                return this.$_MISAEnum.FORM_MODE.UPDATE;
            }
            else {
                this.formTitle = "Thêm mới";
                return this.$_MISAEnum.FORM_MODE.ADD;
            }
        },

        //Bắt lỗi từ backend
        progressError(res) {
            const status = res.response.status;
            console.log(status);
            const data = res.response.data.title;
            console.log(data);
            switch (status) {
                case 500:
                    this.inValidErrors.push(data);
                    this.dialogTitle = "Lỗi";
                    this.isShowDialog = true;
                    break;
                case 400:
                    this.inValidErrors.push(data);
                    this.dialogTitle = "Lỗi";
                    this.isShowDialog = true;
                    break;
                default:
                    break;
            }
        },
        /**
         * Lấy giá trị ngày sinh
         * Authour: TD Hiep (16/07/2023)
         */
        updateBirthDay() {
            this.employee.DateOfBirth = this.$refs.dateInput.value;
        },
        updateIssueDay() {
            this.employee.IssueDate = this.$refs.dateInput.value;
        }
    }
}
</script>