<script setup>
import {address2} from "@/api";
import {de_appbar, en_appbar, ar_appbar} from "@/texte";
import {computed, onMounted, ref} from "vue";

const img = ref(null)
const bigCon = ref(null)
const smCon = ref(null)
const mainCon = ref(null)


// eslint-disable-next-line no-undef
const props = defineProps({current: String, lang: String})


const texte = computed(() => {
  if (props.lang === 'de') {
    return de_appbar;
  } else if (props.lang === 'en') {
    return en_appbar;
  } else if (props.lang === 'ar') {
    return ar_appbar
  } else {
    return de_appbar;
  }

})

window.addEventListener("resize", () => afterLoad())

// const links = ["home","nachhilfe","programmiersprachen","kontakt","about us"]

function setObserver() {
  const ioConfiguration = {
    rootMargin: '-50% 0% -50% 0%',
    threshold: 0
  };
  let oberver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (entry.target.id === "main")
          entry.target.classList.add("animation-main")
        else
          entry.target.classList.add("animation-small")
      }
    })
  }, ioConfiguration)

  oberver.observe(mainCon.value)
  oberver.observe(smCon.value)

}

onMounted(() => {
})

function afterLoad() {
  if (!img.value)
    return
  setObserver()
  img.value.style.top = "0";
  img.value.style.height = "auto"
  let imgHeight = img.value.offsetHeight;
  let stdHeight = bigCon.value.offsetHeight;
  let winHeight = window.innerHeight;
  if (imgHeight > stdHeight) {
    img.value.style.top = (stdHeight - imgHeight) + "px"
  } else if (imgHeight <= stdHeight && imgHeight >= winHeight) {
    img.value.style.height = stdHeight + "px"
  } else {
    img.value.style.height = ((0.8 * winHeight) + (stdHeight - winHeight)) + "px"
    img.value.style.top = (0.2 * winHeight) + "px"

  }
  console.log(img.value.offsetTop)
}


function getImgUrl(src) {
  // return require(src)
  var images = require.context('../assets/', false, /\.jpg$/)
  return images('./' + src)
}


</script>

<template>
  <div ref="bigCon" class="position-relative w-100 big-container d-flex flex-column    ">
    <img ref="img" @load="afterLoad"
         :src="getImgUrl('top-image.jpg')" alt="background image"
         class="bg-img position-absolute  w-100 z-n1 p-0  ">

    <nav class="navbar navbar-expand-lg  bg-light bg-lg-transparent ">
      <div class="container-lg justify-content-center align-items-lg-end ">
        <a class="navbar-brand d-flex flex-column w-100 w-lg-auto align-items-center text-lg-white" href="#">
          <span class="display-1 fs-lg-2 p-0 m-0 fw-bold text-uppercase">{{ texte.logo_bg }}</span>
          <span class="h1 fs-lg-5 p-0  m-0 text-uppercase">{{ texte.logo_sm }}</span>
        </a>
        <button class="navbar-toggler mt-5" type="button"
                data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav gap-lg-2 ms-lg-auto me-lg-auto me-3 mb-2 mb-lg-0 align-items-center mt-2 mt-lg-0  ">
            <li v-for="(link,index) in texte.nav_link" :key="index" class="nav-item ">
              <a class="nav-link  active fs-6 text-uppercase  text-lg-white  "
                 :class="{'text-lg-white-50':props.current===link.value}"
                 @click="address2?'':$emit('set-current',link.value)"
                :href="!address2?'#':address2+link.value+'/'+lang">{{ link.name }}</a>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle text-uppercase text-lg-white" href="#" role="button"
                 data-bs-toggle="dropdown" aria-expanded="false">
                {{ props.lang }}
              </a>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="#"
                       @click="$emit('set-lang','de')">Deutsch</a></li>
                <li><a class="dropdown-item" href="#"
                       @click="$emit('set-lang','en')">English</a></li>
<!--                <li>-->
<!--                  <hr class="dropdown-divider">-->
<!--                </li>-->
<!--                <li><a class="dropdown-item" href="#"-->
<!--                       @click="$emit('set-lang','ar')">العربية</a>-->
<!--                </li>-->
              </ul>
            </li>
          </ul>
          <div class="d-none d-lg-flex flex-row  gap-3  justify-content-center justify-content-lg-start">
            <!--          <span class="material-symbols-outlined text-dark cursor-pointer text-md-white"> person</span>-->
            <!--          <span class="material-symbols-outlined cursor-pointer  text-md-white"> person</span>-->
            <i class="bi-facebook text-white text-dark fs-5 cursor-pointer text-lg-white"></i>
            <i class="bi-instagram text-white text-dark fs-5 cursor-pointer text-lg-white"></i>

          </div>
        </div>

      </div>
    </nav>

    <section ref="mainCon" id="main" class="container-sm  pt-5 text-white mt-5">
      <h3 class="text-white-50">{{texte.main1}}</h3>
      <p class="display-5 fw-bold">{{texte.main2}}</p>
      <div class="row">
        <div class="col-12 col-md-9  col-xl-9">
          <p class="fs-4">{{texte.main3}}</p>

        </div>
      </div>
      <a class="btn btn-lg btn-primary p-3 px-4 mt-5"
         @click="address2?'':$emit('set-current','programmiersprachen')"
         :href="!address2?'#':address2+'programmiersprachen/'+lang"
      >{{ texte.button }}</a>
    </section>

    <section ref="smCon" class="container-sm mt-5  d-flex align-items-end  flex-grow-1  "
             style="opacity: 0">
      <div class="row  g-2 ">
        <div
            class="col-12 col-sm-5 col-lg-4 d-flex gap-3  text-hover-dark text-white  cursor-pointer align-items-center py-4 border-top border-white border-5 me-sm-5 bg-hover-white ">
          <i class="bi-box-seam text-primary   display-3"></i>
          <h4 class="fw-normal  text-center ">{{ texte.left }}</h4>
        </div>
        <div
            class="col-12 col-sm-5 col-lg-4 d-flex gap-3 gap-md-1 align-items-center text-hover-dark   text-white  cursor-pointer py-4 border-top border-white border-5 bg-hover-white">
          <i class="bi-card-checklist text-primary   display-3"></i>
          <h4 class="fw-normal text-center ">{{texte.right}}</h4>
        </div>
      </div>

    </section>

  </div>
</template>


<style scoped>

.bg-image {
}

.big-container {
  background-color: rgba(0, 0, 0, 0.47);
  height: fit-content;

}


.animation-main {
  animation-duration: 3s;
  animation-name: frame-main;
}

.animation-small {
  animation-duration: 1s;
  animation-name: frame-small;
  animation-fill-mode: forwards;
}

@keyframes frame-main {
  from {
    transform: translateX(-100%)
  }
  to {
    transform: translateX(0)
  }
}

@keyframes frame-small {
  from {
    transform: translateY(-50%);
    opacity: 0
  }
  to {
    transform: translateX(0);
    opacity: 100%
  }
}


</style>