<template>
  <div class="barcodei2of5" :class="className" :style="style">{{ barcodeSequence }}</div>
</template>

<script>
import { generateBarcodeSequence } from "@allansli/barcode-febraban-core";

export default {
  name: "BarcodeFebraban",

  props: {
    /**
     * Numeric barcode sequence (must have an even number of digits).
     */
    sequence: {
      type: [String, Number],
      default: ""
    },
    /**
     * Additional CSS class names applied to the wrapper element.
     */
    className: {
      type: String,
      default: ""
    },
    /**
     * Inline styles applied to the wrapper element.
     */
    style: {
      type: Object,
      default: null
    }
  },

  computed: {
    barcodeSequence() {
      var seq = this.sequence !== undefined && this.sequence !== null
        ? String(this.sequence)
        : "";
      var isValid = seq.length > 0 && !isNaN(Number(seq));
      return isValid ? generateBarcodeSequence(seq) : "";
    }
  }
};
</script>
