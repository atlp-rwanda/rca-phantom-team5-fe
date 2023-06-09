// vite.config.ts
import { defineConfig } from 'file:///C:/Users/LENOVO/OneDrive/Documents/Andela/rca-phantom-team5-fe/node_modules/vite/dist/node/index.js';
import reactRefresh from 'file:///C:/Users/LENOVO/OneDrive/Documents/Andela/rca-phantom-team5-fe/node_modules/@vitejs/plugin-react-refresh/index.js';
import react from 'file:///C:/Users/LENOVO/OneDrive/Documents/Andela/rca-phantom-team5-fe/node_modules/@vitejs/plugin-react/dist/index.mjs';
import path from 'path';
var __vite_injected_original_dirname = 'C:\\Users\\LENOVO\\OneDrive\\Documents\\Andela\\rca-phantom-team5-fe';
var vite_config_default = defineConfig({
  plugins: [reactRefresh(), react()],
  server: {
    port: 3e3,
  },
  resolve: {
    alias: {
      components: path.resolve(__vite_injected_original_dirname, 'src/components'),
      styles: path.resolve(__vite_injected_original_dirname, 'src/styles'),
      utils: path.resolve(__vite_injected_original_dirname, 'src/utils'),
      screens: path.resolve(__vite_injected_original_dirname, 'src/screens'),
      layouts: path.resolve(__vite_injected_original_dirname, 'src/layouts'),
    },
  },
  build: {
    ignoreWarnings: [
      // list of warning codes to ignore
      2339, // Property 'x' does not exist on type 'y'
      2345, // Argument of type 'x' is not assignable to parameter of type 'y'
      // etc.
    ],
  },
});
export { vite_config_default as default };
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxMRU5PVk9cXFxcT25lRHJpdmVcXFxcRG9jdW1lbnRzXFxcXEFuZGVsYVxcXFxyY2EtcGhhbnRvbS10ZWFtNS1mZVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcTEVOT1ZPXFxcXE9uZURyaXZlXFxcXERvY3VtZW50c1xcXFxBbmRlbGFcXFxccmNhLXBoYW50b20tdGVhbTUtZmVcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL0xFTk9WTy9PbmVEcml2ZS9Eb2N1bWVudHMvQW5kZWxhL3JjYS1waGFudG9tLXRlYW01LWZlL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcclxuaW1wb3J0IHJlYWN0UmVmcmVzaCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdC1yZWZyZXNoJ1xyXG5pbXBvcnQgcmVhY3QgZnJvbSAnQHZpdGVqcy9wbHVnaW4tcmVhY3QnO1xyXG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJ1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcclxuICBwbHVnaW5zOiBbcmVhY3RSZWZyZXNoKCkscmVhY3QoKV0sXHJcbiAgIHNlcnZlcjoge1xyXG4gICAgcG9ydDogMzAwMCxcclxuICB9LFxyXG4gIHJlc29sdmU6IHtcclxuICAgIGFsaWFzOiB7XHJcbiAgICAgICdjb21wb25lbnRzJzogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJ3NyYy9jb21wb25lbnRzJyksXHJcbiAgICAgICdzdHlsZXMnOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnc3JjL3N0eWxlcycpLFxyXG4gICAgICAndXRpbHMnOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnc3JjL3V0aWxzJyksXHJcbiAgICAgICdzY3JlZW5zJzogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJ3NyYy9zY3JlZW5zJyksXHJcbiAgICAgICdsYXlvdXRzJzogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJ3NyYy9sYXlvdXRzJylcclxuICAgIH1cclxuICB9XHJcbn0pXHJcblxyXG5cclxuXHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBMFgsU0FBUyxvQkFBb0I7QUFDdlosT0FBTyxrQkFBa0I7QUFDekIsT0FBTyxXQUFXO0FBQ2xCLE9BQU8sVUFBVTtBQUhqQixJQUFNLG1DQUFtQztBQUt6QyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTLENBQUMsYUFBYSxHQUFFLE1BQU0sQ0FBQztBQUFBLEVBQy9CLFFBQVE7QUFBQSxJQUNQLE1BQU07QUFBQSxFQUNSO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxjQUFjLEtBQUssUUFBUSxrQ0FBVyxnQkFBZ0I7QUFBQSxNQUN0RCxVQUFVLEtBQUssUUFBUSxrQ0FBVyxZQUFZO0FBQUEsTUFDOUMsU0FBUyxLQUFLLFFBQVEsa0NBQVcsV0FBVztBQUFBLE1BQzVDLFdBQVcsS0FBSyxRQUFRLGtDQUFXLGFBQWE7QUFBQSxNQUNoRCxXQUFXLEtBQUssUUFBUSxrQ0FBVyxhQUFhO0FBQUEsSUFDbEQ7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
