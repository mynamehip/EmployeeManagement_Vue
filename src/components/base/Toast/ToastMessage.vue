<template>
    <div class="toast-block">
        <div class="toast">
            <div class="toast__right">
                <div class="toast__icon">
                    <div :class="[`${icon}`]"></div>
                </div>
                <div class="toast__content">
                    <p :class="[`${type}`]">{{ title }}</p>
                    <p class="toast__content--message">{{content}}</p>
                </div>
            </div>
            <div class="toast__left">
                <!-- <div class="toast__action">
                    <a href="">Hoan tac</a>
                </div> -->
                <button class="toast__button--cancel" @click="onCloseToast">
                    <div class="icon--cancel-small"></div>
                </button>
            </div>
        </div>
    </div>
</template>

<script>

export default{

    props:{
        title: String,
        content: String
    },
    data(){
        return{
            type: undefined,
            icon: undefined
        }
    },
    created(){
        if(this.title == "Thành công!"){
            this.type = "toast--success";
            this.icon = "toast-icon--success";
        }
    },
    methods:{
        onCloseToast(){
            this.$emit("onCloseToast");
        }
    }
}
</script>