<template>
  <div class="flex justify-center items-center min-h-screen bg-gray-100">
    <div class="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
      <h2 class="text-2xl font-bold text-center mb-6">Register</h2>
      <form @submit.prevent="registerUser">
        <!-- Name Input -->
        <div class="mb-4">
          <label for="name" class="block text-sm font-semibold text-gray-700">Name</label>
          <input
              type="text"
              v-model="name"
              id="name"
              placeholder="Enter your name"
              required
              class="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

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
        <div class="mb-4">
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

        <!-- Password Confirmation Input -->
        <div class="mb-6">
          <label for="password_confirmation" class="block text-sm font-semibold text-gray-700">Confirm Password</label>
          <input
              type="password"
              v-model="password_confirmation"
              id="password_confirmation"
              placeholder="Confirm your password"
              required
              class="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <!-- Error Message -->
        <p v-if="errorMessage" class="text-red-500 text-sm mb-4">{{ errorMessage }}</p>

        <!-- Submit Button -->
        <button
            type="submit"
            class="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Register
        </button>
      </form>

      <p class="mt-4 text-center text-sm">
        Already have an account?
        <router-link to="/login" class="text-indigo-600 hover:text-indigo-700 font-semibold">Login</router-link>
      </p>
    </div>
  </div>
</template>
<script>
import axios from '@/services/axios';
import { toast } from 'vue3-toastify';
import { useUserStore } from '@/stores/user';

export default {
  name: 'RegisterPage',

  data() {
    return {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
      errorMessage: "",
    };
  },
  methods: {
    async registerUser() {

        try {
          const response = await axios.post('/register', {
            name: this.name,
            email: this.email,
            password: this.password,
            password_confirmation: this.password_confirmation,
          });
          this.$router.push('/');
          toast.success("Registration was Successful!");
          const userStore = useUserStore();
          const token = response.data.token
          const user  = response.data.user
          userStore.setUserData(token, user);

      } catch (error) {
        this.errorMessage = error.response.data.message;
        toast.error(this.errorMessage);
      }
    }
  },
  mounted() {

  }
};
</script>