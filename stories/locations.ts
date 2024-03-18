import {defineStore} from "pinia";
import axios, {AxiosResponse} from "axios";

export const useLocationStore = defineStore("locations", {
    state: () => {
        return {
            locations: [],
        };
    },
    actions: {
        async getLocations() {
            const config: RuntimeConfig = useRuntimeConfig();
            const objSend = {
                method: 'GET',
                url: config.public.baseURL + 'locations',
                headers: {
                    "Content-Type": "application/json",
                },
                timeout: 100000,
            };

            try {
                const response: AxiosResponse = await axios(objSend);
                this.locations = response.data;
            } catch (error) {
                console.error('Error fetching movies:', error);
            }
        },
    },
});