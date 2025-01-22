import type { PackageConfig } from '~/types/packages'

// Vite's import.meta.glob for dynamic imports
const modules = import.meta.glob('./*.ts', { eager: true })

// Create a record of locale to package config
const packages: Record<string, PackageConfig> = {}

// Process each module
Object.entries(modules).forEach(([path, module]) => {
  // Skip the index file itself
  if (path === './index.ts') return
  
  // Extract locale from filename (e.g., './bg.ts' -> 'bg')
  const locale = path.replace(/^\.\/(.+)\.ts$/, '$1')
  
  // Add the package config to our record
  packages[locale] = (module as any).default
})

export default packages 