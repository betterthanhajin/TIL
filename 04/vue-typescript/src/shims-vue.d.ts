/* eslint-disable */
declare module '*.vue' {
  import Vue from 'vue'
  import vuePropertyDecorator from 'vue-property-decorator'
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
  export default Vue
  export default vuePropertyDecorator
}
