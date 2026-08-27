<template>
  <div class="barcodei2of5">{{ barcodeSequence }}</div>
</template>

<script>
import { generateBarcodeSequence } from "@allansli/barcode-febraban-core";

export default {
  name: "BarcodeFebraban",

  inheritAttrs: true,

  props: {
    /**
     * Even-length digit string. Extra attrs (class, style) fall through to the root.
     */
    sequence: {
      type: String,
      default: ""
    }
  },

  computed: {
    barcodeSequence() {
      return generateBarcodeSequence(this.sequence == null ? "" : this.sequence);
    }
  }
};
</script>
