import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  redirects: async () => [
    {
      source: "/confirmar-presenca-cerimonia",
      destination: "https://forms.gle/7vmgyVS4QRziirDy7",
      permanent: true,
    },
     {
      source: "/comemoracao",
      destination: "https://forms.gle/VwBT7ExR2YzY6NTK7",
      permanent: true,
    },
    {
      source: "/comemoração",
      destination: "https://forms.gle/VwBT7ExR2YzY6NTK7",
      permanent: true,
    },
  ],
};

export default nextConfig;
