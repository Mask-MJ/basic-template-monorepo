/* eslint-disable no-restricted-imports */
import type { RouteMeta as IRouteMeta } from '@admin-core/typings';

import 'vue-router';

declare module 'vue-router' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface RouteMeta extends IRouteMeta {}
}
