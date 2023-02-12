<template>
  <input
    type="text"
    class="form-control"
    placeholder="할일을 입력해주세요."
    :value="inputValue"
    @keyup.enter="handleAddItem"
  />
</template>
<script lang="ts">
export default {
  name: "TodoInput",
};
</script>
<script lang="ts" setup>
import { ref, defineEmits } from "vue";

const inputValue = ref("");
const emit = defineEmits(["update:todo"]);

const handleAddItem = (event: Event) => {
  const value = (event.target as HTMLInputElement).value;
  if (!value) return;
  inputValue.value = value;
  emit("update:todo", {
    id: 1,
    title: value,
    status: "active",
  });
  inputValue.value = "";
};
</script>
