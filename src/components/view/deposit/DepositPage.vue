<template>
  <MISAInput label="Ahihi" :inputError="y" :error="z" v-model:inputValue="x" @check="checkData"></MISAInput>
</template>

<script>
export default{
  data(){
    return{
      x: 0,
      y: false,
      z: null,
    }
  },
  methods:{
    checkData(){
      if(this.x > 100){
        this.y = true;
        this.z = "Không được nhỏ hơn 0";
      }
      else{
        this.y = true;
      }
    }
  }
}
</script>