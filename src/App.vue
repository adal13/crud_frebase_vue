<script>
// import HelloWorld from './components/HelloWorld.vue'
import ItemForm from './components/ItemForm.vue';
import ItemList from './components/ItemList.vue';

export default {
  components: {
    ItemForm,
    ItemList
  },
  data() {
    return {
      currentItem: null
    };
  }
};
</script>

<template>
  <!-- <HelloWorld msg="Vite + Vue" /> -->
  <!-- <ItemForm/> -->
  <!-- <ItemList/> -->
  <div id="app">
    <ItemForm :item="currentItem" @reset-form="currentItem = null" />
    <ItemList @edit-item="currentItem = $event" />
  </div>
</template>

<style scoped></style>
