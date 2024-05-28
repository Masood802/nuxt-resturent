import { defineStore } from "pinia";
import axios from "axios";
export const useMainStore = defineStore('mainstore', {
    state: () => ({
        results: [],
        isloading: false,
        city: '',
        selectedtype: '',
        coordinates:'',
        selected: {},
        location: '',
        radius:0,
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
                { coordinate: this.coordinates, type: this.selectedtype,radius:this.radius}).then((resp) => {
                    this.isloading = false
                    this.results = resp.data;
                    localStorage.setItem('data', JSON.stringify(this.results));
                    console.log(this.results);
                    console.log('radius', this.radius);
                    console.log('coord', this.coordinates);
                }).catch((e) => {
                    console.error('error Massage:', e)
                })
        },
        getdetails(id) {
            let router = useRouter();
            this.selected = JSON.parse(localStorage.getItem('data')).find((item) => item.id === id);
            console.log('selected', this.selected)
            router.push('/itemdetail')
        },
        getlocation() {
            navigator.geolocation.getCurrentPosition(
                position => {
                    this.coordinates = `${position.coords.latitude},${position.coords.longitude}`;
                    console.log('position', position)
                },
                error => {
                    console.log('Error getting location');
                })
            setTimeout(() => {
                this.getStreetAddress();
            }, 2000);
               
        },
        getStreetAddress() {
            const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=
        ${this.coordinates}&key=AIzaSyC4800J442xrkb5zUzGSEHA5GHHnMmccgc`
            axios.get(url)
                .then(response => {
                    if (response.data.error_massage) {
                        console.log(response.data.error_massage);
                    }
                    else {
                        console.log('coords', this.coordinates)
                        this.location = response.data.results[1].formatted_address;
                    }
                }).catch(error => {
                    console.log(error.message);
                });
        },
        calculatedistance(lat1, lon1, lat2, lon2) {
            var R = 6371; // Radius of the earth in km
            var dLat = deg2rad(lat2 - lat1);  // deg2rad below
            var dLon = deg2rad(lon2 - lon1);
            var a =
                Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
                Math.sin(dLon / 2) * Math.sin(dLon / 2);
            var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            var d = R * c; // Distance in km
            return d;
        },
        deg2rad(deg) {
            return deg * (Math.PI / 180)
        },
    }
})