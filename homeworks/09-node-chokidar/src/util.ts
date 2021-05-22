export type Brand<K, T> = K & { __brand: T }

export type CancellationFunction = () => void

export const delay = (ms: number): Promise<void> => new Promise(resolve => setTimeout(resolve, ms))
