<!--  -->
<template>
  <div>
    <div>
      <v-timeline>
        <v-timeline-item>timeline item</v-timeline-item>
        <v-timeline-item class="text-right"> timeline item </v-timeline-item>
        <v-timeline-item>timeline item</v-timeline-item>
      </v-timeline>
    </div>
    <v-list nav dense>
      <v-list-item-group> 123 </v-list-item-group>
    </v-list>
  </div>
</template>

<script>
export default {
  data: () => ({
    value: [2, 12, 26, 42, 63],
  }),
};
</script>
<style scoped>
</style>