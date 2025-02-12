<template>
  <div class="flex justify-center items-center min-h-screen bg-gray-100">
    <div class="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
      <h2 class="text-2xl font-bold text-center mb-6">Login</h2>
      <form @submit.prevent="loginUser">
        <!-- Email Input -->
        <div class="mb-4">
          <label for="email" class="block text-sm font-semibold text-gray-700">Email</label>
          <input
              type="email"
              v-model="email"
              id="email"
              placeholder="Enter your email"
              required
              class="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <!-- Password Input -->
        <div class="mb-6">
          <label for="password" class="block text-sm font-semibold text-gray-700">Password</label>
          <input
              type="password"
              v-model="password"
              id="password"
              placeholder="Enter your password"
              required
              class="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <p v-if="errorMessage" class="text-red-500 text-sm mb-4">{{ errorMessage }}</p>

        <button
            type="submit"
            class="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Login
        </button>
      </form>

      <p class="mt-4 text-center text-sm">
        Don't have an account?
        <router-link to="/register" class="text-indigo-600 hover:text-indigo-700 font-semibold">
          Register
        </router-link>
      </p>
    </div>
  </div>
</template>

<script>
import axios from '@/services/axios';
import {useUserStore} from "@/stores/user";
import { toast } from 'vue3-toastify';

export default {
  name: 'LoginPage',

  data() {
    return {
      email: '',
      password: '',
      errorMessage: '',
    };
  },

  methods: {
    async loginUser() {

      try {
        const response = await axios.post(
            '/login',
            {
              email: this.email,
              password: this.password,
            }
        );

        const userStore = useUserStore();
        const token = response.data.token
        const user  = response.data.user
        userStore.setUserData(token, user);
        this.$router.push('/')
        toast.success("Registration was Successful!");

      } catch (error) {

        toast.error(error);

        this.errorMessage = 'Invalid credentials, please try again.';
      }
    },
  },
};
</script>

<style scoped>
/* You can add your custom styles here */
</style>
