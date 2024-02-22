<template>
    <div class="m-dialog">
        <div class="m-dialog-container">
            <button class="m-dialog__button--close"></button>
            <div class="m-dialog__header">{{ title }}</div>
            <div class="m-dialog__body">
                <div class="icon-red-aleart"></div>
                <div class="m-dialog__content">
                    {{ content }}
                    <li style="list-style-type: none;" v-for="(error,index) in errors" :key="index">{{ error }}</li>
                </div>
            </div>
            <div class="m-dialog__footer">
                <button class="btn m-dialog__button--cancel" @click="canceled">Hủy bỏ</button>
                <button class="btn m-dialog__button--confirm" @click="confirmed">Xác nhận</button>
            </div>
        </div>
    </div>
</template>

<script>


export default{

    // props:["title", "content", "showDialog", "errors", "dialogMode"],
    props:{
        title: {
            type: String,
            required: true
        },
        content: String,
        errors:{
            type: String
        },
        dialogMode: Number,
        showDialog: Function,
    },
    data(){
        return{
        }
    },
    methods:{
        canceled(){
            this.showDialog();
            this.$emit("dialogConfirm", 0);
        },
        confirmed(){
            this.showDialog();
            this.$emit("dialogConfirm", 1);
        }
    }
}
</script>