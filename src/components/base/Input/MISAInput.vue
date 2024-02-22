<template>
    <div :title="inputError? error: ''">
        <label class="label">{{ label }}<span v-if="required" class="label--required"> *</span></label>
        <input @click="clickOnInput" type="text" v-model="inputString" @input="onInput" class="input" :class="{'error': inputError}" @blur="validateData">
        <!-- <div class="validate-result"><span v-if="inputError">{{ error }}</span></div> -->
    </div>
</template>

<script>

export default{
    name: "MISAInput",
    props:{
        label: String,
        required: Boolean,
        inputValue: String,
        errors: Array,
        clickedInput: String,
    },
    created(){
        this.inputString = this.inputValue;
    },
    updated(){
    },
    watch: {
        inputValue: function(newValue){
            this.inputString = newValue;
        },
        clickedInput: function(){
            this.clicked = true;
        },
        errors: function(){
            this.showError();
        },
    },
    data(){
        return{
            inputString: "",
            inputError: false,
            error: "",
            clicked: false
        }
    },
    methods:{
        onInput(){
            this.$emit("update:inputValue", this.inputString);
        },
        clickOnInput(){
            this.clicked = true;
        },
        validateData(){
            this.$emit("validateData");
        },
        showError(){
            if(this.errors.length > 0 && this.clicked == true){
                this.inputError = true;
                this.error = this.errors[0];
            }
            else{
                this.inputError = false;
            }
        }
    }
}
</script>

<style scoped>
@import url(./input.css);
</style>