export function randomNumEnum<T>(anEnum: T): T[keyof T] {
  console.log('Enum keys: ', Object.keys(anEnum));

  const enumValues = Object.keys(anEnum)
    .map(n => Number.parseInt(n))
    .filter(n => !Number.isNaN(n)) as unknown as T[keyof T][]
  const randomIndex = Math.floor(Math.random() * enumValues.length)
  const randomEnumValue = enumValues[randomIndex];

  console.log('randomEnum() returns: ', randomEnumValue);
  return randomEnumValue;
}

export function randomStringEnum<T>(anEnum: T): T[keyof T] {
  //console.log('Enum keys: ', Object.keys(anEnum));

  const randomIndex = Math.floor(Math.random() * Object.keys(anEnum).length);
  const randomEnumValue = Object.values(anEnum)[randomIndex];

  //console.log('randomEnum() returns: ', randomEnumValue);
  return randomEnumValue;
}

