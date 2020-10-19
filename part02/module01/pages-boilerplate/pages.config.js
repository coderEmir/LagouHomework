module.exports = {
  build: {
    src: 'src',
    dist: 'release',
    temp: '.tmp',
    public: 'public',
    paths: {
      styles: 'assets/styles/*.scss',
      scripts: 'assets/scripts/*.js',
      pages: '*.html',
      images: 'assets/images/**',
      fonts: 'assets/fonts/**'
    }
  },
  data: {
    current: "basicPage",
    title: "home",
    menus: [
      {
        name:"111",
        children: "222",
        link: "https://github@seeEmil.com"
      },
      {
        name: "333",
        children: "444",
        link: "https://github@seeEmil.com"
      },
      {
        name: "555",
        children: "666",
        link: "https://github@seeEmil.com"
      }
    ],
    pkg: require('./package.json'),
    date: new Date()
  }
}
