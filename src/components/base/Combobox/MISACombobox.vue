<template>
    <div class="combobox" :class="[`${inputType}`]" @blur="clickOutside">
        <input type="text" class="input combobox__input" :class="[`${inputType}`]" v-model="inputText" @input="onSearchItem" @keydown="onKeyDown">
        <MISAButton :class="[`${buttonSize}`]" :type="buttonType" icon="icon--dropdown" @click="onpenData"></MISAButton>
        <div :class="up ? 'combobox__data--up' : 'combobox__data--down'" v-show="isShowData">
            <a class="combobox-item" 
                :class="{'combobox-item--selected': item[itemDisplay] == selectedItem, 'combobox-item--hover': index == indexHover}"
                v-for="(item,index) in dataFilter" :key="index"
                @click="onSelectItem(item)"
            >{{ item[itemDisplay] }}</a>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import MISAButton from '../Button/MISAButton.vue';

export default{
    name: "MISACombobox",
    components: {
         MISAButton ,
    },
    props:{
        api:{
            type: String,
        },
        itemDisplay: String,
        itemGet: String,
        modelValue: String,
        type: String,
        inData: Array,
        up: Boolean
    },
    created(){
        if(this.inData){
            this.data = this.inData;
            this.dataFilter = this.inData;
        }
        else{
            this.loadData();
        }
        if(this.type == "medium"){
            this.inputType = "style--medium";
            this.buttonType = "btn-icon--medium";
            this.buttonSize = "combobox__btn--medium";
        }
        else if(this.type == "small"){
            this.inputType = "style--small";
            this.buttonType = "btn-icon--small";
            this.buttonSize = "combobox__btn--small";
        }
    },
    data(){
        return {
            isShowData: false,
            data: [],
            dataFilter: [],
            selectedItem: "",
            inputText: "",
            indexHover: 0,

            inputType: "",
            buttonType: "",
            buttonSize: "",
        }
    },
    mounted(){
        //this.getSelectedItem();
    },
    watch:{
        inData: function(newValue){
            console.log(newValue);
            this.getSelectedItem();
        }
    },
    methods: {
        loadData(){
            axios.get(this.api)
                .then((res) => {
                    this.data = res.data;
                    this.dataFilter = res.data;
                    this.getSelectedItem();
                    console.log(this.dataFilter);
                    console.log(this.data);
                })
                .catch((e) =>{{
                    console.log(e);
                }})

        },
        onpenData(){
            this.isShowData = !this.isShowData;
        },
        onSelectItem(item){
            this.selectedItem = item[this.itemDisplay];
            this.inputText = item[this.itemDisplay];
            this.onpenData();
            this.$emit("update:modelValue", item[this.itemGet]);
        },
        getSelectedItem(){
            for(let i = 0; i < this.data.length; i++){
                if(this.data[i][this.itemGet] == this.modelValue){
                    this.selectedItem = this.data[i][this.itemDisplay];
                    this.inputText = this.selectedItem;
                }
            }
        },
        onSearchItem(){
            if(this.data && this.data.length > 0){
                let dataFilter = this.data.filter((i) => {
                    if(i[this.itemDisplay]){
                        return i[this.itemDisplay].includes(this.inputText);
                    }
                });
                if(dataFilter != null){
                    this.dataFilter = dataFilter;
                }
                this.isShowData = true;
            }
        },
        onKeyDown(){
            const keyCode = event.keyCode;
            if(keyCode == this.$_MISAEnum.KEYCODE.DOWN){
                if(this.indexHover < this.data.length - 1){
                    this.indexHover++;
                }
            }
            else if(keyCode == this.$_MISAEnum.KEYCODE.UP){
                if(this.indexHover > 0){
                    this.indexHover--;
                }
            }
            else if(keyCode == this.$_MISAEnum.KEYCODE.ENTER){
                this.selectedItem = this.dataFilter[this.indexHover];
                this.onpenData();
                this.inputText = this.selectedItem[this.itemDisplay];
                this.$emit("update:modelValue", this.selectedItem[this.itemGet]);
            }
        },
        clickOutside(){
            this.onpenData();
        }
    }
}
</script>

<style scoped>
@import url(./combobox.css);
</style>