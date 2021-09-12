<template>
  <v-container>
    <Featured />
    <Categories />
  </v-container>
</template>

<script>
import Featured from "@/ui/Featured";
import Categories from "@/ui/Categories";

export default {
  name: "Landing",
  components: { Featured, Categories },

  data: () => ({
    //
  }),
};
</script>
