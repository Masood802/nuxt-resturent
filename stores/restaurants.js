import { defineStore } from "pinia";
import axios from "axios";
export const useMainStore = defineStore('mainstore', {
    state: () => ({
        results: [],
        isloading: false,
        city: '',
        selectedtype: '',
        selected:{},
        types: ['Restaurants', 'Hospitals', 'Banks', 'Shpping Malls'],
        cities:
            [
                {
                    id: 1,
                    name: 'Rahimyarkhan',
                    coordinates: '28.417606,70.303651'
                },
                {
                    id: 2,
                    name: 'Lahore',
                    coordinates: '31.582045,74.329376'
                },
                {
                    id: 3,
                    name: 'karachi',
                    coordinates: '24.860966,66.990501'
                },
                {
                    id: 4,
                    name: 'Islamabad',
                    coordinates: '33.738045,73.084488'
                },
                {
                    id: 5,
                    name: 'Rawalpindi',
                    coordinates: '33.5914236,73.0535122'
                },
            ],
    }),
    getters: {},
    actions: {
        async searchRestaurants() {
            this.isloading = true;
            axios.post('http://localhost:8080/status',
                { coordinate: this.city, type: this.selectedtype }).then((resp) => {
                    this.isloading = false
                     this.results = resp.data;
                    localStorage.setItem('data', JSON.stringify(this.results));
                    console.log(this.results)
                }).catch((e) => {
                    console.error('error Massage:', e)
                })
        },
        getdetails(id) {
            let router = useRouter();
            this.selected = JSON.parse(localStorage.getItem('data')).find((item) => item.id === id);
            console.log('selected', this.selected)
            router.push('/itemdetail')
                      }
    },
    
})