import axios from 'axios'
import { cacheAdapterEnhancer } from 'axios-extensions';

const http = axios.create({
	baseURL: 'https://pokeapi.co/api/v2/',
	//headers: { 'Cache-Control': 'no-cache' },
	// cache will be enabled by default
	adapter: cacheAdapterEnhancer(axios.defaults.adapter)
});

export default{
    async getPokemon(id)
    {
        return http.get("/pokemon/"+id)
    },
    async searchPokemon(searchTerm){
        return http.get("/pokemon/"+searchTerm)
    }
}