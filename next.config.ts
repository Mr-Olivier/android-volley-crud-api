// // next.config.ts
// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   output: "standalone",
//   compress: true,
//   poweredByHeader: false,

//   typescript: {
//     ignoreBuildErrors: true,
//   },

//   eslint: {
//     ignoreDuringBuilds: true,
//   },

//   // ADD THIS SECTION - Allow 4GB uploads
//   experimental: {
//     serverActions: {
//       bodySizeLimit: "5gb",
//     },
//   },

//   images: {
//     domains: ["localhost", "89.117.55.79", "hotpluss.com"],
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "images.unsplash.com",
//         port: "",
//         pathname: "/**",
//       },
//       {
//         protocol: "https",
//         hostname: "source.unsplash.com",
//         port: "",
//         pathname: "/**",
//       },
//       {
//         protocol: "https",
//         hostname: "res.cloudinary.com",
//         port: "",
//         pathname: "/**",
//       },
//       {
//         protocol: "https",
//         hostname: "hotpluss.com",
//         port: "",
//         pathname: "/**",
//       },
//       {
//         protocol: "http",
//         hostname: "localhost",
//         port: "3000",
//         pathname: "/**",
//       },
//       {
//         protocol: "http",
//         hostname: "89.117.55.79",
//         port: "",
//         pathname: "/**",
//       },
//     ],
//     unoptimized: false,
//     deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
//     imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
//     formats: ["image/webp"],
//     minimumCacheTTL: 60,
//     dangerouslyAllowSVG: true,
//     contentDispositionType: "attachment",
//     contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
//   },

//   reactStrictMode: true,

//   env: {
//     NEXT_PUBLIC_APP_NAME: "FilmStudio",
//     NEXT_PUBLIC_APP_URL:
//       process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
//   },

//   async headers() {
//     return [
//       {
//         source: "/:path*",
//         headers: [
//           {
//             key: "X-Frame-Options",
//             value: "DENY",
//           },
//           {
//             key: "X-Content-Type-Options",
//             value: "nosniff",
//           },
//           {
//             key: "X-XSS-Protection",
//             value: "1; mode=block",
//           },
//         ],
//       },
//       {
//         source: "/api/:path*",
//         headers: [
//           {
//             key: "Access-Control-Allow-Origin",
//             value: "*",
//           },
//           {
//             key: "Access-Control-Allow-Methods",
//             value: "GET, POST, PUT, DELETE, OPTIONS",
//           },
//           {
//             key: "Access-Control-Allow-Headers",
//             value: "Content-Type, Authorization",
//           },
//         ],
//       },
//     ];
//   },

//   async redirects() {
//     return [];
//   },

//   async rewrites() {
//     return [];
//   },
// };

// export default nextConfig;

// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  compress: true,
  poweredByHeader: false,

  typescript: {
    ignoreBuildErrors: true,
  },

  eslint: {
    ignoreDuringBuilds: true,
  },

  // ✅ CRITICAL: This enables large request bodies
  experimental: {
    serverActions: {
      bodySizeLimit: "5gb",
    },
  },

  images: {
    domains: ["localhost", "89.117.55.79", "hotpluss.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "source.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "hotpluss.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "89.117.55.79",
        port: "",
        pathname: "/**",
      },
    ],
    unoptimized: false,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ["image/webp"],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  reactStrictMode: true,

  env: {
    NEXT_PUBLIC_APP_NAME: "FilmStudio",
    NEXT_PUBLIC_APP_URL:
      process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
        ],
      },
      {
        source: "/api/:path*",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "*",
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, POST, PUT, DELETE, OPTIONS",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "Content-Type, Authorization",
          },
        ],
      },
    ];
  },

  async redirects() {
    return [];
  },

  async rewrites() {
    return [];
  },
};

export default nextConfig;
