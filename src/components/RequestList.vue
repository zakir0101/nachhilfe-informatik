<script setup>
// eslint-disable-next-line no-undef
const props = defineProps({
  list: Array
})

</script>

<template>
  <div class="row row-cols-1 pt-5  mt-3 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 gy-3 gx-md-3 gx-lg-5   justify-content-md-center">
    <div v-for="(item,index) in props.list" :key="item.text" :id="'card-big'+item.text"
         class="col  text-center    ">
      <div id="card-image" @click="$emit('item-click',item.dist,index)"
           style="transition:500ms;transform-box: fill-box;transform-origin: 50% 50%;"
      class="bg-white rounded-3 position-relative shadow py-lg-1 card-hover-transform d-flex align-items-center
      justify-content-md-center">
      <i :class="[item.icon]"
         class="text-primary  display-md-1 fs-1 cursor-pointer p-1 ps-3 p-md-0 "></i>
      <span class="d-block d-md-none ms-4 fs-6 fw-normal text-primary">{{ item.text }}</span>
    </div>
    <span class="fs-6 d-none d-md-block pt-3 text-primary">{{ item.text }}</span>
  </div>

  </div>

</template>


<style scoped>

.card-hover-transform {
  box-sizing: border-box !important;
  border: 3px solid var(--bs-white)
}

.card-hover-transform:hover {
  scale: 1.1;
  box-sizing: border-box !important;
  border: 3px solid var(--bs-primary)
}
</style>