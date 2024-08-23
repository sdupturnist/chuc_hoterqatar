/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
   poweredByHeader: false,
  images: {
      domains: [
        //'admin.upturnist.com',
        'localhost',
        'admin.chuchoterqatar.com',
        'chuchoterqatar.com',
        'greenenergyfarm.in',
      ], 
    },
 
    
    
};

export default nextConfig;
