<script setup>

import {computed, ref} from "vue";
import RequestList from "@/components/RequestList";
import {ar_nachhilfe, de_nachhilfe, en_nachhilfe} from "@/texte";

const sizeError = ref("")
// const input_file = ref(null)
const max_size = 10 * 1000 * 1000
const file_list = ref([])
const current_file = ref("")

const current_size = computed(() => {
  let sum = 0
  for (const f of file_list.value) {
    sum += f.size
  }
  return sum;
})

const loading = ref(false)
const showModal = ref(false)

function onCloseModal() {
  loading.value = false;
  showModal.value = false
}

const current = ref(7);
const page1Ref = ref(null);
const page2Ref = ref(null);
const page3Ref = ref(null);
const page4Ref = ref(null);
const page5Ref = ref(null);
const page6Ref = ref(null);
const page7Ref = ref(null);

const page1Active = ref(-1)
const page2Active = ref(-1)
const page3Active = ref(-1)
const page4Active = ref(-1)

const first_name = ref(null)
const last_name = ref(null)
const email = ref("")
const number = ref(null)
const agree = ref(null)
const warning = ref("")

const textArea5 = ref("");
const textArea6 = ref("");


function onChange(e) {
  if (!e.target)
    return;
  sizeError.value = ""
  let new_size = 0
  for (const f of e.target.files) {
    new_size += f.size
  }
  if (new_size + current_size.value > max_size) {
    sizeError.value = "documents cant exceed 10 MB"
    return
  }
  for (const f of e.target.files) {
    if (file_list.value.filter(f2 => f2.name === f.name).length > 0)
      continue
    file_list.value.push(f)
  }


}


