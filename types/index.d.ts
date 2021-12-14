export type urlExistsDeep = (
  uri: string,
  header?: object,
  method?: string,
  timeout?: number,
  pool?: object,
  prevStatus?: number
) => Promise<boolean | URL>;
