import { SetMetadata } from '@nestjs/common';

export const IS_ASSETS_PATH = 'isAssetsPath';
export const AssetsPath = (path: string) => SetMetadata(IS_ASSETS_PATH, path);
