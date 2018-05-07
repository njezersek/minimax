class Ui{
  constructor(el, igra){
    this.parent = el;
    this.igra = igra;

    let html = "";
    html += "<div class='table-container'>";
    html += "<div class='overlay' id='overlay' style='display: none'>";
    html += "<div id='zmaga' class='info'></div>";
    html += "</div>";
    html += "<table id='table'>";
    for(let j=0; j<this.igra.h; j++){
      html += "<tr>";
      for(let i=0; i<this.igra.w; i++){
        html += "<td>";
        html += "<div onclick='postavi("+i+","+j+")' id='c"+i+"x"+j+"' ></div>";
        html += "</td>";
      }
      html += "</tr>";
    }
    html += "</table>";
    html += "</div>";
    html += "<div id='steveci' class='stevci'></div>";
    this.parent.innerHTML = html;
    this.posodobi();

    //resize
    window.addEventListener("resize", this.resize);
    this.resize();
  }

  posodobi(onemogoceno){
    let sporocilo = "";
    let disabledClass = "";
    if(igra.koncana){
      if(igra.zmagovalec == " ")sporocilo = "Izenačeno!"
      else sporocilo = igra.zmagovalec + " zmaga!";
      sporocilo += "<br><div onclick='setup()' class='button'>Nova igra</div>";
      disabledClass = "disabled";
      document.getElementById('overlay').style.display = "flex";
      setTimeout(function(){
        document.getElementById('overlay').style.opacity = "1";
      }, 10);
      document.getElementById('zmaga').innerHTML = sporocilo;
    }

    document.getElementById('steveci').innerHTML = "<div><label>X: </label>"+stevecZmagX+"</div><div><label>Izenačeno: </label>"+stevecIzenaceno+"</div><div><label>O: </label>"+stevecZmagO+"</div>";

    //izrisi mrezo
    for(let j=0; j<this.igra.h; j++){
      for(let i=0; i<this.igra.w; i++){
        document.getElementById("c"+i+"x"+j).className = this.igra.data[j][i];
        let bgimg = "url('media/"+igra.naPotezi+"-light.png')";
        if(disabledClass != "")bgimg = "";
        if(igra.poglej(i,j) != " ")bgimg = "";
        if(onemogoceno)bgimg = "";

        if(bgimg != "" && this.igra.data[j][i] == " "){
          document.getElementById("c"+i+"x"+j).className = "enabled";
        }
        document.getElementById("c"+i+"x"+j).style.backgroundImage = bgimg;
      }
    }

  }

  resize(){
    let table = document.getElementById('table');
    let overlay = document.getElementById('overlay');
    let w = table.offsetWidth;
    let h = table.offsetHeight;
    overlay.style.width = w+"px";
    overlay.style.height = h+"px"

    overlay.style.marginLeft = window.getComputedStyle(table)["margin-left"];
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
    document.getElementById('game').style.display = "block";
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
