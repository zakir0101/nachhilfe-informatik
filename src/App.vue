<script setup>
import AppBar from './components/AppBar'
import {ref} from "vue";
import WhyWe from "@/components/WhyWe";
import PageFooter from "@/components/PageFooter";
import ProgrammingLanguage from "@/components/ProgrammingLanguage";
import  AboutUs from './components/AboutUs'
import  ContactUs from './components/ContactUs'
import  ContactForm from './components/ContactForm'
import RequestNachhilfe from "@/components/RequestNachhilfe";
const section =document.querySelector("#section").innerHTML ;
const language =  document.querySelector('#lang').innerHTML;
const current = ref(section);
const lang = ref(language);



</script>


<template>

  <section class="bi-" v-if="current==='home'">
    <AppBar  @set-lang="(l)=>lang=l" :current="current" :lang="lang" @set-current="(c)=>current=c"/>
    <programming-language :lang="lang"  :full="false" @set-current="(c)=>current=c"/>
    <WhyWe  :lang="lang" @set-current="(c)=>current=c" />
    <page-footer :lang="lang" @set-current="(c)=>current=c"/>
  </section>

  <section v-if="current==='about us'">
    <AppBar :lang="lang" @set-lang="(l)=>lang=l" :current="current" @set-current="(c)=>current=c"/>
    <AboutUs :lang="lang" @set-current="(c)=>current=c"/>
    <WhyWe :lang="lang" @set-current="(c)=>current=c"/>
    <page-footer :lang="lang" @set-current="(c)=>current=c"/>
  </section>

  <section v-if="current==='kontakt'">
    <AppBar :lang="lang" @set-lang="(l)=>lang=l" :current="current" @set-current="(c)=>current=c"/>
    <ContactUs :lang="lang"/>
    <ContactForm :lang="lang"/>
    <WhyWe :lang="lang" @set-current="(c)=>current=c"/>
    <page-footer :lang="lang" @set-current="(c)=>current=c"/>
  </section>
  <section class="" :lang="lang" v-if="current==='programmiersprachen'">
    <AppBar :lang="lang" @set-lang="(l)=>lang=l" :current="current" @set-current="(c)=>current=c"/>
    <programming-language  :lang="lang" :full="true" @set-current="(c)=>current=c"/>
    <WhyWe :lang="lang" @set-current="(c)=>current=c"/>
    <page-footer :lang="lang" @set-current="(c)=>current=c"/>
  </section>

  <section v-if="current==='nachhilfe'">
    <AppBar :lang="lang" @set-lang="(l)=>lang=l" :current="current" @set-current="(c)=>current=c"/>
    <request-nachhilfe :lang="lang"/>
    <WhyWe :lang="lang" @set-current="(c)=>current=c"/>
    <page-footer :lang="lang" @set-current="(c)=>current=c"/>
  </section>
</template>

<style>


</style>
