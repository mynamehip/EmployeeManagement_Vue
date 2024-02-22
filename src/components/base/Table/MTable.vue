<template>
    <table class="table">
        <thead>
            <tr>
                <th>
                    <label class="checkbox-item table__checkbox">
                        <input type="checkbox" class="m-checkbox__input" ref="checkboxTitle" @click="checkAll"/>
                        <div class="m-checkbox__check-mark"></div>
                    </label>
                </th>
                <th v-for="(titles, index) in tableTitle" :key="index" :style="{width: titles.width + 'px'}"
                :class="['collumn--align-' + this.alighCol[index]]">{{ titles.title }}</th>
                <th>CHỨC NĂNG</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(data, index) in tableData" :key="index" ref="dataTable">
                <td>
                    <label class="checkbox-item table__checkbox">
                        <input type="checkbox" 
                            class="m-checkbox__input" 
                            ref="checkboxes"
                            @change="toggleCheckbox(data[rowId])"
                        />
                        <div class="m-checkbox__check-mark"></div>
                    </label>
                </td>
                <td v-for="(titles, index) in tableTitle" :key="index" :class="[`${collumnAlight}`]" @dblclick="onUpdate(data)">
                    <div v-if="titles.data == dateType" :style="{width: titles.width + 'px'}">{{ formatDate(data[titles.data]) }}</div>
                    <div v-else-if="titles.data == genderType" :style="{width: titles.width + 'px'}">{{ genderString(data[titles.data]) }}</div>
                    <div v-else :style="{width: titles.width + 'px'}">{{ data[titles.data] }}</div>
                </td>
                <td class="">
                    <div class="option-collumn">
                        <div @click="onUpdate(data)" style="cursor: pointer;">Sửa</div>
                        <button class="btn-icon--medium btn--hover-border-blue">
                            <div class="icon--dropdown-blue"></div>
                            <div class="select">
                                <ul>
                                    <li class="collumn--align-left">Nhân bản</li>
                                    <li class="collumn--align-left" @click="onDeleteRow(data[rowId])">Xóa</li>
                                    <li class="collumn--align-left">Ngừng sử dụng</li>
                                </ul>
                            </div>
                        </button>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
import moment from 'moment';

export default {
    components:{
    },
    props: {
        tableTitle: Array,
        tableData: Array,
        rowId: String,
        idArray: Array,
    },
    data() {
        return {
            dateType: "DateOfBirth",
            genderType: "Gender",
            entityIdArray: [],
            collumnAlight: null,
            alighCol:[],
        }
    },
    mounted(){
    },
    created(){
        for(let i = 0; i < this.tableTitle.length; i++){
            this.alighCol.push(this.tableTitle[i].alight);
        }
        this.entityIdArray = this.idArray;
    },
    updated(){
        this.countCheckbox();
    }, 
    methods: {
        formatDate(date) {
            if (date == null) {
                return "";
            }
            return moment(date).format('DD/MM/YYYY');
        },
        genderString(_gender) {
            if (_gender == this.$_MISAEnum.GENDER.MALE) {
                return 'Nam';
            }
            else if (_gender == this.$_MISAEnum.GENDER.FEMALE) {
                return 'Nữ';
            }
            else if (_gender == this.$_MISAEnum.GENDER.ELSE) {
                return 'Khác';
            }
            else {
                return '';
            }
        },
        checkAll(){
            for(let i = 0; i < this.$refs.dataTable.length; i++){
                if(!this.$refs.checkboxes[i].checked){
                    this.$refs.checkboxes[i].checked = true;
                }
            }
            this.entityIdArray = this.tableData.map(data => data[this.rowId]);
            this.countCheckbox();
            if (!this.$refs.checkboxTitle.checked) {
                this.unCheckAll();
            }
        },
        unCheckAll() {
            for (let i = 0; i < this.$refs.checkboxes.length; i++) {
                if (this.$refs.checkboxes[i].checked) {
                    this.$refs.checkboxes[i].checked = false;
                }
            }
            this.entityIdArray = [];
            this.countCheckbox();
            this.$refs.checkboxTitle.checked = false;
        },
        toggleCheckbox(rowId) {
            const index = this.entityIdArray.indexOf(rowId);
            if (index !== -1) {
                this.entityIdArray.splice(index, 1); // Xóa phần tử nếu đã tồn tại
            } else {
                this.entityIdArray.push(rowId); // Thêm phần tử nếu chưa tồn tại
            }
            this.countCheckbox();
        },
        countCheckbox(){
            this.$emit("getCheckedRow", this.entityIdArray);
        },
        onDeleteRow(rowId){
            this.$emit("onDeleteRow", rowId);
        },
        onUpdate(rowdata){
            this.$emit("onUpdate", rowdata);
        }
    }
}
</script>