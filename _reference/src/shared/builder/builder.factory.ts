import { Builder } from './builder';

export interface BuilderFactory<TTarget> {
  create(): Builder<TTarget>;
}
