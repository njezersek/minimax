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

    console.warn("resrt");
  }

  posodobi(){
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
      }, 1);
      document.getElementById('zmaga').innerHTML = sporocilo;
      document.getElementById('steveci').innerHTML = "<div><label>X: </label>"+stevecZmagX+"</div><div><label>Izenačeno: </label>"+stevecIzenaceno+"</div><div><label>O: </label>"+stevecZmagO+"</div>";
    }


    //izrisi mrezo
    for(let j=0; j<this.igra.h; j++){
      for(let i=0; i<this.igra.w; i++){
        document.getElementById("c"+i+"x"+j).className = this.igra.data[j][i];
        let bgimg = "url('media/"+igra.naPotezi+"-light.png')";
        if(disabledClass != "")bgimg = "";
        if(igra.poglej(i,j) != " ")bgimg = "";
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
}
