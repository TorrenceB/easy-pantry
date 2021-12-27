<template>
  <v-container>
    <Featured />
    <Categories />
  </v-container>
</template>

<script>
import Featured from "@/ui/featured/Featured";
import Categories from "@/ui/category/Categories";

export default {
  name: "Landing",
  components: { Featured, Categories },

  data: () => ({
    //
  }),
};
</script>
