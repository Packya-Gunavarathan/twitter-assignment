class UiRoutes {

  constructor(app) {
      this.app = app;
  }

  init(){
    const app = this.app;

    app.get('/',(req,res)=> {
      res.redirect('/explore')
    })

    app.get('/explore',(req,res)=> {

      res.render('landing-page',{ title: 'Twitter'})
    })

  }
}

module.exports = UiRoutes;
