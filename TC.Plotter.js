//============================================================
// Register Namespace
//------------------------------------------------------------
var TC = TC||{};
TC.Plotter = TC.Plotter||{};

//============================================================
// Static Variables
//------------------------------------------------------------
TC.Plotter.Points = [
    {x:80.001, y:80.001},
    {x:80.005, y:80.003},
    {x:80.008, y:80.002},
    {x:80.008, y:80.005},
];
TC.Plotter.$Svg = $('#plot');

TC.Plotter.Draw = function TC_Plotter_Draw(){
    TC.Plotter.Clear();
    var
        points = TC.Plotter.ReducedPoints();
    var
        xMin = points[0].x,
        xMax = points[0].x,
        yMin = points[0].y,
        yMax = points[0].y;

    for(var i = 1; i < points.length; i++){
        var point = points[i];
        xMin = Math.min(xMin, point.x);
        xMax = Math.max(xMax, point.x);
        yMin = Math.min(yMin, point.y);
        yMax = Math.max(yMax, point.y);
    }

    var
        p1 = null,
        p2 = points[0];
    for(var i = 1; i < points.length; i++){
        p1 = p2;
        p2 = points[i];
        TC.Plotter.DrawLine(p1,p2);
    }

xMin-=10;
yMin-=10;
xMax+=10;
yMax+=10;

    // Show just area that has details
    TC.Plotter.$Svg.get(0).setAttribute("viewBox", xMin+" "+yMin+" "+xMax+" "+yMax);
    console.log("viewBox: "+xMin+" "+yMin+" "+xMax+" "+yMax);
}

TC.Plotter.DrawLine = function TC_Plotter_DrawLine(p1, p2){
    var line = document.createElementNS('http://www.w3.org/2000/svg','line');
    line.setAttribute('x1',p1.x);
    line.setAttribute('y1',p1.y);
    line.setAttribute('x2',p2.x);
    line.setAttribute('y2',p2.y);
    TC.Plotter.$Svg.append(line);
}

TC.Plotter.ReducedPoints = function TC_Plotter_ReducedPoints(){
    return [
        {x:0, y:0},
        {x:10, y:5},
        {x:15, y:1},
        {x:22, y:-3},
        {x:20, y:-7},
    ];
}

TC.Plotter.Clear = function TC_Plotter_Clear(){
    var svg = TC.Plotter.$Svg.get(0);
    while (svg.firstChild) {
        svg.removeChild(svg.firstChild);
    }
}

TC.Plotter.Draw();
