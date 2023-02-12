<script setup>

import {computed, onMounted, ref} from "vue";
import {ar_prog, de_prog, en_prog} from "@/texte";
import {address2} from "@/api";
// eslint-disable-next-line no-undef
const props = defineProps({
  full:Boolean,
  lang:String
})
const lapHeight = ref(0);
const cardRef = ref([])
const imgRef = ref([])


const texte = computed(() => {
  if (props.lang === 'de') {
    return de_prog;
  } else if (props.lang === 'en') {
    return en_prog;
  } else if (props.lang === 'ar') {
    return ar_prog
  } else {
    return de_prog;
  }

})




function getImgUrl(src) {
  // return require(src)
  var images = require.context('../assets/', false, /\.png$/)
  return images('./' + src)
}


const list1 = computed(()=> ([
  {src: "java-logo.png", type: texte.value.basics+", "+texte.value.advanced+", Springboot, JavaFx", name: "Java"},
  {src: "python-logo.png", type: texte.value.basics , name: "Python 3"},
  {src: "matlab-logo.png", type: texte.value.basics , name: "Matlab"},
  {src: "js-logo.png", type: texte.value.basics +", React, Vue", name: "Javascript"},
  {src: "html-logo.png", type: texte.value.basics , name: "Html 5"},
  {src: "css-logo.png", type: texte.value.basics +", advanced, Bootstrap", name: "Css 3"},
  {src: "c++-logo.png", type: texte.value.basics , name: "C and C++"},
  {src: "php-logo.png", type:texte.value.basics , name: "Php"},
  {src: "mysql-logo.png", type: texte.value.basics , name: "MySql"},
  {src: "android-studio-logo.png", type: texte.value.basics , name: "Android Studio [java]"},
  {src: "react-logo.png", type: texte.value.basics , name: "React js"},
  {src: "vue-logo.png", type: texte.value.basics , name: "Vue js"},
  {src: "bootstrap-logo.png", type: texte.value.basics , name: "Bootstrap 5"},
  {src: "arduino-logo.png", type: texte.value.basics , name: "Arduino"}

]));


const list2 = computed(()=> ( [
  {src: "java-logo.png", type: texte.value.basics+", "+texte.value.advanced+", Springboot, JavaFx", name: "Java"},
  {src: "python-logo.png", type: texte.value.basics , name: "Python 3"},
  {src: "matlab-logo.png", type: texte.value.basics , name: "Matlab"},
  {src: "js-logo.png", type: texte.value.basics +", React, Vue", name: "Javascript"},
  {src: "html-logo.png", type: texte.value.basics , name: "Html 5"},
  {src: "css-logo.png", type: texte.value.basics +", advanced, Bootstrap", name: "Css 3"},
  {src: "c++-logo.png", type: texte.value.basics , name: "C and C++"},
  {src: "php-logo.png", type:texte.value.basics , name: "Php"},

]));

let list;
list = props.full ? list1 : list2 ;

window.addEventListener("resize", () => afterLoad())
function afterLoad() {
  if (imgRef.value[0].offsetHeight ) {
    lapHeight.value = imgRef.value[0].offsetHeight + 20


  }
}

onMounted(()=> {

  if (cardRef.value) {

    const observer = new IntersectionObserver(entries => {
      // We will fill in the callback later...
      entries.forEach(entry => {
        // If the element is visible
        if (entry.isIntersecting) {
          // Add the animation class
          entry.target.classList.add('animation');
        }
      });
    });


    cardRef.value.forEach(card => {
      observer.observe(card);
    })

  }
})

</script>


<template>
  <div class="container-sm pt-5 mt-5 text-center text-black-50 big-container">
    <h1 class="display-5  fw-normal mt-5">{{ texte.title }}</h1>
    <div
        class="mt-5 row row-cols-2 g-4 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-4 justify-content-center">


      <div
          v-for="(item,index) in list" ref="cardRef"
          class="col text-center card-big position-relative "
          :style="{transitionDelay:(index*400)+'ms' }"
          :key="index" >

        <div
            class="d-flex w-100 align-items-start bg-secondary justify-content-center rounded border-5 border-dark"
            :style="{height:lapHeight+'px'}">
          <img
              class="card-image w-100 rounded border border-5 border-secondary " @load="afterLoad()"
              :src="getImgUrl(item.src)" alt="" ref="imgRef">
        </div>
        <div class="card-bottom position-relative w-75 pb-2 ps-2 bg-light text-start border border-1 border-secondary  mx-auto cursor-pointer">
          <p class="mt-2 text-black-50">{{ item.type }}</p>
          <p class="mt-2 text-black">{{ item.name }}</p>
        </div>
      </div>
    </div>

    <a v-if="!props.full" class="btn btn-lg btn-primary p-3 px-4 mt-5"
       @click="address2?'':$emit('set-current','programmiersprachen')"
       :href="!address2?'#':address2+'programmiersprachen/'+lang"
    >{{ texte.button }}</a>


  </div>
</template>


<style scoped>
.big-container {
  padding-bottom: 3rem;
}

.card-bottom {
  top: -10%;
  box-shadow: 5px 5px 5px rgba(35, 34, 34, 0.12);
  transition: 400ms;

}

.card-bottom:hover {
  transform: translateY(-14%);
}


.card-image {
  height: 8rem;

  /*border: 6px solid rgba(0, 0, 0, 0.53);*/
}

.card-big{
  transition: 1s;
  opacity: 0;
  transform: translateX(calc(-70px))
}

.animation {
  /*animation-name: example !important;*/
  /*animation-duration: 1s;*/
  /*animation-fill-mode: forwards;*/
  opacity: 100% !important;
  transform:translateX(0) ;
}

@keyframes example {
  from {
    opacity: 0;
    transform: translateX(calc(-100% - 100vw))
  }
  to {
    opacity: 100% ;
    transform: translateX(0)
  }

}


</style>