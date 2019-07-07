<template>
  <div class="home">
    <info></info>
  </div>
</template>

<script>
// @ is an alias to /src
import info from '@/components/PokemonInfo.vue'

export default {
  name: 'home',
  components: {
    info
  }
}
</script>
