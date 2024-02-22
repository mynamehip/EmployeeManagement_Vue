<template>
  <div class="employee-list-layout">
    <TheSidebar></TheSidebar> 
    <TheHeader></TheHeader>
    <TheMain></TheMain>
    <!-- <TheDialog ></TheDialog> -->
  </div>
</template>

<script>
import TheHeader from "@/components/layout/TheHeader.vue"
import TheSidebar from "@/components/layout/TheSidebar.vue"
import TheMain from "@/components/layout/TheMain.vue"
// import TheDialog from "@/components/base/TheDialog.vue"


export default {
  name: 'App',
  components: {
    TheHeader,
    TheSidebar,
    TheMain,
    // TheDialog
  }
}
</script>

<style>
  @import url(./components/css/main.css);
</style>
