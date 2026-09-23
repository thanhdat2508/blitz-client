import { useState } from 'react'
import { storage } from '@/utils/storage'

/**
 * Hook quản lý state đồng bộ với localStorage
 */
export function useLocalStorage<T>(key: string, initialValue: T): [T, (val: T | ((prev: T) => T)) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    return storage.get<T>(key, initialValue)
  })

  const setValue = (val: T | ((prev: T) => T)) => {
    try {
      const valueToStore = val instanceof Function ? val(storedValue) : val
      setStoredValue(valueToStore)
      storage.set<T>(key, valueToStore)
    } catch (error) {
      console.error(error)
    }
  }

  return [storedValue, setValue]
}
