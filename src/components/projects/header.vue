<template>
  <header class="header d-flex justify-content-center align-items-center">
    <form class="search-form" id="search" style="display: block; position: absolute; top: -55px;">
      <input type="text" class="form-control" placeholder="Search by name"
             v-model="searchQuery" v-on:click="searchClear" v-on:keyup="changeView">
      <svg class="search-form-svg"><use xlink:href="#maginifierTool"></use></svg>
      <span class="hot-key-hint hot-key-hint--left">/</span>
    </form>

    <div class="search-results-header">
      <div class="search-results-item search-results-choose" style="width: 5%;"></div>
      <div class="search-results-item search-results-sender" style="width: 45%; padding-left: 20px;">Name</div>
      <div class="search-results-item search-results-amount" style="width: 45%; right: 0px;">Total</div>


    </div>
  </header>
</template>

<script>
  import appConfig from '../../main';

  export default {
    name: 'projects-header',
    data() {
      return {
        searchQuery: ''
      }
    },
    methods: {
      changeView() {
        appConfig.$emit('searchQuery', this.searchQuery);
      },
      searchClear() {
        this.searchQuery = '';
        appConfig.$emit('searchQuery', this.searchQuery);
      }
    }
  }
</script>
