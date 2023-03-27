<template>
  <div :class="computedCardClasses">
    <div v-if="cardBody" :class="computedBodyClasses">
      <!-- Card Title -->
      <h2 v-if="cardTitle" class="card-title">{{ title }}</h2>

      <!-- Card Body -->
      <slot />

      <!-- Card Action -->
      <div v-if="cardAction" :class="computedActionClasses">
        <slot name="actions" />
      </div>
    </div>
    <div v-else>
      <!-- Card Body No Body -->
      <slot />
    </div>
  </div>
</template>
<script>
import isEmpty from "lodash.isempty";
export default {
  props: {
    cardBorder: {
      type: Boolean,
      require: false,
      default: true,
    },
    cardShadow: {
      type: Boolean,
      require: false,
      default: true,
    },
    cardBody: {
      type: Boolean,
      require: false,
      default: true,
    },
    cardTitle: {
      type: Boolean,
      require: false,
      default: true,
    },
    title: {
      type: String,
      require: false,
    },
    cardAction: {
      type: Boolean,
      require: false,
      default: true,
    },
    actionClass: {
      type: String,
      require: false,
    },
  },
  computed: {
    computedCardClasses() {
      const classes = ["card"];

      if (this.cardBorder) {
        classes.push("border");
      }

      if (this.cardShadow) {
        classes.push("shadow-sm");
      }

      return classes;
    },
    computedBodyClasses() {
      const classes = ["card-body"];

      if (!this.cardBody) {
        classes.push("p-0");
      }

      return classes;
    },
    computedActionClasses() {
      const classes = ["card-actions"];
      if (!isEmpty(this.actionClass)) {
        classes.push(this.actionClass);
      }

      return classes;
    },
  },
};
</script>