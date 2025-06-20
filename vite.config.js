import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [tailwindcss(), react()],
  // ...other config
  preview: {
    host: true,
    port: 5173, // or whatever port you're using
    allowedHosts: ["instaclone-nd04.onrender.com"],
  },
});
