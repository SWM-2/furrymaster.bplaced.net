let translateSVG = (d,x,y) => {
    let splits = d.split(" ");
    let result = "";
    for(let i = 0;i < splits.length;i++)
    {
        let splt = splits[i];
        if(splt != "")
        {
            if(splt.split(",").length > 1)
            {
                let a = parseFloat(splt.split(",")[0].replace(" ",""));
                let b = parseFloat(splt.split(",")[1].replace(" ",""));
                result += ((a+x)+","+(b+y))+" ";
            }else{
                result += splt + " ";
            }
        }
    }
    return result;
};