import * as migration_20250929_111647 from './20250929_111647';
import * as migration_20260329_183602 from './20260329_183602';
import * as migration_20260330_162927 from './20260330_162927';
import * as migration_20260330_183007 from './20260330_183007';
import * as migration_20260330_183146 from './20260330_183146';
import * as migration_20260330_184056 from './20260330_184056';
import * as migration_20260330_184547 from './20260330_184547';
import * as migration_20260330_191047 from './20260330_191047';

export const migrations = [
  {
    up: migration_20250929_111647.up,
    down: migration_20250929_111647.down,
    name: '20250929_111647',
  },
  {
    up: migration_20260329_183602.up,
    down: migration_20260329_183602.down,
    name: '20260329_183602',
  },
  {
    up: migration_20260330_162927.up,
    down: migration_20260330_162927.down,
    name: '20260330_162927',
  },
  {
    up: migration_20260330_183007.up,
    down: migration_20260330_183007.down,
    name: '20260330_183007',
  },
  {
    up: migration_20260330_183146.up,
    down: migration_20260330_183146.down,
    name: '20260330_183146',
  },
  {
    up: migration_20260330_184056.up,
    down: migration_20260330_184056.down,
    name: '20260330_184056',
  },
  {
    up: migration_20260330_184547.up,
    down: migration_20260330_184547.down,
    name: '20260330_184547',
  },
  {
    up: migration_20260330_191047.up,
    down: migration_20260330_191047.down,
    name: '20260330_191047'
  },
];
