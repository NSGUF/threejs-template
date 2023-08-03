import { VNode } from 'vue';

declare global {
  // eslint-disable-next-line no-unused-vars
  namespace JSX {
    // eslint-disable-next-line no-unused-vars
    interface Element extends VNode {}
  }
}
