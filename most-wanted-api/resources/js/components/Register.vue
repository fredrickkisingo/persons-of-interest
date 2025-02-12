<template>
    <div>
        <h2>Register</h2>
        <form @submit.prevent="registerUser">
            <input type="text" v-model="name" placeholder="Name" required />
            <input type="email" v-model="email" placeholder="Email" required />
            <input type="password" v-model="password" placeholder="Password" required />
            <input type="password" v-model="password_confirmation" placeholder="Confirm Password" required />
            <button type="submit">Register</button>
        </form>
        <p v-if="errorMessage">{{ errorMessage }}</p>
    </div>
</template>

<script>
import axios from "axios";

export default {
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
                const apiUrl = process.env.MIX_API_URL;

                const response = await axios.post(
                    `${apiUrl}/api/register`,
                    {
                        name: this.name,
                        email: this.email,
                        password: this.password,
                        password_confirmation: this.password_confirmation,
                    }
                );
                this.$router.push("/login"); // Redirect after successful registration
            } catch (error) {
                this.errorMessage = error.response.data.message;
            }
        },
    },
};
</script>
