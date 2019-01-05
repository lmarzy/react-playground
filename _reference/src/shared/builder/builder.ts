export class Builder<TResult> {
  constructor(private result: TResult) {}

  select<TObjectToConfigure>(configFunction: ((target: TResult) => TObjectToConfigure)): Builder<TObjectToConfigure> {
    const mutatedResult = configFunction(this.result);
    return new Builder<TObjectToConfigure>(mutatedResult);
  }

  build = (): TResult => this.result;
}
