import { defineConfig } from 'vite';
import csp from 'vite-plugin-csp';

export default defineConfig({
  plugins: [
    csp({
      directives: {
        defaultSrc: ["'self'"],
        fontSrc: ["'self'", "https://fonts.gstatic.com"],
        styleSrc: ["'self'", "https://fonts.googleapis.com"],
      }
    })
  ]
});
