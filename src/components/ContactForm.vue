<script setup>
import {computed, onMounted, ref} from "vue";
import {ar_contact, de_contact, en_contact} from "@/texte";

const conRef = ref(null)
// eslint-disable-next-line no-undef
const props = defineProps({ lang: String})


// eslint-disable-next-line no-unused-vars
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


</script>


<template>
  <div class="bg-light-darker position-relative px-lg-5 pt-5 "
       ref="conRef"
       style="transition: 2.5s; transform:translateY(40%) !important ;opacity: 0;"
  >

    <div class="container px-1 px-lg-5   text-center position-relative pt-5 mt-5   pb-5 mb-5 "


    >


      <div id="border" style="height: 0.2rem;width: 8rem" class="mx-auto bg-primary mb-5"></div>
      <h2 class="mb-5">{{texte.formulare.head1}}</h2>
      <p class="text-black-50 fs-6 w-50 mx-auto mb-5">{{texte.formulare.head2}}</p>
      <form action="" class="w-auto mx-auto w-lg-75">
        <div class="row row-cols-1 row-cols-md-2 gy-3 mb-3">
          <div class="col">
            <input type="text" class="form-control" :placeholder="texte.formulare.name1">
          </div>
          <div class="col">
            <input type="text" class="form-control" :placeholder="texte.formulare.name2">
          </div>
        </div>
         <div class="mb-3">
           <input type="email" class="form-control" :placeholder="texte.formulare.email">
         </div>
        <div class="mb-3">
          <select class="form-select" >
            <option selected>{{ texte.formulare.issue }}</option>
            <option v-for="item in texte.formulare.select" :key="item"
                    :value="item">{{item}}</option>
            </select>
        </div>
        <div class="mb-3">
          <textarea class="form-control" :placeholder="texte.formulare.msg" rows="5"></textarea>
        </div>
        <div class="mb-5 text-end">
        <button class="btn btn-lg btn-primary ">{{texte.formulare.button}}</button>
        </div>
      </form>

    </div>

  </div>
</template>

<style scoped>

</style>