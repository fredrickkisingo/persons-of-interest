<template>
  <div class="min-h-screen bg-gray-100 py-8">
    <!-- Logout Button -->
    <div class="flex justify-end mb-4">
      <button
          @click="logout"
          class="px-4 py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
      >
        Logout
      </button>
    </div>

    <div class="container mx-auto px-4">
      <h2 class="text-3xl font-bold text-center mb-8 text-gray-800">Wanted Persons</h2>

      <!-- Search Form -->
      <div class="mb-8 bg-white p-6 rounded-lg shadow-lg  w-2/3 mx-auto">
        <h3 class="text-2xl font-bold text-center mb-6 text-gray-800">Search Wanted Persons</h3>


        <form @submit.prevent="search" class="flex flex-col items-center">
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <!-- Name Input -->
            <div>
              <label for="name" class="block text-sm font-semibold text-gray-700">Name</label>
              <input
                  type="text"
                  v-model="searchParams.name"
                  id="name"
                  placeholder="Enter name"
                  class="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <!-- Keywords Input -->
            <div>
              <label for="keywords" class="block text-sm font-semibold text-gray-700">Keywords</label>
              <input
                  type="text"
                  v-model="searchParams.keywords"
                  id="keywords"
                  placeholder="Enter keywords"
                  class="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <!-- Subjects Input -->
            <div>
              <label for="subjects" class="block text-sm font-semibold text-gray-700">Subjects</label>
              <input
                  type="text"
                  v-model="searchParams.subjects"
                  id="subjects"
                  placeholder="Enter subjects"
                  class="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>


            <!-- Hair Color Dropdown -->
            <div>
              <label for="hair" class="block text-sm font-semibold text-gray-700">Hair Color</label>
              <select
                  v-model="searchParams.hair_color"
                  id="hair"
                  class="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">Select hair color</option>
                <option value="black">Black</option>
                <option value="brown">Brown</option>
                <option value="blonde">Blonde</option>
                <option value="red">Red</option>
                <option value="gray">Gray</option>
                <option value="bald">Bald</option>
              </select>
            </div>

            <!-- Eye Color Dropdown -->
            <div>
              <label for="eyes" class="block text-sm font-semibold text-gray-700">Eye Color</label>
              <select
                  v-model="searchParams.eyes"
                  id="eyes"
                  class="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">Select eye color</option>
                <option value="brown">Brown</option>
                <option value="blue">Blue</option>
                <option value="green">Green</option>
                <option value="hazel">Hazel</option>
                <option value="gray">Gray</option>
              </select>
            </div>

            <!-- Race Input -->
            <div>
              <label for="race" class="block text-sm font-semibold text-gray-700">Race</label>
              <input
                  type="text"
                  v-model="searchParams.race"
                  id="race"
                  placeholder="Enter race"
                  class="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <!-- Nationality Input -->
            <div>
              <label for="nationality" class="block text-sm font-semibold text-gray-700">Nationality</label>
              <input
                  type="text"
                  v-model="searchParams.nationality"
                  id="nationality"
                  placeholder="Enter nationality"
                  class="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <!-- Occupations Input -->
            <div>
              <label for="occupations" class="block text-sm font-semibold text-gray-700">Occupation</label>
              <input
                  type="text"
                  v-model="searchParams.occupations"
                  id="occupations"
                  placeholder="Enter occupation"
                  class="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <!-- Aliases Input -->
            <div>
              <label for="aliases" class="block text-sm font-semibold text-gray-700">Aliases</label>
              <input
                  type="text"
                  v-model="searchParams.aliases"
                  id="aliases"
                  placeholder="Enter aliases"
                  class="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>

          <div class="mt-6 w-full flex justify-center gap-4">
            <button
                type="button"
                @click="resetSearch"
                class="py-2 px-4 bg-gray-400 text-white font-semibold rounded-md hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Reset
            </button>

            <button
                type="submit"
                class="py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Search
            </button>
          </div>
        </form>
      </div>

      <!-- List of Wanted Persons -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <!-- Card for Each Wanted Person -->
        <div
            v-for="person in wantedStore.wantedPersons"
            :key="person.name"
            @click="fetchPersonDetails(person.uid)"
            class="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-transform transform hover:scale-105 duration-300 cursor-pointer"

        >
          <!-- Person Image -->
          <img
              :src="person.thumbnail || avatarPlaceholder"
              :alt="person.name"
              class="w-full h-48 object-cover"
          />

          <!-- Person Details -->
          <div class="p-4">
            <h3 class="text-xl font-semibold text-gray-800 mb-2">{{ person.name }}</h3>
            <p class="text-sm text-gray-600">{{ person.description }}</p>
          </div>
        </div>
      </div>

      <!-- Loading Indicator -->
      <div v-if="wantedStore.loading" class="text-center mt-8">
        <div class="inline-flex items-center">
          <svg
              class="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-800"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
          >
            <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
            ></circle>
            <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <span class="text-gray-800">Loading...</span>
        </div>
      </div>

      <!-- No More Data Message -->
      <div v-if="!wantedStore.hasMore" class="text-center mt-8">
        <p class="text-gray-600">No more data to load.</p>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, onUnmounted,ref } from 'vue';
