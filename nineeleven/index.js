let process_date = (date) => {
    let hours = NaN;
    let minutes = NaN;
    let seconds = NaN;
    let splt = date.split(':');
    if(splt.length > 0)hours = parseInt(splt[0]);
    if(splt.length > 1)minutes = parseInt(splt[1]);
    if(splt.length > 2)seconds = parseInt(splt[2]);
    return [hours,minutes,seconds];
};

let process_date_sec = (date) => {
    let seconds = 0;
    let splt = date.split(':');
    if(splt.length > 0)seconds += parseInt(splt[0])*60*60;
    if(splt.length > 1)seconds += parseInt(splt[1])*60;
    if(splt.length > 2)seconds += parseInt(splt[2]);
    return seconds;
};

function getTime(offset)
        {
            var d = new Date();
            localTime = d.getTime();
            localOffset = d.getTimezoneOffset() * 60000;

            // obtain UTC time in msec
            utc = localTime + localOffset;
            // create new Date object for different city
            // using supplied offset
            var nd = new Date(utc + (3600000*offset));
            //nd = 3600000 + nd;
            utc = new Date(utc);
            // return time as a string
            return (((utc.getTime())/1000)-1005260400);
        }

document.addEventListener("DOMContentLoaded",()=>{
    let topelement = document.getElementById("secssince");
    fetch("http://furrymaster.bplaced.net/visitorcounternineeleven.php").then((resp)=>{
        resp.text().then((txt)=>{
            document.getElementById("visitorcount").innerHTML = txt+" Visitors";
        })
    });
    let update_element_top = () => {
        let data = [[0,0,0]];
        let now = new Date();
        let resultsA = [];
        let resultsB = [];
        for(let i = 0;i < data.length;i++)
        {
            let ares = [];
            let bres = [];
            var cuda = data[i];
            let tme = 0;
            if(cuda[0] != NaN)
                {
                    ares.push(cuda[0]);
                    tme += cuda[0]*60*60;
                }
            if(cuda[1] != NaN)
                {
                    ares.push(cuda[1]);
                    tme += cuda[1]*60;
                }
            if(cuda[2] != NaN)
                {
                    ares.push(cuda[2]);
                    tme += cuda[2];
                }
            resultsA.push(ares.join(":"));
            resultsB.push(Math.round(getTime()-tme));
        }
        topelement.innerHTML = resultsB.join("-")+"s from now";
        setTimeout(update_element_top,1000);
    };
    update_element_top();
    console.log(document.getElementById("UA175"));
    let elements = document.getElementsByClassName("timelinearticle");
    let plane_data = {};
    let plane_list = [];
    let times = [];
    for(let i = 0;i < elements.length;i++)
    {
        let element = elements[i];

        let starter = element.getAttribute("data-start-flight");
        let ender = element.getAttribute("data-end-flight");

        let time = element.getAttribute("data-time");

        if(starter != null)
        {
            if(!plane_list.includes(starter))
            {
                plane_list.push(starter);
            }
            plane_data[starter] = {"svgelement":undefined,"svgelementend":undefined,"start":process_date_sec(time),"end":0,"time":0};
        }
        if(ender != null)
        {
            plane_data[ender]["end"] = process_date_sec(time);
            plane_data[ender]["time"] = plane_data[ender]["end"] - plane_data[ender]["start"];
        }

        if(time != null)
        {
            let time_element = document.createElement("h1");
            let time_splits = time.split("–");
            let time_val = [];
            for(let i = 0;i < time_splits.length;i++)
            {
                let dte = process_date(time_splits[i]);
                time_val.push(dte);
            }
            time_element.setAttribute("data-time",JSON.stringify(time_val));
            let update_element = () => {
                let data = JSON.parse(time_element.getAttribute("data-time"));
                let now = new Date();
                let resultsA = [];
                let resultsB = [];
                for(let i = 0;i < data.length;i++)
                {
                    let ares = [];
                    let bres = [];
                    var cuda = data[i];
                    let tme = 0;
                    if(cuda[0] != NaN)
                        {
                            ares.push(cuda[0]);
                            tme += cuda[0]*60*60;
                        }
                    if(cuda[1] != NaN)
                        {
                            ares.push(cuda[1]);
                            tme += cuda[1]*60;
                        }
                    if(cuda[2] != NaN)
                        {
                            ares.push(cuda[2]);
                            tme += cuda[2];
                        }
                    resultsA.push(ares.join(":"));
                    resultsB.push(Math.round(getTime()-tme));
                }
                time_element.innerHTML = resultsA.join("-") + "<br>" + resultsB.join("-")+"s from now";
                setTimeout(update_element,1000);
            };
            update_element();
            //time_element.innerHTML = time;
            element.insertBefore(time_element,element.firstChild);
        }
        let edata = element.getBoundingClientRect();
        let element_data = {"TOP":edata.top,"Time":process_date_sec(time)};
        times.push(element_data);
    }
    console.log(plane_data);
    console.log(times);

    for(let i = 0;i < plane_list.length;i++)
    {
        let plane = plane_list[i];
        plane_data[plane]["svgelement"] = document.getElementById(plane);
        plane_data[plane]["svgelementend"] = document.getElementById(plane+"end");
    }

    document.addEventListener("scroll",(ev) => {
        let scroll = window.scrollY;
        let tim = 0;
        for(let i = 0;i < times.length-1;i++)
        {
            let a = times[i];
            let b = times[i+1];
            if(a.TOP <= scroll && b.TOP >= scroll)
            {
                let absscroll = scroll-a.TOP;
                absscroll = absscroll / (b.TOP-a.TOP);
                let bbsscroll = 1 -absscroll;
                let timA = a.Time;
                let timB = b.Time;
                tim = timB * absscroll + timA*bbsscroll;
            }
        }
        tim = Math.round(tim);

        for(let i = 0;i < plane_list.length;i++)
        {
            let plane = plane_list[i];
            let perc = (tim-plane_data[plane]["start"]) / (plane_data[plane]["end"]-plane_data[plane]["start"]);
            //plane_data[plane]["svgelementend"].style.display = perc >= 1 ? "block" : "none";
            perc = Math.min(1,perc);
            perc = Math.max(0,perc);
            perc = perc * 100;
            console.log(plane+" = "+perc);
            plane_data[plane]["svgelement"].style.strokeDashoffset = (100-perc)+"%";
        }

        let hrs = Math.floor((tim / 60 / 60) % 60);
        let mins = Math.floor((tim / 60) % 60);
        let secs = Math.floor(tim % 60);
        document.getElementById("cutime").innerHTML = hrs+":"+mins+":"+secs;
    });
});