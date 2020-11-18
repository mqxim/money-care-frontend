export default class Currency {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly code: string,
    public readonly usdRate: number
  ) {
  }
}