import { useWantedStore } from '@/stores/wanted';
import { useRouter } from 'vue-router';
import avatarPlaceholder from '@/assets/avatar.png'; // Import the local placeholder image
import { useUserStore } from '@/stores/user'; // Adjust based on your auth store
import { toast } from 'vue3-toastify';

export default {
  name: 'WantedPersonsPage',

  setup() {
    const wantedStore = useWantedStore();
    const router = useRouter();
    const userStore = useUserStore();

    const searchParams = ref({
      name: '',
      keywords: '',
      subjects: '',
      hair_color: '',
      eyes: '',
      race: '',
      nationality: '',
      occupations: '',
      aliases: '',
      uid:'',
    });


    const search = async () => {

      console.log(searchParams)
      await wantedStore.searchWantedPersons(searchParams.value);
    };
    const logout = async () => {
       userStore.logout();
      await router.push({ name: 'login' });
    };

    // Function to handle scroll events
    const handleScroll = () => {
      const bottomOfWindow =
          document.documentElement.scrollTop + window.innerHeight >=
          document.documentElement.offsetHeight - 100; // Load data 100px before reaching the bottom

      if (bottomOfWindow && !wantedStore.loading && wantedStore.hasMore) {
        wantedStore.fetchWantedPersons();
      }
    };

    const resetSearch = async () => {
      searchParams.value = {
        name: '',
        keywords: '',
        subjects: '',
        hair_color: '',
        eyes: '',
        race: '',
        nationality: '',
        occupations: '',
        aliases: '',
        uid: '',
      };

      wantedStore.wantedPersons = [];
      wantedStore.page = 1;
      wantedStore.hasMore = true;
      await wantedStore.searchWantedPersons(searchParams.value);

    };



    const fetchPersonDetails = async (uid) => {
      try {

        // Find the specific person by UID in the current wantedPersons list
        const selectedPersonDetail = wantedStore.wantedPersons.find(person => person.uid === uid);

        if (selectedPersonDetail) {
          wantedStore.selectedPerson = { ...selectedPersonDetail };

          await router.push({ name: 'WantedPersonDetail', params: { uid } });

        } else {
          toast.error('Person not found');

        }

      } catch (error) {
        console.error('Error fetching details:', error);
      }
    };

    // Add scroll event listener when the component is mounted
    onMounted(() => {
      window.addEventListener('scroll', handleScroll);
      // Fetch the first page of data when the component is mounted
      wantedStore.fetchWantedPersons();
    });

    // Remove scroll event listener when the component is unmounted
    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll);
    });

    return {
      wantedStore,
      avatarPlaceholder,
      searchParams,
      search,
      handleScroll,
      fetchPersonDetails,
      logout,
      resetSearch
    };
  },
};
</script>

