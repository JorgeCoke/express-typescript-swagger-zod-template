declare namespace NodeJS {
  // Disable accessing process.env
  interface ProcessEnv extends Record<string, undefined> {}
}
