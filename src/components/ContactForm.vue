<script setup>
import {computed, onMounted, ref} from "vue";
import {ar_contact, de_contact, en_contact} from "@/texte";
import {address} from "@/api";

const conRef = ref(null)
// eslint-disable-next-line no-undef

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


// eslint-disable-next-line no-undef
const props = defineProps({lang: String})
const loading = ref(false)
const showModal = ref(false)

function onCloseModal() {
  loading.value = false;
  showModal.value = false
}

const first_name = ref(null)
const last_name = ref(null)
const email = ref("")
const issue = ref(null)
const msg = ref(null)
const warning = ref("")


function submit() {
  if (!first_name.value || !last_name.value || !validateEmail() || !issue.value || !msg.value) {
    warning.value = texte.value.formulare.warning
    return
  }
  warning.value = ""

  let form_data = new FormData();
  // let index = 1
  // for (const f of file_list.value) {
  //   form_data.append('file' + index, f);
  //   index++
  // }
  form_data.append('method', "POST");
  form_data.append('first_name', first_name.value);
  form_data.append('last_name', last_name.value);
  form_data.append('email', email.value);
  form_data.append('issue', issue.value);
  form_data.append('msg', msg.value);

  loading.value = true
  fetch(address + 'file2', {
    method: 'POST',
    mode: "cors",
    headers: {},
    body: form_data
  })
      .then(function (response) {
        if (!response.ok) {
          // fetchError.value = response.status;
          console.log("Response status :" + response.status)
        } else {
          console.log("json will parse soon")
          response.json().then(function (json) {
            console.log("json parsed successfully")
            showModal.value = true
            if (json.type === "success")
              warning.value = texte.value.formulare.success;
            else if (json.type === "error")
              warning.value = texte.value.formulare.error;
          });
        }
      });


}


function validateEmail() {
  return email.value
      .toLowerCase()
      .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
}

onMounted(() => {

  if (conRef.value) {
    const observer1 = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.transform = 'translateY(0)';
          entry.target.style.opacity = '100%';
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
      <h2 class="mb-5">{{ texte.formulare.head1 }}</h2>
      <p class="text-black-50 fs-6 w-50 mx-auto mb-5">{{ texte.formulare.head2 }}</p>
      <form action="" class="w-auto mx-auto w-lg-75">
        <div class="row row-cols-1 row-cols-md-2 gy-3 mb-3">
          <div class="col">
            <input :class="{'is-invalid':warning&&!first_name,'is-valid':warning&&first_name}" required
                   v-model="first_name" type="text"
                   class="form-control" :placeholder="texte.formulare.name1">
          </div>
          <div class="col">
            <input :class="{'is-invalid':warning&&!last_name,'is-valid':warning&&last_name}" required
                   v-model="last_name" type="text"
                   class="form-control" :placeholder="texte.formulare.name2">
          </div>
        </div>
        <div class="mb-3">
          <input :class="{'is-invalid':warning&&!validateEmail(),'is-valid':warning&&validateEmail()}" required
                 v-model="email" type="email"
                 class="form-control" :placeholder="texte.formulare.email">
        </div>
        <div class="mb-3">
          <select :class="{'is-invalid':warning&&!issue,'is-valid':warning&&issue}" required
                  v-model="issue" class="form-select">
            <option selected value="null" >{{ texte.formulare.issue }}</option>
            <option v-for="item in texte.formulare.select" :key="item"
                    :value="item">{{ item }}
            </option>
          </select>
        </div>
        <div class="mb-3">
          <textarea :class="{'is-invalid':warning&&!msg,'is-valid':warning&&msg}" required
                    v-model="msg"
                    class="form-control" :placeholder="texte.formulare.msg" rows="5"></textarea>
        </div>
        <div class="mb-5 text-end">
          <button class="btn ms-auto btn-lg btn-primary mw-50 mw-md-25 position-relative d-flex justify-content-center align-items-center "
                  @click.prevent.stop="submit()" style="height: 2.4rem"
                  :class="{'btn-send-animation':loading} ">

            <div style="transition:1s;"
                 :class="{'spinner-container':!loading,'spinner-container-animation':loading}"
                 class="position-absolute d-flex align-items-center  "
            >
              <div v-show="loading"
                   class="spinner-border spinner-border-sm  text-white " role="status"></div>
            </div>
            <span v-show="!loading">{{ texte.formulare.button }}</span>


          </button>
        </div>
      </form>

    </div>



    <div v-if="loading"
         :class="{'opacity-25':showModal}"
         class="position-absolute gap-2 opacity-0 text-black d-flex flex-column align-items-center justify-content-center top-0 start-0 bottom-0 end-0 w-100 h-100 bg-black"
         @click.stop.prevent="">

    </div>

  </div>



  <div class="modal fade  " :class="{'d-block show':showModal}" id="myModal" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">{{ texte.formulare.modal }}</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" @click="onCloseModal"
                  aria-label="Close"></button>
        </div>
        <div class="modal-body">
          {{ warning }}
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="onCloseModal" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary d-none">Save changes</button>
        </div>
      </div>
    </div>
  </div>

</template>

<style scoped>
.btn-send-animation {
  background-color: var(--bs-success) !important;

}

.spinner-container-animation {
  transform: translateX(0) !important
}

.spinner-container {
  transform: translateX(-70px) !important;
}


</style>