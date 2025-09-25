import { describe, it, expect } from 'vitest';
import { existsSync } from 'fs';
import { join } from 'path';

describe('Project Structure Validation', () => {
  const projectRoot = process.cwd();

  describe('Essential Configuration Files', () => {
    it('should have package.json', () => {
      expect(existsSync(join(projectRoot, 'package.json'))).toBe(true);
    });

    it('should have next.config.js', () => {
      expect(existsSync(join(projectRoot, 'next.config.js'))).toBe(true);
    });

    it('should have tsconfig.json', () => {
      expect(existsSync(join(projectRoot, 'tsconfig.json'))).toBe(true);
    });

    it('should have tailwind.config.ts', () => {
      expect(existsSync(join(projectRoot, 'tailwind.config.ts'))).toBe(true);
    });

    it('should have eslint.config.js', () => {
      expect(existsSync(join(projectRoot, 'eslint.config.js'))).toBe(true);
    });

    it('should have postcss.config.js', () => {
      expect(existsSync(join(projectRoot, 'postcss.config.js'))).toBe(true);
    });
  });

  describe('Source Directory Structure', () => {
    it('should have src directory', () => {
      expect(existsSync(join(projectRoot, 'src'))).toBe(true);
    });

    it('should have src/app directory', () => {
      expect(existsSync(join(projectRoot, 'src/app'))).toBe(true);
    });

    it('should have src/app/layout.tsx', () => {
      expect(existsSync(join(projectRoot, 'src/app/layout.tsx'))).toBe(true);
    });

    it('should have src/app/page.tsx', () => {
      expect(existsSync(join(projectRoot, 'src/app/page.tsx'))).toBe(true);
    });
  });

  describe('Required Directories for Admin App', () => {
    it('should have components directory', () => {
      expect(existsSync(join(projectRoot, 'src/components'))).toBe(true);
    });

    it('should have lib directory', () => {
      expect(existsSync(join(projectRoot, 'src/lib'))).toBe(true);
    });

    it('should have hooks directory', () => {
      expect(existsSync(join(projectRoot, 'src/hooks'))).toBe(true);
    });

    it('should have types directory', () => {
      expect(existsSync(join(projectRoot, 'src/types'))).toBe(true);
    });
  });

  describe('Package Dependencies', () => {
    it('should have Next.js 14+', async () => {
      const packageJson = await import(join(projectRoot, 'package.json'));
      const nextVersion = packageJson.default.dependencies?.next;
      expect(nextVersion).toBeDefined();
      expect(nextVersion).toMatch(/^14\./);
    });

    it('should have TypeScript', async () => {
      const packageJson = await import(join(projectRoot, 'package.json'));
      const typescriptVersion = packageJson.default.devDependencies?.typescript;
      expect(typescriptVersion).toBeDefined();
    });

    it('should have React 18+', async () => {
      const packageJson = await import(join(projectRoot, 'package.json'));
      const reactVersion = packageJson.default.dependencies?.react;
      expect(reactVersion).toBeDefined();
      expect(reactVersion).toMatch(/^\^18/);
    });
  });
});
