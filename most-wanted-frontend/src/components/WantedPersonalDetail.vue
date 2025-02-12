<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div v-if="person" class="bg-white p-6 rounded-lg shadow-lg max-w-md">
      <img
          v-if="person.image_url"
          :src="person.image_url"
          :alt="person.name"
          class="w-full h-64 object-cover rounded-lg mb-4"
      />

      <h2 class="text-2xl font-bold text-gray-800 mb-4">{{ person.name }}</h2>
      <p class="text-gray-600">{{ person.description }}</p>

      <ul class="mt-4 text-gray-700">
        <li><strong>Hair Color:</strong> {{ person.hair || 'N/A' }}</li>
        <li><strong>Eye Color:</strong> {{ person.eyes || 'N/A' }}</li>
        <li><strong>Race:</strong> {{ person.race || 'N/A' }}</li>
        <li><strong>Nationality:</strong> {{ person.nationality || 'N/A' }}</li>
        <li><strong>Aliases:</strong> {{ person.aliases?.length ? person.aliases.join(', ') : 'None' }}</li>
        <li><strong>Height:</strong> {{ person.height || 'N/A' }}</li>
        <li><strong>Weight:</strong> {{ person.weight || 'N/A' }}</li>
        <li><strong>Alerts:</strong> {{ person.alert || 'N/A' }}</li>
        <li><strong>Caution:</strong> {{ person.caution || 'N/A' }}</li>
        <li><strong>Details:</strong> <span v-html="person.details || 'N/A'"></span></li>
        <li><strong>Subjects:</strong> <span v-html="person.subjects || 'N/A'"></span></li>

      </ul>

      <!-- Additional Information Panel -->
      <div v-if="person.external_links?.length" class="mt-6 p-4 bg-gray-50 rounded-lg shadow-sm">
        <h3 class="text-lg font-semibold text-gray-800">Additional Information</h3>
        <ul class="mt-2 text-blue-600">
          <li v-for="(link, index) in person.external_links" :key="index">
            <a :href="link.url" target="_blank" class="hover:underline">{{ link.label || 'View File' }}</a>
          </li>
        </ul>
      </div>

      <div class="mt-4 flex justify-end">
        <button @click="$router.push('/')" class="bg-red-500 text-white px-4 py-2 rounded">Back</button>
      </div>
    </div>
    <div v-else class="text-gray-600">Loading person details...</div>
  </div>
</template>


<script>
import { computed, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import { useWantedStore } from '@/stores/wanted';

export default {
  name: 'WantedPersonalDetail',

  setup() {
    const route = useRoute();
    const wantedStore = useWantedStore();

    // Ensure wanted persons are fetched when the component mounts
    watchEffect(async () => {
      if (!wantedStore.wantedPersons.length) {
        await wantedStore.searchWantedPersons(); // Ensure the data is fetched
      }
    });

    // Get person details from store (with safe checking)
    const person = computed(() => wantedStore.wantedPersons.find(p => p.uid === route.params.uid) || null);

    return { person };
  },
};
</script>
