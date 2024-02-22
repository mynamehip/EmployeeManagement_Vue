<template>
    <button :class="[`${type}`]">
        <div :class="[`${iconPane}`]">
            <div :class="[`${icon}`]"></div>
        </div>
        <div style="flex-shrink: 0;">{{ title }}</div>
        <slot></slot>
    </button>
</template>

<script>

export default{
    props:{
        type: String,
        title: String,
        icon: String,
    },
    data(){
        return{
            iconPane: null,
        }
    },
    created(){
        try{
            var types = this.type.split(" ");
            for(let i = 0; i < types.length; i++){
                if(types[i] == "btn-with-icon"){
                    this.iconPane = "icon-pane";
                }  
            }
        }
        catch(e){
            console.log(e);
        }
    },
}
</script>