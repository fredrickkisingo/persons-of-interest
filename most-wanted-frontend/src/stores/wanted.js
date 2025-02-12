import { defineStore } from 'pinia';
import axios from '@/services/axios';

export const useWantedStore = defineStore('wanted', {
    state: () => ({
        wantedPersons: [],
        loading: false,
        page: 1,
        perPage: 10,
        hasMore: true,
        searchParams: {
            name: '',
            keywords: '',
            subjects: '',
            countries: '',
            nationalities: '',
            genders: '',
            ages: '',
            height: '',
            weight: '',
            hair_colors: '',
            eye_color: '',
            race: '',
            occupations: '',
            aliases: '',
            uid: '',
        },
    }),

    actions: {
        async fetchWantedPersons() {
            if (this.loading || !this.hasMore) return;

            this.loading = true; // Set loading state to true to prevent duplicate fetches

            try {
                const response = await axios.get('wanted-lists', {
                    params: {
                        page: this.page,
                        perPage: this.perPage,
                        ...this.searchParams,
                    },
                });

                if (response.data.status === 'success') {
                    this.wantedPersons.push(...response.data.data);
                    this.page++;
                    this.hasMore = response.data.data.length > 0;
                }
            } catch (error) {
                console.error('Error fetching wanted persons:', error);
            } finally {
                this.loading = false;
            }
        },

        async searchWantedPersons(params) {
            this.searchParams = { ...params };  // Replace object instead of merging

            this.page = 1;
            this.wantedPersons = [];
            this.hasMore = true;
            await this.fetchWantedPersons();
        },
    },
});