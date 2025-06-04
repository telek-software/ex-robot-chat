import react from '@vitejs/plugin-react-swc'
import path from 'path'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '~components': path.resolve(__dirname, 'src/components'),
      '~containers': path.resolve(__dirname, 'src/containers'),
      '~contexts': path.resolve(__dirname, 'src/contexts'),
      '~hooks': path.resolve(__dirname, 'src/hooks'),
      '~lib': path.resolve(__dirname, 'src/lib'),
      '~modules': path.resolve(__dirname, 'src/modules'),
      '~utils': path.resolve(__dirname, 'src/utils'),
    },
  },
})
