// next.config.js
module.exports = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/dashboard",
        permanent: true, // أو false إذا كنت تريد إعادة توجيه مؤقتة
      },
    ];
  },
};
