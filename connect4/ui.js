class Ui{
  constructor(container, igra){
    this.igra = igra;
    this.igraAnimaicja = igra.copy();
    this.animiraniZetoni = [];

    this.size;
    this.padding;

    this.selected = -1;
    this.onemogoceno = true;

    this.container = container;
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");

    //pobrisi vsebino containerja
    while (this.container.firstChild) {
        this.container.removeChild(this.container.firstChild);
    }

    this.container.appendChild(this.canvas);

    //add event listeners
    window.addEventListener("resize", e=>this.resizeHandler(e));
    this.canvas.addEventListener("mousedown", e=>this.onmousedownHandler(e));
    this.canvas.addEventListener("mouseup", e=>this.onmouseupHandler(e));
    window.addEventListener("mousemove", e=>this.onmousemoveHandler(e));

    this.resizeHandler();

    this.update();
  }

  render(){
    let w = this.canvas.width;
    let h = this.canvas.height;
    let rows = this.igra.h;
    let columns = this.igra.w;
    let size = this.size;
    let padding = this.padding;
    let igra = this.igra;
    let selected = this.selected;
    let onemogoceno = this.onemogoceno;

    this.ctx.clearRect(0,0,w,h); //pocisti

    //animirani zetoni
    for(let i=0; i<this.animiraniZetoni.length; i++){
      let zeton = this.animiraniZetoni[i];
      this.ctx.beginPath();
      this.ctx.arc(zeton.x*size+size/2, zeton.y*size+size/2, size/2-padding/2, 0, 2 * Math.PI, false); // polja
      if(zeton.igralec == "X"){
        this.ctx.fillStyle = '#f00';
      }
      else if(zeton.igralec == "O"){
        this.ctx.fillStyle = '#ff0';
      }
      this.ctx.fill();
    }

    //izris mreze in zetonov
    for(var x=0; x<columns; x++){
      for(var y=0; y<rows; y++){
        //mreza
        this.ctx.fillStyle = "#24a";
        this.ctx.beginPath();
        this.ctx.arc(Math.round(x*size+size/2), Math.round(y*size+size/2), Math.round(size/2-padding/2), 0, 2 * Math.PI, false);
        this.ctx.rect(Math.ceil(x*size+size), Math.floor(y*size), Math.floor(-size), Math.ceil(size));
        this.ctx.fill();

        //zeton
        this.ctx.beginPath();
        this.ctx.arc(x*size+size/2, y*size+size/2, size/2-padding/2, 0, 2 * Math.PI, false); // polja
        if(igra.poglej(x,y) == "X"){
          this.ctx.fillStyle = '#f00';
          this.ctx.fill();
        }
        else if(igra.poglej(x,y) == "O"){
          this.ctx.fillStyle = '#ff0';
          this.ctx.fill();
        }
        this.ctx.lineWidth = padding/3;
        this.ctx.strokeStyle = '#139';
        this.ctx.stroke();
      }
    }

    //izbran stolpec
    if(selected > -1 && !onemogoceno && !this.igraAnimaicja.koncana && this.igraAnimaicja.visinaStolpca(selected)>=0){
      this.ctx.fillStyle = "rgba(0, 0, 55, 0.5)";
      this.ctx.fillRect(selected*size,0,size, rows*size);
    }
  }

  resizeHandler(e){
    this.canvas.height = this.container.offsetHeight;
    this.canvas.width = this.container.offsetWidth;

    if(this.canvas.height*this.igra.w < this.canvas.width*this.igra.h){
      this.size = this.canvas.height/this.igra.h;
    }
    else{
      this.size = this.canvas.width/this.igra.w;
    }
    this.padding = this.size / 5;

    this.canvas.height = this.igra.h*this.size;
    this.canvas.width = this.igra.w*this.size;

    this.render();
  }

  onmousedownHandler(e){
    var viewportOffset = this.canvas.getBoundingClientRect();
    var top = viewportOffset.top;
    var left = viewportOffset.left;
    this.onmousedown(e.clientX-left, e.clientY-top);
  }

  onmouseupHandler(e){
    var viewportOffset = this.canvas.getBoundingClientRect();
    var top = viewportOffset.top;
    var left = viewportOffset.left;
    this.onmouseup(e.clientX-left, e.clientY-top);
  }

  onmousemoveHandler(e){
    var viewportOffset = this.canvas.getBoundingClientRect();
    var top = viewportOffset.top;
    var left = viewportOffset.left;
    this.onmousemove(e.clientX-left, e.clientY-top);
  }

  onmousedown(x,y){

  }

  onmouseup(xMouse,yMouse){
    if(this.onemogoceno)return;
    if(this.selected<0 || this.selected>this.igra.w)return;
    let x = this.selected;
    let y = this.igraAnimaicja.visinaStolpca(x);
    postavi(x,y)
  }

  onmousemove(x,y){
    this.selected = Math.floor(x/this.size);
    if(x<0 || x>this.canvas.width || y<0 || y>this.canvas.height)this.selected=-1;
    this.render();
  }

  spustZetona(x,y){
    let zeton = {
      x: x,
      y: -1,
      xDest: x,
      yDest: y,
      hitrost: 0,
      igralec: this.igraAnimaicja.naPotezi
    }
    //če ne moreš postaviti žetone ne predvajal animacije
    if(!this.igraAnimaicja.postavi(x,y))return false;
    this.animiraniZetoni.push(zeton);
    return true;
  }

  update(){
    for(let i=0; i<this.animiraniZetoni.length; i++){
      let zeton = this.animiraniZetoni[i];
      zeton.hitrost += 0.01;
      zeton.y += zeton.hitrost;
      if(zeton.y > zeton.yDest){
        igra.postavi(zeton.xDest, zeton.yDest);
        this.animiraniZetoni.splice(i,1);
        i--;
      }
    }

    this.render();

    window.requestAnimationFrame(()=>this.update());
  }

  //nastavitve
  static settings(){
    document.getElementById('game').style.display = "none";
    document.getElementById('settings').style.display = "block";

    if(igralec1 == "clovek"){
      document.getElementById('igralec1-globina-container').style.display = "none";
      document.getElementById('igralec1-nacin-clovek').className = "option selected";
      document.getElementById('igralec1-nacin-algoritem').className = "option";
    }
    else{
      document.getElementById('igralec1-globina-container').style.display = "block";
      document.getElementById('igralec1-nacin-clovek').className = "option";
      document.getElementById('igralec1-nacin-algoritem').className = "option selected";
    }

    if(igralec2 == "clovek"){
      document.getElementById('igralec2-globina-container').style.display = "none";
      document.getElementById('igralec2-nacin-clovek').className = "option selected";
      document.getElementById('igralec2-nacin-algoritem').className = "option";
    }
    else{
      document.getElementById('igralec2-globina-container').style.display = "block";
      document.getElementById('igralec2-nacin-clovek').className = "option";
      document.getElementById('igralec2-nacin-algoritem').className = "option selected";
    }

    document.getElementById('igralec1-globina').value = globina1;
    document.getElementById('igralec1-globina-vrednost').innerHTML = globina1;
    document.getElementById('igralec2-globina').value = globina2;
    document.getElementById('igralec2-globina-vrednost').innerHTML = globina2;

    document.getElementById('zakasnitev').value = zakasnitev;
    document.getElementById('zakasnitev-vrednost').innerHTML = zakasnitev;

    if(zamenjaniSimboli){
      document.getElementById('simbol-container').style.flexDirection = "row-reverse";
    }
    else{
      document.getElementById('simbol-container').style.flexDirection = "row";
    }

    if(zacne == 1){
      document.getElementById('zacne-igralec1').className = "option selected";
      document.getElementById('zacne-igralec2').className = "option";
    }
    else{
      document.getElementById('zacne-igralec1').className = "option";
      document.getElementById('zacne-igralec2').className = "option selected";
    }

  }

  static closeSettings(){
    document.getElementById('game').style.display = "flex";
    document.getElementById('settings').style.display = "none";
    stevciReset();
    setup();
  }

  static nastaviZacne(igralec){
    zacne = igralec;
    this.settings();
  }

  static zamenjajSimbole(){
    if(zamenjaniSimboli){
      zamenjaniSimboli = false;
    }
    else{
      zamenjaniSimboli = true;
    }
    this.settings();
  }

  static nastaviNacin(igralec, nacin){
    if(igralec == 1){
      igralec1 = nacin;
    }
    else{
      igralec2 = nacin;
    }
    this.settings();
  }

  static nastaviGlobino(){
    globina1 = document.getElementById('igralec1-globina').value;
    globina2 = document.getElementById('igralec2-globina').value;
    this.settings();
  }

  static nastaviZakasnitev(){
    zakasnitev = document.getElementById('zakasnitev').value;
    this.settings();
  }
}
