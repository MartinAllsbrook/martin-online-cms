import * as migration_20250929_111647 from './20250929_111647';
import * as migration_20260329_183602 from './20260329_183602';
import * as migration_20260330_162927 from './20260330_162927';

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
    name: '20260330_162927'
  },
];
