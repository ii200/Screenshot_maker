"use strict";

var express = require('express');
var app 	= express();
var http 	= require('http').Server(app);

var io = require('socket.io')(http);

io.on('connection', function(socket)
{
    console.log(`Connect :${socket.id}`);

    socket.on( 'make_screenshot', () =>
    {
        getPic();
    });	
    //
    //socket.emit( 'backup_file_list', files);
});


//
var out_data = 
[
    "ABB_Transport_06.mp4",
    "tr_DCTractSub_loop.mp4",
    "tr_AC_autotransformer_loop.mp4",
    "tr_AC_substation_loop.mp4",
    "tr_bus_trolleybus_loop.mp4",
    "tr_DC_loop.mp4",
    "TR_cmd_loop.mp4",
    "tr_DC_recuperation_loop.mp4",
    "tr_MetroSub_loop.mp4",
    "tr_evcharging_loop.mp4",
    "tr_tunnels_cycle.mp4",
    "tr_Tunnels_Protection_loop.mp4",
    "tr_control_fm__loop.mp4",
    "tr_control_fm__loop_f.mp4",
    "tr_tunnels_css_loop.mp4",
    "tr_tunnels_substation_loop.mp4",
    "tr_passangerstation_cycle.mp4",
    "tr_passangerstation_command_loop.mp4",
    "tr_passangerstation_electric_loop.mp4",
    "tr_passangerstation_epr_loop.mp4",
    "tr_passangerstation_smartbldg_cycle.mp4"
]	
//

const puppeteer = require('puppeteer');

var vd_inc = 0;

async function getPic() {

    let path_in     = "file:///D:/%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%B0/actual_projects/!!!!transport/!wysiwyg%20transport/video_thumbnail_scrapper.html";
    let vd_id       = out_data[vd_inc];

    if(vd_id)
    {
        path_in             += "#"+vd_id;
        let thumbnail_id    = "screenshots/"+vd_id.replace(".mp4",".png")
        //
        const browser = await puppeteer.launch({
            args: ["--no-sandbox"],
            headless: false,
            executablePath: "C:/Program Files (x86)/Google/Chrome/Application/chrome" // <-- chrome path here
        });
        const page = await browser.newPage();
        await page.goto(path_in);
        await page.setViewport({width: 1920, height: 1080})
        await page.waitForTimeout(1000);
        await page.screenshot({path: thumbnail_id});
      
        await browser.close();
        await page.waitForTimeout(300);
        //call himself
        {
            await vd_inc ++;
            await getPic();
        }
    }
    else
    {
        console.log("*******THE END******");
    }
}

http.listen(54124, function()
{
    console.log("listening on *.54124");
});

//first step 
setTimeout(() => { 

    getPic();

}, 2000);
