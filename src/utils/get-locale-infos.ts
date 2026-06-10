import cep from 'cep-promise'

export interface LocaleInfos {
  cep: string
  state: string
  city: string
  neighborhood: string
  street: string
}

export async function getLocaleInfos(zipcode: string,): Promise<LocaleInfos | null> {
  const normalizedZipcode = zipcode.replace(/\D/g, '')

  if (normalizedZipcode.length !== 8) {
    return null
  }

  try {
    const localeInfos = await cep(normalizedZipcode)

    return {
      cep: localeInfos.cep,
      state: localeInfos.state,
      city: localeInfos.city,
      neighborhood: localeInfos.neighborhood,
      street: localeInfos.street,
    }
  } catch {
    return null
  }
}