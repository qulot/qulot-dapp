<template>
  <div :class="context.classes.element" :data-type="context.type" ref="phoneInput">
    <vue-tel-input
      type="text"
      v-bind="vueTelInputProps"
      v-model="context.model"
      :styleClasses="[context.attributes.class]"
      @blur="context.blurHandler"
    >
      <template #arrow-icon>
        <svg-icon name="arrow-left" class="w-4 h-4 -rotate-90" />
      </template>
    </vue-tel-input>
  </div>
</template>

<script>
export default {
  name: 'PhoneNumberInput',
  props: {
    context: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      vueTelInputProps: {
        mode: 'international',
        inputOptions: {
          placeholder: 'Nhập số điện thoại',
          showDialCode: false,
        },
        dropdownOptions: {
          showDialCodeInList: true,
          showDialCodeInSelection: true,
          showFlags: true,
          showSearchBox: true,
        },
        disabledFormatting: false,
        //To fetch default country based on IP address of user
        autoDefaultCountry: true,
      },
    }
  },
  created() {
    Object.assign(this.vueTelInputProps.inputOptions, {
      ...this.context.attributes,
      styleClasses: ['vti__input text-sm'],
    })
  },
}
</script>
<style>
.vti__input {
  background-color: inherit;
}
.vti__dropdown:hover {
  background-color: initial !important;
}
.vti__dropdown-item {
  white-space: nowrap;
}
/* FIX DROPDOWN ALWAYS FULL WIDTH OF INPUT */
.vue-tel-input {
  position: relative;
  outline: none !important;
  box-shadow: none !important;
  height: 3rem;
  padding-left: 1rem;
  padding-right: 1rem;
  @apply rounded-lg;
}
.vue-tel-input .vti__dropdown {
  position: static;
}
.vue-tel-input .vti__dropdown .vti__dropdown-list {
  overflow-x: auto;
}
.vue-tel-input .vti__dropdown .vti__dropdown-list.below {
  position: absolute;
  left: 0;
  right: 0;
  width: 100% !important;
  box-sizing: content-box;
}
.vti__dropdown-list.below .vti__search_box {
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  margin: 0;
  border: 0;
  border-bottom: 1px solid hsl(var(--bc) / var(--tw-border-opacity));
}

.vti__selection {
  display: flex;
  align-items: center;
  padding-right: 16px;
  border-right: 1px solid #d8d8d8;
}
</style>
