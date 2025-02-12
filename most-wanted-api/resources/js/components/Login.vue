<template>
    <div>
        <h2>Login</h2>
        <form @submit.prevent="loginUser">
            <input type="email" v-model="email" placeholder="Email" required />
            <input type="password" v-model="password" placeholder="Password" required />
            <button type="submit">Login</button>
        </form>
        <p v-if="errorMessage">{{ errorMessage }}</p>
    </div>
</template>

<script>
import axios from "axios";

export default {
    data() {
        return {
            email: "",
            password: "",
            errorMessage: "",
        };
    },
    methods: {
        async loginUser() {
            const apiUrl = process.env.MIX_API_URL;

            try {
                const response = await axios.post(
                    `${apiUrl}/api/login`,
                    {
                        email: this.email,
                        password: this.password,
                    }
                );
                toastr.success("Login successful!");
                localStorage.setItem("user_token", response.data.token); // Store token
            } catch (error) {
                toastr.error("Invalid credentials,Please try again.");
                this.errorMessage = "Invalid credentials, please try again.";
            }
        },
    },
};
</script>
