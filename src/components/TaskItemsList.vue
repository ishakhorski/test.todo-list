<script setup lang="ts">
import type { TaskItems } from '@/types/task-item';

const props = withDefaults(
  defineProps<{
  items: TaskItems;
  loading?: boolean;
}>(),
  {
    loading: false,
  }
)
</script>

<template>
  <ul class="tasks-list">
    <v-progress-linear
      v-if="props.loading"
      absolute
      indeterminate
    />
    <li
      v-for="item in props.items"
      :key="item.id"
      class="tasks-list__item"
    >
      <slot v-bind="{ item }" />
    </li>
  </ul>
</template>

<style lan="scss">
.tasks-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  list-style: none;
}
</style>
