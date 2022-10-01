<template>
  <v-card class="d-flex flex-column pa-4">
    <v-avatar color="teal" size="86" class="mx-auto"
      ><span class="text-h4">{{ userInitials }}</span></v-avatar
    >
    <!-- Name -->
    <div class="d-flex justify-space-between align-center mt-4" width="100%">
      <div class="d-flex flex-column">
        <label class="text-subtitle-2 text--secondary">Name</label>
        <p class="body-1 font-weight-medium">
          {{ user.firstName }} {{ user.lastName }}
        </p>
      </div>
      <v-dialog v-model="nameDialog">
        <template v-slot:activator="{ on, attrs }">
          <v-btn v-bind="attrs" v-on="on" text>
            <p class="blue--text">Update</p>
          </v-btn>
        </template>
        <v-card>
          <v-card-title class="d-flex justify-center">Update Name</v-card-title>
          <v-container>
            <v-row dense>
              <v-col cols="12">
                <v-text-field
                  v-model="localUser.firstName"
                  outlined
                  label="First Name"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row dense>
              <v-col cols="12">
                <v-text-field
                  v-model="localUser.lastName"
                  outlined
                  label="Last Name"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <v-card-actions class="justify-center" width="100%">
            <v-btn
              @click="handleUserUpdate('name')"
              color="primary"
              width="100%"
              height="50"
            >
              <v-progress-circular
                v-if="userIsUpdating"
                color="white"
                indeterminate
              >
              </v-progress-circular>
              <span v-else>Update</span>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
    <!-- Email -->
    <div class="d-flex justify-space-between align-center" width="100%">
      <div class="d-flex flex-column">
        <label class="text-subtitle-2 text--secondary">Email</label>
        <p class="body-1 font-weight-medium">{{ user.email }}</p>
      </div>
      <v-dialog v-model="emailDialog">
        <template v-slot:activator="{ on, attrs }">
          <v-btn v-bind="attrs" v-on="on" text>
            <p class="blue--text">Update</p>
          </v-btn>
        </template>
        <v-card>
          <v-card-title class="d-flex justify-center"
            >Update Email</v-card-title
          >
          <v-container>
            <v-row dense>
              <v-col cols="12">
                <v-text-field
                  v-model="localUser.email"
                  outlined
                  label="Email"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <v-card-actions class="justify-center" width="100%">
            <v-btn
              @click="handleUserUpdate('email')"
              color="primary"
              width="100%"
              height="50"
            >
              <v-progress-circular
                v-if="userIsUpdating"
                color="white"
                indeterminate
              >
              </v-progress-circular>
              <span v-else>Update</span>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
    <!-- Username -->
    <div class="d-flex justify-space-between align-center" width="100%">
      <div class="d-flex flex-column">
        <label class="text-subtitle-2 text--secondary">Username</label>
        <p class="body-1 font-weight-medium">{{ user.userName }}</p>
      </div>
    </div>
  </v-card>
</template>
<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Profile",
  data: () => ({
    nameDialog: false,
    emailDialog: false,
    userNameDialog: false,
    localUser: {
      firstName: "",
      lastName: "",
      email: "",
    },
    userIsUpdating: false,
  }),
  computed: {
    ...mapGetters("user", { user: "getUser" }),
    userInitials() {
      if (this.user) {
        const first = this.user.firstName.charAt(0);
        const last = this.user.lastName.charAt(0);

        return `${first}${last}`;
      } else {
        return null;
      }
    },
  },
  methods: {
    ...mapActions("user", ["update"]),
    ...mapActions("auth", ["updateAuthAttributes"]),
    async handleAuthAttrUpdate(attribute) {
      const { firstName, lastName, email } = this.localUser;
      const attributes = {
        email: { email },
        name: { name: `${firstName} ${lastName}` },
      };

      await this.updateAuthAttributes(attributes[attribute]);
    },

    async handleUserUpdate(attribute = "") {
      let payload = {
        id: this.user.id,
        [attribute]: this.localUser[attribute],
      };

      if (attribute === "name") {
        const { firstName, lastName } = this.localUser;
        payload = {
          firstName,
          lastName,
          id: this.user.id,
        };
      }

      this.userIsUpdating = true;

      await this.update(payload);
      await this.handleAuthAttrUpdate(attribute);

      this.userIsUpdating = false;
      this[`${attribute}Dialog`] = false;
    },
  },
};
</script>
<style scoped></style>
