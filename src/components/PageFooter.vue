<script setup>

import {address2} from "@/api";
import {computed} from "vue";
import {ar_footer, de_footer, en_footer} from "@/texte";

// eslint-disable-next-line no-undef
const props = defineProps({ lang: String})


const texte = computed(() => {
  if (props.lang === 'de') {
    return de_footer;
  } else if (props.lang === 'en') {
    return en_footer;
  } else if (props.lang === 'ar') {
    return ar_footer
  } else {
    return de_footer;
  }

})


// const links = ["home","nachhilfe","kontakt","about us"]

</script>

<template>
  <div class="bg-secondary container-fluid ">
    <div class="container-sm  pb-5 " style="{min-height: 1000px !important;}">
      <div class="mt-5 pt-5 row row-cols-1 row-cols-md-3 gx-3 gy-5 justify-content-center ">
        <div id="col1" class="col pt-5 d-flex flex-column text-white gap-4 align-items-center ">
          <h5 class="text-white text-center">{{texte.company.name}}</h5>
          <div class="d-flex align-items-center gap-3">
            <span class="material-symbols-outlined  ">add_location_alt</span>
            <span> {{ texte.company.address1 }}</span>
            <p class="m-0 p-0"> {{ texte.company.address2 }}</p>
          </div>
          <div class="d-flex align-items-center gap-3">
            <span class="material-symbols-outlined">phone</span>
            <span> {{ texte.company.phone }}</span>
          </div>
          <div class="d-flex align-items-center gap-3">
            <span class="material-symbols-outlined">email</span>
            <span>{{ texte.company.email }}</span>
          </div>


        </div>
        <div id="col2" class="col pt-5 d-flex flex-column text-white gap-4 align-items-center">
          <h5>{{texte.work_time.title}}</h5>
          <span>{{texte.work_time.days}}</span>
          <span>{{texte.work_time.hours}}</span>
          <span>{{texte.work_time.off1}}</span>
          <span>{{texte.work_time.off2}} </span>
        </div>
        <div id="col3" class="col pt-5 d-flex flex-column text-white gap-4 align-items-center">
          <h5>{{texte.nav_title}}</h5>
          <a v-for="link in texte.nav_link" :key="link.value" class="text-capitalize cursor-pointer"
                @click="address2?'':$emit('set-current',link.value)"
                :href="!address2?'#':address2+link.value+'/'+lang"
          >{{link.name}}</a>
        </div>
      </div>
    </div>
  </div>
  <div id="footer" style="height: 100px;" class="container-fluid bg-dark text-white" >
    <div class="container-fluid border-top border-3 h-100 border-white d-flex justify-content-between flex-wrap align-items-center gap-5  ">
        <div class="">
          <p class="mb-0 ">Copyright © 2021  </p>
          <p class="text-capitalize">Informatik Nachhilfe </p>
        </div>
        <div class="d-flex gap-3 me-3 gap-4 fs-3">
          <i class="bi-facebook text-white  cursor-pointer " ></i>
          <i class="bi-twitter text-white text-dark cursor-pointer text-md-white" ></i>
          <i class="bi-instagram text-white text-dark cursor-pointer text-md-white" ></i>
        </div>
<!--      <span class="material-symbols-outlined fs-1 d-none d-md-flex" >person</span>-->

    </div>
  </div>

</template>


<style scoped>

</style>