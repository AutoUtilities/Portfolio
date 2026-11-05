import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// GitHub Pages project-site base. If your repository is named <username>.github.io, change base to '/'.
export default defineConfig({ plugins: [react()], base: '/Portfolio/' });

