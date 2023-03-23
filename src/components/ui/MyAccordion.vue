<script lang="tsx">
export default {
  data() {
    return {
      isActive: false
    }
  },
  name: 'my-accordion',
  methods: {
    toggleAccordion() {
      this.isActive = !this.isActive
    }
  }
}
</script>

<template>
  <div class="accordion">
    <div class="accordion-header" @click="toggleAccordion">
      <slot name="header"></slot>
      <span class="icon" :class="{ 'is-active': isActive }">
        <i class="fas fa-angle-down"></i>
      </span>
    </div>
    <div class="accordion-body" :style="{ maxHeight: isActive ? '1000px' : '0px' }">
      <slot name="body"></slot>
    </div>
  </div>
</template>

<style>
.accordion {
  @apply border-solid border border-teal-800 rounded-3xl mb-3;
}

.accordion-header {
  transition: 0.5s ease;
  @apply p-3 cursor-pointer flex justify-between items-center rounded-3xl outline outline-teal-500;
}
.accordion-header:hover {
  @apply bg-teal-500;
  outline-offset: 3px;
}

.accordion-header .icon {
  transition: transform 0.2s ease-in-out;
  transform: rotate(0deg);
}

.accordion-header .icon.is-active {
  transform: rotate(180deg);
}

.accordion-body {
  overflow-y: scroll;

  transition: max-height 0.3s ease-in-out;
}
</style>
