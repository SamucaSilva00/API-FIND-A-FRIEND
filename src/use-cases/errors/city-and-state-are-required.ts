export class CityAndStateAreRequiredError extends Error {
  constructor() {
    super('City and state are required')
  }
}
