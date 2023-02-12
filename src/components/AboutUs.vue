<script setup>

import {computed, onMounted, ref} from "vue";
import {ar_about, de_about, en_about} from "@/texte";

const items = ref([])
const panel = ref([])
const experten = ref(0)
const customer = ref(0)
const projects = ref(0)

const speed = 50
// eslint-disable-next-line no-undef
const props = defineProps({lang: String})


// eslint-disable-next-line no-unused-vars
const texte = computed(() => {
  if (props.lang === 'de') {
    return de_about;
  } else if (props.lang === 'en') {
    return en_about;
  } else if (props.lang === 'ar') {
    return ar_about
  } else {
    return de_about;
  }

})


onMounted(() => {

  if (items.value) {
    const ioConfiguration = {
      rootMargin: '-50% 0% -50% 0%',
      threshold: 0
    };

    const observer1 = new IntersectionObserver(entries => {
      // We will fill in the callback later...
      entries.forEach(entry => {
        // If the element is visible
        if (entry.isIntersecting) {
          // Add the animation class
          entry.target.style.right = 0;
          setTimeout(() => incNbrRec(customer, 50), 2000)
          setTimeout(() => incNbrRec(projects, 100), 2000)
          setTimeout(() => incNbrRec(experten, 2), 2000)

          // entry.target.style.right = 0;
          // entry.target.style.opacity = '100%';
          //
        }
      });
    }, ioConfiguration);

    const observer2 = new IntersectionObserver(entries => {
      // We will fill in the callback later...
      entries.forEach(entry => {
        // If the element is visible
        if (entry.isIntersecting) {
          entry.target.style.right = 0;
          entry.target.style.transform = 'translateX(0)';
          entry.target.style.opacity = '100%';
        }
      });
    });


    items.value.forEach(card => {
      observer2.observe(card);
    })
    observer1.observe(panel.value)
  }
})
// const list = [
//   "Günstig", "Professionell", "keine versteckten Kosten", "Zufriedenheit Garantie", "24/7 Service"
// ]


function incNbrRec(i, endNbr) {
  if (i.value < endNbr) {

    setTimeout(function () {//Delay a bit before calling the function again.
      i.value++
      incNbrRec(i, endNbr);
    }, speed);
  }
}


function getImgUrl(src) {
  // return require(src)
  var images = require.context('../assets/', false, /\.jpg$/)
  return images('./' + src)
}


</script>
<template>
  <div class="container-sm px-5  text-center text-dark  mt-5 mb-5" style="padding-top: 8.5rem !important;">
    <h1 class="mt-5 display-4 fw-normal " style="margin-top: 30rem">{{ texte.title }}</h1>
    <div class="row mt-5  row-cols-1 row-cols-lg-2" style="padding-top: 5rem !important;">
      <div id="left" class="col text-start">
        <p v-for="item in texte.paragraph" :key="item.text1"
           class=""> {{ item.text1 }}
          <a href="" @click="$emit('set-current',item.value)"> {{ item.link }}</a>
          {{ item.text2 }}
        </p>
        <!--        <p>-->
        <!--          Mit hauptsitz in Kamen wird Unoxi durch den Geschäftsführer Gökhan Gülten geleitet-->
        <!--          und konnte bereits einige Referenzen sammeln.-->
        <!--        </p>-->
        <!--        <p>Unser Team arbeitet zusammen im Team und konnte durch-->
        <!--          viel Zusammenarbeit viel Erfahrung sammeln.-->
        <!--        </p>-->
        <!--        <p>Einige unserer Referenzen können Sie sich hier anschauen und-->
        <!--          sich selber ein Bild von unserer Arbeit verschaffen.-->
        <!--        </p>-->
        <!--        <p>Bei Fragen <a href="" class="text-decoration-none">kontaktieren</a> Sie uns gerne.</p>-->
      </div>
      <div id="right" class="col text-start d-flex flex-column gap-3">
        <div v-for="(item,index) in texte.vorteile"
             style=" transition:1.3s; transform:translateX(200px) !important; opacity:0"
             :style="{transitionDelay:(index*400)+'ms'}"
             :key="index" ref="items"
             class="d-flex gap-3 align-items-center position-relative">
          <span class="material-symbols-outlined text-primary fs-4  ">check_circle</span>
          <span class="fs-5 fw-normal m-0 p-0">{{ item }}</span>
        </div>
      </div>
    </div>
  </div>
  <div class="bg-primary-dark position-relative mt-5 p-4 p-md-8 ms-5 text-light   rounded-start-pill"
       style="transition: 3s ; right:-60%"
       ref="panel" id="panel"
  >
    <img :src="getImgUrl('programming.jpg')" alt="programming"
         class="position-absolute top-0 start-0 w-100 h-100 rounded-start-pill opacity-25">
    <div class="container-fluid">
      <div class="row row-cols-1 row-cols-md-3 gy-5 ps-5 ">
        <div class="col text-center">
          <p class="display-1 fw-normal pb-0 mb-0">{{ experten }}</p>
          <p class="h6 ">{{texte.text1}}</p>
        </div>
        <div class="col text-center">
          <p class="display-1 pb-0 fw-normal mb-0">{{ projects }}+</p>
          <p class="h6 ">{{texte.text2}}</p>
        </div>
        <div class="col text-center">
          <p class="display-1 pb-0 mb-0 fw-normal">{{ customer }}+</p>
          <p class="h6 ">{{texte.text3}}</p>
        </div>

      </div>
    </div>
  </div>
</template>


<style scoped>
.material-symbols-outlined {
  font-variation-settings: 'FILL' 1,
  'wght' 400,
  'GRAD' 0,
  'opsz' 48
}

</style>