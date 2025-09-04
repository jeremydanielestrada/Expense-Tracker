<script setup>
const props = defineProps(['success', 'error', 'title'])
</script>

<template>
  <div :class="props.success || props.error ? 'position-fixed' : ''">
    <v-alert
      v-if="props.success"
      :title="props.title"
      type="success"
      variant="tonal"
      density="compact"
      border="start"
      color="success"
      closable
    >
    </v-alert>

    <v-alert
      v-if="props.error"
      title="An error occured"
      type="error"
      color="error"
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
