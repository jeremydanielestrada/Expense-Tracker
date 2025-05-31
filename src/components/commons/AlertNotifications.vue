<script setup>
const props = defineProps(['succesDelete', 'errorDelete'])
</script>

<template>
  <div :class="props.succesDelete || props.errorDelete ? '  position-sticky' : ''">
    <v-alert
      v-if="props.succesDelete"
      title="Succesfuly Deleted"
      type="success"
      variant="tonal"
      density="compact"
      border="start"
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

<style scoped></style>
