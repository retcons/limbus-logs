/** @type {import('next').NextConfig} */
const nextConfig = {
  /* Static export
   * This is so it can be hosted as html with js and css
   * As opposed to requiring a server
   */
  output: 'export',
  images: { unoptimized: true },
};

module.exports = nextConfig;
