<template>
  <div>
    <base-input
      v-model="model"
      label="Primer Nombre"
      placeholder="un placeholder nuevo"
    />
    <h4>{{ model }}</h4>
    <p>{{ title }}</p>
    <ul>
      <li v-for="todo in todos" :key="todo.id" @click="increment">
        {{ todo.id }} - {{ todo.content }}
      </li>
    </ul>
    <p>Count: {{ todoCount }} / {{ meta.totalCount }}</p>
    <p>Active: {{ active ? 'yes' : 'no' }}</p>
    <p>Clicks on todos: {{ clickCount }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { Todo, Meta } from './models'

interface Props {
  title: string;
  todos?: Todo[];
  meta: Meta;
  active: boolean;
}
const model = ref(null)
const props = withDefaults(defineProps<Props>(), {
  todos: () => []
})

const clickCount = ref(0)
function increment () {
  clickCount.value += 1
  return clickCount.value
}

const todoCount = computed(() => props.todos.length)

</script>
