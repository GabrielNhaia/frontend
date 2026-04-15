<template>
  <q-input
    v-bind="$attrs"
    :model-value="modelValue"
    :label="label"
    :type="type"
    :rules="rules"
    outlined
    dense
    lazy-rules
    @update:model-value="$emit('update:modelValue', $event)"
  >
    <template v-if="icon" #prepend>
      <q-icon :name="icon" />
    </template>
    <slot />
  </q-input>
</template>

<script setup>
defineOptions({ inheritAttrs: false })

defineProps({
  modelValue: { type: [String, null], default: null },
  label: { type: String, required: true },
  type: { type: String, default: 'text' },
  icon: { type: String, default: undefined },
  rules: { type: Array, default: () => [] },
})

defineEmits(['update:modelValue'])
</script>
