import type { App, Plugin, DefineComponent } from "vue";

export interface BarcodeFebrabanProps {
  sequence?: string;
}

export declare const BarcodeFebraban: DefineComponent<BarcodeFebrabanProps>;

export declare const BarcodeFebrabanPlugin: Plugin & {
  install(app: App): void;
};

declare const plugin: typeof BarcodeFebrabanPlugin;
export default plugin;
