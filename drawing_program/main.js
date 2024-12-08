var $ = window;
let update_hash = () =>
    {
        $.pathStarted = false;
        $.current_tool = window.location.hash.replace("#","");
        document.querySelectorAll(".selected_tool").forEach((elem)=>{
            elem.classList.remove("selected_tool");
        });
        document.querySelector(".toolboxentry a[href='#"+$.current_tool+"']").classList.add("selected_tool");
    }

    let registerMoveElement = (nele) => {
        nele.addEventListener("mousedown",()=>{
            if($.current_tool == "move")
            {
                if($.toMove != nele){
                    let aao = document.querySelector("#auxoverlay");
                if($.isShiftPressed)
                {
                     $.toAux = nele;
                }else{
                $.toMove = nele;
                 aao = document.querySelector("#moveoverlay");
                }
                aao.style.display = "block";
                let neleb = nele.getBoundingClientRect();
                aao.style.left = neleb.x + "px";
                aao.style.top = neleb.y + "px";
                aao.style.width = neleb.width+"px";
                aao.style.height = neleb.height+"px";
                }
            }
        });
    };

document.addEventListener("DOMContentLoaded",()=>{
        $.stroke = "#000";
        $.fill = "none";
        $.lineWidth = document.getElementById("strokenum").value+"px";
        if(document.getElementById("penstrokecheck").checked)
            {
                $.stroke = document.getElementById("penstrokebtn").value;
            }else{
                $.stroke = "none";
            }
        
            if(document.getElementById("penfillcheck").checked)
                {
                    $.fill = document.getElementById("penfillbtn").value;
                }else{
                    $.fill = "none";
                }
        document.getElementById("strokenum").addEventListener("change",()=>{
            $.lineWidth = document.getElementById("strokenum").value+"px";
        });
        document.getElementById("penstrokebtn").addEventListener("change",()=>{
            if(document.getElementById("penstrokecheck").checked)
                {
                    $.stroke = document.getElementById("penstrokebtn").value;
                }else{
                    $.stroke = "none";
                }
        });

        document.getElementById("penstrokecheck").addEventListener("change",()=>{
            if(document.getElementById("penstrokecheck").checked)
            {
                $.stroke = document.getElementById("penstrokebtn").value;
            }else{
                $.stroke = "none";
            }
        });

        document.getElementById("penfillbtn").addEventListener("change",()=>{
            if(document.getElementById("penfillcheck").checked)
                {
                    $.fill = document.getElementById("penfillbtn").value;
                }else{
                    $.fill = "none";
                }
        });

        document.getElementById("penfillcheck").addEventListener("change",()=>{
            if(document.getElementById("penfillcheck").checked)
            {
                $.fill = document.getElementById("penfillbtn").value;
            }else{
                $.fill = "none";
            }
        });

        $.temporary_element = null;
        window.addEventListener("hashchange",()=>{
            update_hash();
        });
        $.mainView = document.getElementById("mainView");
        let update_size = () => {
            let vw = document.getElementById("mainView");
            let cb = vw.getBoundingClientRect();
            vw.setAttribute("width",Math.floor(cb.width));
            vw.setAttribute("height",Math.floor(cb.height));
            $.mainViewcb = cb;
        };
        window.addEventListener("resize",()=>{
            update_size();
        });
        update_size();
        update_hash();

        let createTempPolygon = () => {
            let poly = document.createElementNS("http://www.w3.org/2000/svg", 'path');
            //poly.style.color = "black";
            //poly.setAttribute("color","black");
            document.getElementById("mainView").appendChild(poly);
            poly.style.stroke = $.stroke; //Set stroke colour
            poly.style.fill = $.fill;
            poly.style.strokeWidth = $.lineWidth; //Set stroke width
            poly.style.transform = "translate(0px,0px)";
            poly.transX = 0;
            poly.transY = 0;
            //poly.setAttribute("fill","none");//$.fill);
            //poly.setAttribute("stroke","#FF00FF");//$.stroke);
            return poly;
        };

        $.pathStarted = false;

        document.querySelector("#mainView").addEventListener("mousedown",(ev)=>{
            if($.current_tool == "text")
            {
                let txt = document.createElementNS("http://www.w3.org/2000/svg", 'text');
                let x = ev.clientX-$.mainViewcb.x;
                let y = ev.clientY-$.mainViewcb.y;
                txt.setAttribute("x",x);
                txt.setAttribute("y",y);
                txt.setAttribute("stroke",$.stroke);
                txt.setAttribute("fill",$.fill);
                txt.innerText = prompt("Text");
                registerMoveElement(txt);
                $.mainView.appendChild(txt);
            }
            if($.current_tool == "pen" || $.current_tool == "path"){
            if($.pathStarted == false){
                $.viewMD = true;
                $.origin = {"x":ev.clientX,"y":ev.clientY};
                $.points = [];
                $.temporary_element = createTempPolygon();
                if($.current_tool == "path")
                    {
                        $.points.push([ev.clientX-$.mainViewcb.x,ev.clientY-$.mainViewcb.y]);
                        $.pathStarted = true;
                    }
            }else{
                let x = ev.clientX-$.mainViewcb.x;
                let y = ev.clientY-$.mainViewcb.y;
                if($.points.length > 0)
                {
                    let fp = $.points[0];
                    let difX = Math.abs(fp[0]-x);
                    let difY = Math.abs(fp[1]-y);
                    if(difX < 10 && difY < 10)
                    {
                        $.pathStarted = false;
                        $.points.push([fp[0],fp[1]]);
                        
                    }else{
                        $.points.push([x,y]);
                    }
                }
            }
            if($.current_tool == "path")
                {
                    let pstrl = "";
                    for(let i = 0;i < $.points.length;i++)
                    {
                        pstrl += $.points[i].join(",")+" ";
                    }
                    $.temporary_element.setAttribute("d","M "+$.points[0].join(",")+" L "+pstrl);
                    if(!$.pathStarted)
                    {
                        let nele = $.temporary_element.cloneNode(); 
                        nele.transX = 0;
                nele.transY = 0;                  
                        $.mainView.appendChild(nele);
                        registerMoveElement(nele);
                        $.temporary_element.remove();
                    }
                }
            }
        });
        document.querySelector("#mainView").addEventListener("mouseup",()=>{
            $.viewMD = false;
            if($.current_tool == "pen"){
                let nele = $.temporary_element.cloneNode();    
                nele.transX = 0;
                nele.transY = 0;        
                $.mainView.appendChild(nele);
                registerMoveElement(nele);
                $.temporary_element.remove();
            }
        });
        document.querySelector("#mainView").addEventListener("mousemove",(ev)=>{
            if($.viewMD)
            {
                if($.current_tool == "pen")
                {
                    let p = $.points;
                    $.points.push([ev.clientX-$.mainViewcb.x,ev.clientY-$.mainViewcb.y]);
                    let pstrl = "";
                    for(let i = 0;i < $.points.length;i++)
                    {
                        pstrl += $.points[i].join(",")+" ";
                    }
                    $.temporary_element.setAttribute("d","M "+$.points[1].join(",")+" L "+pstrl);
                }
            }
        });



        let mover = document.getElementById("moveoverlay");
        $.moverEntered = null;

        mover.addEventListener("mousedown",(ev)=>{
            console.log(ev);
            let cli = mover.getBoundingClientRect();
            $.moverEntered = [parseFloat(mover.style.left.replace("px",""))-ev.clientX,parseFloat(mover.style.top.replace("px",""))-ev.clientY,cli.x,cli.y,parseFloat($.toMove.transX)-ev.clientX,parseFloat($.toMove.transY)-ev.clientY];
        });
        mover.addEventListener("mousemove",(ev)=>{
            if($.moverEntered != null){
                console.log($.moverEntered);
                mover.style.left = $.moverEntered[0]+ev.clientX+"px";
                mover.style.top = $.moverEntered[1]+ev.clientY+"px";
                $.toMove.transX = $.moverEntered[4]+ev.clientX;
                $.toMove.transY = $.moverEntered[5]+ev.clientY;
                $.toMove.style.transform = "translate("+$.toMove.transX+"px,"+$.toMove.transY+"px)";
            }
        });
        mover.addEventListener("mouseup",()=>{
            $.moverEntered = null;
        });
        mover.addEventListener("dblclick",()=>{
            $.toMove = null;
            mover.style.display = "none";
        });

        let auxer = document.getElementById("auxoverlay");
        auxer.addEventListener("dblclick",()=>{
            auxer.style.display = "none";
            $.toAux = null;
        });

        $.isShiftPressed = false;
        document.addEventListener("keydown",(event)=>{
            if(event.key == "Delete")
            {
                if($.toMove != null)
                {
                    $.toMove.remove();
                    $.toMove = null;
                }
            }else
            if(event.key == "a")
            {
                let adata = $.toMove.getAttribute("d");
                let bdata = $.toAux.getAttribute("d");
                console.log(adata);
                console.log(bdata);
                mover.style.display = "none";
                auxer.style.display = "none";
                $.toMove.setAttribute("d",adata+translateSVG(bdata,
                    $.toMove.transX - $.toAux.transX,
                    $.toMove.transY - $.toAux.transY
                ));
                $.toAux.remove();
                $.toMove = null;
                $.toAux = null;
                
            }else{
            if (event.shiftKey)$.isShiftPressed = true;
            }
        });
        document.addEventListener("keyup",(event)=>{
            if (event.key == "Shift")$.isShiftPressed = false;
            
        });
});

