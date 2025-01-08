<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
  onCreate: (payload: { todo: string }) => Promise<void>;
}>();

const todo = ref<string>('');
const isLoading = ref<boolean>(false);

const onSubmit = async () => {
  isLoading.value = true;
  await props.onCreate({ todo: todo.value });
  todo.value = '';
  isLoading.value = false;
}
</script>

<template>
  <v-form
    class="create-task-form"
    @submit.prevent="onSubmit"
  >
    <v-textarea
      v-model="todo"
      rows="1"
      label="TODO"
      variant="outlined"
      density="compact"
      :disabled="isLoading"
    />
    <v-btn
      :disabled="!todo || isLoading"
      :loading="isLoading"
      type="submit"
    >
      Add
    </v-btn>
  </v-form>
</template>

<style lang="scss">
.create-task-form {
  display: flex;
  gap: 1rem;
}
</style>
