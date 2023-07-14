import axios from 'axios'

export class Search {

    history = ['Madrid','Barcelona', 'Quilmes', 'Buenos Aires', 'Corea del Norte']

    constructor(){}

    async city(place = ''){

        try {
            // http request
            // console.log('city', place);
            const resp = await axios.get('https://reqres.in/api/users?page=2')
            console.log(resp.data.per_page);
            return[];
        } catch (error){
            return [];
        }
    } 
}