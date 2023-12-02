import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  build: {
    rollupOptions: {
      output: {
        // 他の設定...
        // _redirectsファイルを公開ディレクトリにコピー
        assetFileNames: assetInfo => {
          if (assetInfo.name === '_redirects') return assetInfo.name;
          return 'assets/[name]-[hash][extname]';
        }
      }
    }
  }
});
