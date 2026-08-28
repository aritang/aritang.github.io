import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // `npm start` serves the built app with `vite preview`, which is what the
  // Railway deployment runs. Two settings are required there and harmless
  // locally:
  //   host: true          bind 0.0.0.0, or the container is unreachable from
  //                       outside even though the process is running
  //   allowedHosts        Vite rejects requests whose Host header it does not
  //                       recognise (DNS-rebinding protection). Railway serves
  //                       on *.up.railway.app, so without this every request
  //                       gets a blank page and a "Blocked request" console
  //                       error, which looks like a build failure and is not.
  // A leading dot allows the domain and its subdomains. Add your own domain
  // here too if you attach one in Railway.
  preview: {
    host: true,
    allowedHosts: ['.up.railway.app', '.railway.app'],
  },
})
