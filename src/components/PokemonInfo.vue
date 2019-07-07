<template>
  <div id="info" class="container">
    <div class="row justify-content-center align-items-center">
      <div class="col-md-2">
        <label>Search :</label>
      </div>
      <div class="col-md-4">
        <input
          v-model="searchTerm"
          type="text"
          class="form-control"
          placeholder="pokedex # or name"
          v-on:input="autoSearch"
        />
      </div>
    </div>
    <br />
    <div class="row justify-content-center">
      <div class="col-md-6">
        <table class="table">
          <thead>
            <tr>
              <th scope="col" class="pokeid">#</th>
              <th scope="col" class="pokeimg"></th>
              <th scope="col" class="pokename">Name</th>
              <th scope="col" class="pokecaught">Caught</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="pokemon in pokemons" :key="pokemon.id" class="pokerow align-items-center">
              <th class="align-middle" scope="row">{{pokemon.id}}</th>
              <td class="align-middle">
                <img :src="pokemon.sprites.front_default" height="96px" width="96px" />
              </td>
              <td class="align-middle">{{pokemon.species.name.capitalize()}}</td>
              <td class="align-middle">
                <input class="form-check-input" type="checkbox" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="row align-items-center justify-content-center">
      <div class="col-sm-2">
        <button
          class="btn btn-block btn-primary"
          v-if="offset > 1"
          v-on:click="getPreviousPokemons"
        >&lt Previous</button>
      </div>
      <div class="col-sm-2">{{offset}} - {{offset+paging-1}}</div>
      <div class="col-sm-2">
        <button
          class="btn btn-block btn-primary"
          v-if="offset < (807-paging)"
          v-on:click="getNextPokemons"
        >Next &gt</button>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../api";
import _ from "lodash";
export default {
  name: "info",
  data() {
    return {
      pokemons: [],
      caughtPokemons: [],
      paging: 5,
      offset: 1,
      searchTerm: ""
    };
  },
  async mounted() {
    var pokemons = await this.getPokemons({
      offset: this.offset,
      paging: this.paging
    });
    this.pokemons = pokemons;
    this.cacheNextPokemons();
  },
  methods: {
    async getNextPokemons() {
      this.offset += this.paging;
      var pokemons = await this.getPokemons({
        offset: this.offset,
        paging: this.paging
      });
      this.pokemons = pokemons;
      this.cacheNextPokemons();
    },
    async getPreviousPokemons() {
      this.offset -= this.paging;
      var pokemons = await this.getPokemons({
        offset: this.offset,
        paging: this.paging
      });
      this.pokemons = pokemons;
      this.cachePreviousPokemons();
    },
    async getPokemons(range) {
      var pokemons = [];
      for (let id = range.offset; id < range.offset + range.paging; id++) {
        if (id >= 1 && id <= 807) {
          const data = await api.getPokemon(id);
          const pokemon = data.data;
          pokemons.push(pokemon);
        }
      }
      return pokemons;
    },
    async cacheNextPokemons() {
      var offset = this.offset + this.paging;
      this.getPokemons({ offset: offset, paging: this.paging });
    },
    async cachePreviousPokemons() {
      var offset = this.offset - this.paging;
      this.getPokemons({ offset: offset, paging: this.paging });
    },
    autoSearch: _.debounce(function() {
      this.searchPokemon();
    }, 800),
    async searchPokemon() {
      try {
        var result = await api.searchPokemon(this.searchTerm);
        this.offset = (parseInt((result.data.id -1) / this.paging) * this.paging) + 1;

        var pokemons = await this.getPokemons({
          offset: this.offset,
          paging: this.paging
        });
        this.pokemons = pokemons;
        this.cacheNextPokemons();
        this.cachePreviousPokemons()
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>
<style>
.pokerow {
  line-height: 120px;
  min-height: 120px;
  height: 120px;
}
.pokeimg {
  width: 120px;
}
.pokeid {
  width: 50px;
}
.pokename {
  width: 200px;
}
.nav-button {
  width: 120px;
}
#info {
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>