function submit() {
  if (!first_name.value || !last_name.value || !validateEmail() || !agree.value) {
    warning.value = texte.value.page7.warning
    return
  }
  warning.value = ""

  let form_data = new FormData();
  let index = 1
  for (const f of file_list.value) {
    form_data.append('file' + index, f);
    index++
  }
  form_data.append('method', "POST");
  form_data.append('first_name', first_name.value);
  form_data.append('last_name', last_name.value);
  form_data.append('email', email.value);
  form_data.append('number', number.value);
  form_data.append('interested_in', texte.value.page1.list[page1Active.value]);

  form_data.append('budget_language', textArea5.value);
  form_data.append('budget_project', textArea6.value);

  if (page2Active.value !== -1)
    form_data.append('how_oft', texte.value.page2.list[page2Active.value]);
  if (page3Active.value !== -1)
    form_data.append('how_long', texte.value.page3.list[page3Active.value]);
  if (page4Active.value !== -1)
    form_data.append('deadline', texte.value.page4.list[page4Active.value]);

  loading.value = true
  fetch('http://127.0.0.1:5000/file', {
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
              warning.value = texte.value.page7.success;
            else if (json.type === "error")
              warning.value = texte.value.page7.error;
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


let transition = 300;
const back_stack = []
const progress = computed(() => {
  return (current.value - 1) * (100 / 6)
})

// eslint-disable-next-line no-undef
const props = defineProps({lang: String})


// eslint-disable-next-line no-unused-vars
const texte = computed(() => {
  if (props.lang === 'de') {
    return de_nachhilfe;
  } else if (props.lang === 'en') {
    return en_nachhilfe;
  } else if (props.lang === 'ar') {
    return ar_nachhilfe
  } else {
    return de_nachhilfe;
  }

})


const page1_list = computed(() => ([
  {icon: "bi-laptop", text: texte.value.page1.list[0], dist: 2},

  {icon: "bi-1-square-fill", text: texte.value.page1.list[1], dist: 3},
  {icon: "bi-card-checklist", text: texte.value.page1.list[2], dist: 4},
  {icon: "bi-kanban-fill", text: texte.value.page1.list[3], dist: 4},
  {icon: "bi-question-lg", text: texte.value.page1.list[4], dist: 6},
]));

const page2_list = computed(() => ([
  {icon: "bi-stopwatch", text: texte.value.page2.list[0], dist: 5},
  {icon: "bi-clock-fill", text: texte.value.page2.list[1], dist: 5},
  {icon: "bi-calendar-fill", text: texte.value.page2.list[2], dist: 5},
  {icon: "bi-calendar-week-fill", text: texte.value.page2.list[3], dist: 5},
  {icon: "bi-calendar-x-fill", text: texte.value.page2.list[4], dist: 5},
]));

const page3_list = computed(() => ([
  {icon: "bi-stopwatch", text: texte.value.page3.list[0], dist: 5},
  {icon: "bi-clock-fill", text: texte.value.page3.list[1], dist: 5},
  {icon: "bi-calendar-x-fill", text: texte.value.page3.list[2], dist: 5},
]))

const page4_list = computed(() => ([
  {icon: "bi-stopwatch", text: texte.value.page4.list[0], dist: 6},
  {icon: "bi-clock-fill", text: texte.value.page4.list[1], dist: 6},
  {icon: "bi-calendar-fill", text: texte.value.page4.list[2], dist: 6},
  {icon: "bi-calendar-week-fill", text: texte.value.page4.list[3], dist: 6},
  {icon: "bi-calendar-x-fill", text: texte.value.page4.list[4], dist: 6},
]))


function onItemClick(dist) {

  // eslint-disable-next-line no-unreachable
  let currentRef;
  switch (current.value) {
    case 1:
      currentRef = page1Ref.value
      break
    case 2:
      currentRef = page2Ref.value
      break
    case 3:
      currentRef = page3Ref.value
      break
    case 4:
      currentRef = page4Ref.value
      break
    case 5:
      // eslint-disable-next-line no-unused-vars
      currentRef = page5Ref.value
      break
    case 6:
      // eslint-disable-next-line no-unused-vars
      currentRef = page6Ref.value
      break
    case 7:
      // eslint-disable-next-line no-unused-vars
      currentRef = page7Ref.value
      break
  }
  let distRef
  switch (dist) {
    case 1:
      distRef = page1Ref.value
      break
    case 2:
      distRef = page2Ref.value
      break
    case 3:
      distRef = page3Ref.value
      break
    case 4:
      distRef = page4Ref.value
      break
    case 5:
      distRef = page5Ref.value
      break
    case 6:
      // eslint-disable-next-line no-unused-vars
      distRef = page6Ref.value
      break
    case 7:
      // eslint-disable-next-line no-unused-vars
      distRef = page7Ref.value
      break
  }


  if (current.value < dist) {
    back_stack.push(current.value)
    forward_animation(dist, currentRef, distRef)
  } else {
    back_stack.pop()
    backward_animation(dist, currentRef, distRef)
  }

}


function forward_animation(dist, currentRef, distRef) {
  currentRef.style.transform = 'translateX(-100%)'
  distRef.style.transform = 'translateX(100%)'
  setTimeout(() => {
    // distRef.value.style.transition = '0s'
    current.value = dist
    setTimeout(() => {
      currentRef.style.transform = 'translateX(0)'
      distRef.style.transform = 'translateX(0)'
    }, 50)

  }, transition)
}

function backward_animation(dist, currentRef, distRef) {
  currentRef.style.transform = 'translateX(100%)'
  distRef.style.transform = 'translateX(-100%)'
  setTimeout(() => {
    // distRef.value.style.transition = '0s'
    current.value = dist
    setTimeout(() => {
      currentRef.style.transform = 'translateX(0)'
      distRef.style.transform = 'translateX(0)'
    }, 50)

  }, transition)
}


function btn_left() {
  if (current.value > 1)
    return "btn-primary"
  else
    return "btn-secondary disabled"
}

function btn_right() {
  if (current.value === 5 && textArea5.value !== "")
    return "btn-primary"
  else if (current.value === 6 && textArea6.value !== "")
    return "btn-primary"
  else
    return "btn-secondary disabled"
}

function goBack() {
  let lastDist = back_stack[back_stack.length - 1];
  if (lastDist === 4)
    page4Active.value = -1
  if (lastDist === 3)
    page3Active.value = -1
  if (lastDist === 2)
    page2Active.value = -1
  if (lastDist === 1)
    page1Active.value = -1

  onItemClick(lastDist)
}
</script>


<template>
  <div class="position-relative pb-5">
    <div id="padding1-div" class="container-sm my-5 py-5 px-md-5 ">

      <!--    //*******************************************************-->
      <!--    //********************** page1 -->
      <!--    //*******************************************************-->

      <div :style="{transition:transition+'ms'}"
           v-show="current===1"
           ref="page1Ref" class="text-center position-relative px-md-5 ">
        <h3 class="text-primary text-center mt-5">{{ texte.page1.title }}</h3>
        <div id="padding container" class="container-fluid  px-md-2 px-lg -5 text-center">
          <RequestList :list="page1_list" @item-click="(d,i)=>{page1Active=i; onItemClick(d)}"/>
        </div>
      </div>

      <!--    //*******************************************************-->
      <!--    //********************** page2 -->
      <!--    //*******************************************************-->
      <div :style="{transition:transition+'ms'}"
           v-show="current===2"
           ref="page2Ref" class="text-center position-relative px-md-5 ">
        <h3 class="text-primary text-center mt-5">{{ texte.page2.title }}</h3>
        <div id="padding container" class="container-fluid  px-md-2 px-lg -5 text-center">
          <RequestList :list="page2_list" @item-click="(d,i)=>{page2Active=i; onItemClick(d)}"/>
        </div>
      </div>


      <!--    //*******************************************************-->
      <!--    //********************** page3 -->
      <!--    //*******************************************************-->
      <div :style="{transition:transition+'ms'}"
           v-show="current===3"
           ref="page3Ref" class="text-center position-relative px-md-5 ">
        <h3 class="text-primary text-center mt-5">{{ texte.page3.title }}</h3>
        <div id="padding container" class="container-fluid  px-md-2 px-lg -5 text-center">
          <RequestList :list="page3_list" @item-click="(d,i)=>{page3Active=i; onItemClick(d)}"/>
        </div>
      </div>


      <!--    //*******************************************************-->
      <!--    //********************** page4 -->
      <!--    //*******************************************************-->
      <div :style="{transition:transition+'ms'}"
           v-show="current===4"
           ref="page4Ref" class="text-center position-relative px-md-5 ">
        <h3 class="text-primary text-center mt-5">{{ texte.page4.title }}</h3>
        <div id="padding container" class="container-fluid  px-md-2 px-lg -5 text-center">
          <RequestList :list="page4_list" @item-click="(d,i)=>{page4Active=i; onItemClick(d)}"/>
        </div>
      </div>


      <!--    //*******************************************************-->
      <!--    //********************** page5 -->
      <!--    //*******************************************************-->
      <div :style="{transition:transition+'ms'}"
           v-show="current===5"
           ref="page5Ref" class="text-center position-relative px-md-5 ">
        <h3 class="text-primary text-center mt-5">{{ texte.page5.title }}</h3>
        <div id="padding container" class="container-fluid  px-md-2 px-lg -5 text-center">
          <div class="mb-1 mt-5" style="margin-top: 4rem!important;">
            <textarea v-model="textArea5" class="form-control border-dark" placeholder="" rows="5"></textarea>
          </div>
        </div>
      </div>


      <!--    //*******************************************************-->
      <!--    //********************** page6 -->
      <!--    //*******************************************************-->
      <div :style="{transition:transition+'ms'}"
           v-show="current===6"
           ref="page6Ref" class="text-center position-relative px-md-5 ">
        <h3 class="text-primary text-center mt-5" v-html="texte.page6.title"></h3>

        <div id="padding container" class="container-fluid  px-md-2 px-lg -5 text-center">
          <div class="mb-3 mt-5" style="margin-top: 4rem!important;">
            <textarea v-model="textArea6" class="form-control border-dark" placeholder="" rows="4"></textarea>
          </div>
          <div class="mb-1 ">
            <!--            <label for="formFileMultiple " class="form-label text-start text-primary fs-4"> Aufgabenbeschreibung </label>-->
            <input :value="current_file" multiple @change="onChange($event)"
                   class="form-control" type="file" id="formFileMultiple">
          </div>
          <div
              class="row mt-2 row-cols-2 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 align-items-md-center overflow-y-auto gy-2 gx-2"
              style="max-height: 6rem;">
            <div v-for="file in file_list" :key="file.name"
                 class="col   ">
              <div class="text-black d-flex gap-1 bg-white shadow-sm rounded-1 py-1">
                <i class="bi-archive-fill text-black-50 small  "></i>
                <span class="small">{{ file.name.length > 18 ? file.name.slice(0, 18) + "..." : file.name }}</span>
                <i class="bi-x ms-auto text-danger small" @click="file_list=file_list.filter(f=>f!==file)"></i>
              </div>
            </div>
          </div>
          <p class="text-danger small">{{ sizeError }}</p>
          <p class="text-black-50 small fst-italic">uploaded {{ Math.round(current_size / 1000000) }} MB,
            remaining {{ Math.round((max_size - current_size) / 1000000) }}MB</p>

        </div>
      </div>


      <!--    //*******************************************************-->
      <!--    //********************** page7 -->
      <!--    //*******************************************************-->
      <div :style="{transition:transition+'ms'}"
           v-show="current===7"
           ref="page7Ref" class="text-center position-relative px-md-5 ">
        <h2 class="text-primary text-center mt-5">{{ texte.page7.title1 }}</h2>
        <h5 class="text-primary fw-light opacity-75 ">{{ texte.page7.title2 }}</h5>
        <div id="padding container" class="container-fluid text-center  px-md-2 px-lg -5 text-center">
          <div class="row pt-5 justify-content-center">
            <div class="col-12 col-md-10 col-lg-9 col-xl-7">
              <form action=" " class="mx-auto">
                <div class="input-group input-group-lg mb-4 shadow">
                  <i class="input-group-text bi-person bg-primary text-white"></i>
                  <input :class="{'is-invalid':warning&&!first_name,'is-valid':warning&&first_name}" required
                         v-model="first_name" type="text" class="form-control" :placeholder="texte.page7.first_name">
                </div>
                <div class="input-group input-group-lg mb-4 shadow">
                  <i class="input-group-text bi-person bg-primary text-white"></i>
                  <input :class="{'is-invalid':warning&&!last_name,'is-valid':warning&&last_name}" required
                         v-model="last_name" type="text" class="form-control " :placeholder="texte.page7.last_name">
                </div>
                <div class="input-group input-group-lg mb-4 shadow">
                  <i class="input-group-text bi-envelope bg-primary text-white"></i>
                  <input :class="{'is-invalid':warning&&!validateEmail(),'is-valid':warning&&validateEmail()}" required
                         v-model="email" type="email" class="form-control " :placeholder="texte.page7.email">
                </div>
                <div class="input-group input-group-lg mb-4 shadow">
                  <i class="input-group-text bi-phone bg-primary text-white"></i>
                  <input v-model="number" type="text" class="form-control " :placeholder="texte.page7.number">
                </div>
                <div class="form-check mb-3 d-flex align-items-start align-items-md-center  gap-2 ps-5">
                  <input :class="{'is-invalid':warning&&!agree,'is-valid':warning&&agree}" required
                         v-model="agree" class="form-check-input fs-4 border-dark" type="checkbox" value=""
                         id="flexCheckDefault">
                  <label class="form-check-label" for="flexCheckDefault">
                    {{ texte.page7.data_protection }}
                  </label>
                </div>
                <!--                <div id="warning" class="text-danger small mb-4">{{ warning }}</div>-->
                <button class="btn btn-primary position-relative  w-100 fs-6 mt-4 d-flex justify-content-center "
                        @click.prevent="submit()" style="height: 2.4rem"
                        :class="{'btn-send-animation':loading}"
                >

                  <div style="transition:1s;"
                       :class="{'spinner-container':!loading,'spinner-container-animation':loading}"
                       class="position-absolute   "
                  >
                    <div v-show="loading"
                        class="spinner-border    spinner-border-sm text-white " role="status"></div>
                  </div>
                  <span v-show="!loading" >{{ texte.page7.button }}</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <!--    //*******************************************************-->
      <!--    //********************** Navigator-->
      <!--    //*******************************************************-->


    </div>
    <div class="d-flex mb-5 gap-2 gap-lg-2 px-3 position-absolute start-0 end-0 bottom-0 ">
      <div class="btn  " :class="[btn_left()]" @click="goBack()">
        <i class="bi-arrow-left text-white"></i>
      </div>
      <div style="height: 0.4rem;"
           class="flex-grow-1 bg-light-darker rounded-1 align-self-center d-flex ">
        <div id="progress" :style="{transition:800+'ms',width:progress+'%'}"
             class="rounded-1 bg-primary h-100 "></div>
      </div>
      <div>

      </div>
      <div class="btn " :class="[btn_right()]" @click="()=>onItemClick(7)">
        <i class="bi-arrow-right text-white"></i>
      </div>

    </div>


    <div v-if="loading"
         :class="{'opacity-25':showModal}"
         class="position-absolute gap-2 opacity-0 text-black d-flex flex-column align-items-center justify-content-center top-0 start-0 bottom-0 end-0 w-100 h-100 bg-black"
         @click.stop.prevent="">

    </div>


  </div>


  <!--    //*******************************************************-->
  <!--    //********************** Modal and background-->
  <!--    //*******************************************************-->


  <div class="modal fade  " :class="{'d-block show':showModal}" id="myModal" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">{{ texte.page7.modal }}</h1>
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
.btn-send-animation{
  background-color: var(--bs-success) !important;

}
.spinner-container-animation{
  transform: translateX(0)  !important
}
.spinner-container{

  transform: translateX(-200px)  !important;
}

.spinner-container:hover{

  transform: translateX(0) !important;
}

</style>