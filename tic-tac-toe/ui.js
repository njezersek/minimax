class Ui{
  constructor(el, igra){
    this.parent = el;
    this.igra = igra;

    let html = "";
    html += "<div class='table-container'>"
    html += "<table>";
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
    html += "<div id='zmaga' class='info'></div>";
    this.parent.innerHTML = html;

    this.posodobi();
  }

  posodobi(){
    let sporocilo = igra.ovrednoti();
    if(sporocilo != " ")sporocilo += " zmaga!";
    if(igra.prostaPolja() == 0)sporocilo = "Izenačeno!"
    if(sporocilo != " ")sporocilo += "<br><div onclick='setup()' class='button'>Nova igra</div>"
    document.getElementById('zmaga').innerHTML = sporocilo;
    for(let j=0; j<this.igra.h; j++){
      for(let i=0; i<this.igra.w; i++){
        document.getElementById("c"+i+"x"+j).className = this.igra.data[j][i];
        let bgimg = "url('media/"+igra.naPotezi+"-light.png')";
        if(igra.poglej(i,j) != " ")bgimg = "";
        document.getElementById("c"+i+"x"+j).style.backgroundImage = bgimg;
      }
    }
  }
}
