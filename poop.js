$(document).ready(function(){

    var btnClear = $($('#controls button')[0]);
    var btnStart = $($('#controls button')[1]);
    var btnStop = $($('#controls button')[2]);
    var placeholder = $('#data-placeholder');
    var dom = $("#readout ol");
    var interval = $('#interval');
    var indicator = $('.collecting');

    var collection = [];
    var timerId;

    btnClear.click(function(){
        if(collection.length === 0){
            return;
        }
        var isCleared = confirm("Are you sure you want to clear your data?");
        if(!isCleared){
            return;
        }
        placeholder.text("No data has been collected.");
        collection = [];
        dom.empty();
    });

    btnStart.click(function(){
        var intervalVal = Number(interval.val()) * 1000;
        if(intervalVal <= 0){
            alert("Invalid interval! Enter a number greater than 0");
            return;
        }

        indicator.addClass("on");
        disable(interval);
        disable(btnStart);
        disable(btnClear);
        enable(btnStop);

        if(collection.length === 0){
            placeholder.text("");
        }

        timerId = setInterval(function(){
            collectPoint(collection, dom)
            },
            intervalVal
        );
    });

    btnStop.click(function(){
        indicator.removeClass("on");
        disable(btnStop);
        enable(btnClear);
        enable(btnStart);
        enable(interval);
        clearInterval(timerId);
    });

    function collectPoint(collection, dom){
        getLocation();
    }

    function getLocation(){
        if(navigator.geolocation){
            return navigator.geolocation.getCurrentPosition(getPosition);
        }
        alert("Geolocation is not supported by this browser");
    };

    function getPosition(position){
        collection.push(position);
        dom.append("<li>("+position.coords.latitude+", "+position.coords.longitude+")</li>");
    }
});

function disable(element){
    element.prop("disabled", true);
};

function enable(element){
    element.prop("disabled", false);
};
