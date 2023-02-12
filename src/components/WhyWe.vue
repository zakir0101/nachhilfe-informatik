<script setup>
import {address2} from "@/api";
import {computed, onMounted, ref} from "vue";
import {ar_whywe, de_whywe, en_whywe} from "@/texte";

const cardRef = ref([])

// eslint-disable-next-line no-undef
const props = defineProps({ lang: String})


const texte = computed(() => {
  if (props.lang === 'de') {
    return de_whywe;
  } else if (props.lang === 'en') {
    return en_whywe;
  } else if (props.lang === 'ar') {
    return ar_whywe
  } else {
    return de_whywe;
  }

})


//
// const list = [
//   {title: "Schneller Support", text: "wir sind 24 Stunden, 7 Tage die Woche für Sie da, um ihre wünsche zu erfüllen"},
//   {title: "Günstige Preise", text: "wir sind 24 Stunden, 7 Tage die Woche für Sie da, um ihre wünsche zu erfüllen"},
//   {title: "Erfahrung", text: "wir sind 24 Stunden, 7 Tage die Woche für Sie da, um ihre wünsche zu erfüllen"},
//   {
//     title: "Kunden- zufriedenheit",
//     text: "wir sind 24 Stunden, 7 Tage die Woche für Sie da, um ihre wünsche zu erfüllen"
//   },
// ]

onMounted(() => {
  if (cardRef.value) {
    const observer = new IntersectionObserver(entries => {
      // We will fill in the callback later...
      entries.forEach(entry => {
        // If the element is visible
        if (entry.isIntersecting) {
          // Add the animation class
          entry.target.classList.add('my-card-animation');
        }
      });

    })

    cardRef.value.forEach(card => {
      observer.observe(card);
    })


  }
})

</script>

<template>
  <div class="container-xl pt-5">
    <div class="row row-cols-1 row-cols-lg-2 pt-5  ">
      <div id="left" class="col text-start mb-5">
        <div class="container-fluid">
          <div class="row row-cols-1 row-cols-sm-2 gy-4 ">
            <div v-for="(item,index) in texte.cardItems" :key="index" ref="cardRef"
                 :style="{transitionDelay:(index*400)+'ms' }"
                 class="col cursor-pointer my-card" :class="{'pt-md-5':(index%2)===1}">
              <div
                  class="bg-light p-4 pt-5 border-bottom text-center border-3 shadow  border-primary text-black bg-hover-primary text-hover-white"
                  :class="{'mt-md-5':(index%2)===1}"
              >
                <h5 class=" mt-4">{{ item.title }}</h5>
                <p class="text-black-50 text-hover-white pt-4 ">{{ item.text }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="right" class="col pt-5 mt-5 mb-5">
        <div class="container-sm">
          <p class="text-primary fs-6 fw-bold ">{{ texte.whywe }}</p>
          <p class="display-4 text-dark fw-bold">{{texte.head}}</p>
          <div class="border-start border-2 shadow-sm  text-black-50 fw-bold fs-6 px-4 py-2 mt-4">
            <p>{{texte.text}}</p>
          </div>
          <a class="btn btn-lg btn-primary p-3 mb-5 px-4 mt-5 ms-4"
             @click="address2?'':$emit('set-current','nachhilfe')"
             :href="!address2?'#':address2+'nachhilfe/'+lang"
          >{{texte.button}}</a>


        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>
.my-card {
  transition: 1.5s;
  position: relative;
  bottom: -300px;
  opacity: 0;

}

.my-card-animation {
  bottom: 0;
  opacity: 100%;

}

</style>