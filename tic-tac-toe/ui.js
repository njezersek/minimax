class Ui{
  constructor(el, igra){
    this.parent = el;
    this.igra = igra;

    let html = "";
    html += "<table>";
    for(let j=0; j<this.igra.h; j++){
      html += "<tr>";
      for(let i=0; i<this.igra.w; i++){
        html += "<td>";
        html += "<div onclick='postavi("+i+","+j+")' id='c"+i+"x"+j+"'>"+"</div>";
        html += "</td>";
      }
      html += "</tr>";
    }
    this.parent.innerHTML = html;
  }

  posodobi(){
    for(let j=0; j<this.igra.h; j++){
      for(let i=0; i<this.igra.w; i++){
        document.getElementById("c"+i+"x"+j).className = this.igra.data[j][i];
      }
    }
  }
}
