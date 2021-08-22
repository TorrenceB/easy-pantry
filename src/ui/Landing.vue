<template>
  <v-container>
    <Featured />
  </v-container>
</template>

<script>
import Featured from "@/ui/Featured";

export default {
  name: "Landing",
  components: { Featured },

  data: () => ({
    items: [
      "https://thumbs.dreamstime.com/b/sea-food-lobster-diversity-167057563.jpg",
      "https://image.shutterstock.com/image-photo/grilled-shrimps-prawns-served-lemon-260nw-1048399834.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqYxilLiWeX4HZSzOvJdho3r3EDBjJvBxSaA&usqp=CAU",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScYivZgLA9-upVRzaz3FpPVVqCvFMOq7YPSA&usqp=CAU",
    ],
  }),
};
</script>
