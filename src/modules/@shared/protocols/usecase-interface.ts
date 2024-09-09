export interface UseCaseInterface<I, O> {
  handle(input: I): Promise<O>;
}
