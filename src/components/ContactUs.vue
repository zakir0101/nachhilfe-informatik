<script setup>
import {computed, onMounted, ref} from "vue";
import {ar_contact, de_contact, en_contact} from "@/texte";

const conRef = ref(null);

// eslint-disable-next-line no-undef
const props = defineProps({ lang: String})


const texte = computed(() => {
  if (props.lang === 'de') {
    return de_contact;
  } else if (props.lang === 'en') {
    return en_contact;
  } else if (props.lang === 'ar') {
    return ar_contact
  } else {
    return de_contact;
  }

})


onMounted(()=> {

  if (conRef.value) {
    // const ioConfiguration = {
    //   rootMargin: '-50% 0% -50% 0%',
    //   threshold: 0
    // };
    const observer1 = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.transform = 'translateY(0)';
          entry.target.style.opacity = '100%' ;
        }
      });
    });


    observer1.observe(conRef.value);


  }
})

const list = [
  {img:"bi-geo-alt-fill" ,name: "Standort" , value1 :"59174 Kamen,",value2:"Sieglerstraße 1"},
  {img:"bi-phone" ,name: "Telephone" , value1 :"+49 159 01172336",value2:"+49 159 01172336"},
  {img:"bi-envelope" ,name: "Email" , value1 :"zakie.elkheir@gmail.com",value2:""}
]
</script>


<template>
  <div class="container-sm text-center position-relative  pb-5 mb-5 "
       ref="conRef"
       style="padding-top: 13rem!important;transition: 2.5s; transform: translateY(40%)!important;opacity: 0;">
    <div id="border" style="height: 0.2rem;width: 8rem" class="mx-auto bg-primary mb-5"></div>
    <h2 class="mb-5">{{texte.title}}</h2>
    <div class="row mt-5 row-cols-1 row-cols-lg-3 justify-content-around gy-5">
      <div class="col " v-for="(item,index) in texte.item_list" :key="index">
        <i class="text-primary display-4" :class="[list[index].img]"></i>
        <p class="fw-normal fs-4 mt-4">{{item.name}}</p>
        <p class="fw-normal fs-6 mb-0 mt-3">{{item.text1}}</p>
        <p class="fw-normal fs-6 ">{{item.text2}}</p>
      </div>
    </div>
  </div>

</template>


<style scoped>

</style>