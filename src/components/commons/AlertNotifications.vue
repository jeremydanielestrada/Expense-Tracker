<script setup>
const props = defineProps(['succesDelete', 'errorDelete'])
</script>

<template>
  <div :class="props.succesDelete || props.errorDelete ? 'position-fixed' : ''">
    <v-alert
      v-if="props.succesDelete"
      title="Succesfuly Deleted"
      type="success"
      variant="tonal"
      density="compact"
      border="start"
      color="cyan-accent-3"
      closable
    >
    </v-alert>

    <v-alert
      v-if="props.errorDelete"
      text="Error Deleting Item"
      title="Ooops!"
      type="error"
      variant="tonal"
      density="compact"
      border="start"
      closable
    ></v-alert>
  </div>
</template>

<style scoped>
.position-fixed {
  z-index: 1000;
  right: 0;
  left: 0;
}
</style>
