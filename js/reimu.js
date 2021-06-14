var music = document.getElementById("funkymusic");
var musicvolume=0.1; //Start at low to avoid loud shit
var time = 0;

function funkyButton(){ //Button function to play music and play gif, and rainbow background
    var element = document.getElementById("funky");
    if(element.innerHTML === "Jam'"){ //Reads button text for start / stop determination
        element.innerHTML = 'Stop'; //Sets text to stop so same button can be used for both.
        $("#reimu").fadeTo(2000,1);
        setTimeout(function(){$("#settingsbutton").fadeTo(1000,1)},3500);
        music.play();
        backgroundWave(true);
        timer(true);
    }
    else{ //when button text is "stop" and is pressed, fades out music and gif and reverts background.
        element.innerHTML = "Jam'";
        $("#reimu").fadeOut(3000);
        $("#funkymusic").animate({volume: 0.0},3000);
        $("#funkymusic").finish(true,true);
        setTimeout(function(){music.pause();},3000);
        backgroundWave(false);
        timer(false);
    }
}
function smoothrepeat(){ //Self explanatory but still took several fucking hours somehow
    music.volume=0.0;
    $("#funkymusic").animate({volume: musicvolume},3000); //Smooth start
    setTimeout(function(){$("#funkymusic").animate({volume: 0.0},3000);},136000); //Smooth end
}

//TODO: CHANGE TO HSV
function backgroundWave(getstate){ //Clusterfuck abomination but it works so i'll use it
    var delay = 1500; //1.5sec between each transition
    if(getstate){ //Rainbow wave
        $("#mage").animate({
            backgroundColor: "rgb(155,155,204)"
        },delay, function(){
            $("#mage").animate({
                backgroundColor: "rgb(155,204,204)"
            },delay, function(){
                $("#mage").animate({
                    backgroundColor: "rgb(155,204,155)"
                },delay, function(){
                    $("#mage").animate({
                        backgroundColor: "rgb(204,204,155)"
                    },delay, function(){
                        $("#mage").animate({
                            backgroundColor: "rgb(204,155,155)"
                        },delay, function(){
                            $("#mage").animate({
                                backgroundColor: "rgb(204,155,204)"
                            },delay, function(){
                                $("#mage").animate({
                                    backgroundColor: "rgb(186,155,204)"
                                },delay, backgroundWave(true));
                            });
                        });
                    });
                });
            });
        });
    }
    else{ //Halts animation, and animates back to original #ba9bcc in rgb
        $("#mage").stop(false,false).animate({
            backgroundColor: "rgb(186,155,204)"
        },3000);
    }
}

function timer(getstate){ //Self explanatory
    if(getstate){
        var element = document.getElementById("counter");
        setTimeout(function(){$("#counter").fadeTo(3000,1)},2000);
        counter = setInterval(function(){
            time++;
            element.innerHTML=time.toString();
        },1000);
    }
    else{
        clearInterval(counter);
        setTimeout(function(){$("#counter").fadeOut(2000,0)},3000); //Did you notice i like fading shit?
    }
}
var setstate=true;
function settings(){ //Settings button
    if(setstate){ //Show volume input
        $("#volumeinput").fadeTo(750, 1);
        setTimeout(function(){$("#volumesubmit").fadeTo(750,1);},250);
        setstate = !setstate;
    }
    else{ //Hide them
        setTimeout(function(){$("#volumeinput").fadeOut(750,0,function(){$("#volumeinput").css({"display":"inline-block","opacity":"0"})});},250);
        $("#volumesubmit").fadeOut(750,0,function(){$("#volumesubmit").css({"display":"inline-block","opacity":"0"})});
        setstate = !setstate;
        /*Fuck jquery
        i just want to have them not fuck with the spacing after disappearing,
        but fucking fadeout turns opacity from 1 to 0 AND THEN to 1 SINCE DISPLAY IS NONE!!!
        WHEN I WANT IT TO BE INLINE-BLOCK
        WHO DESIGNED THIS??
        ...
        ..still gonna use it..
        */
    }
}
function mixer(setvol){ //Apply new volume
    musicvolume=setvol/100;
    $("#funkymusic").animate({volume: setvol/100},500);
    document.getElementById("volumeinput").placeholder=setvol + "%"; //Note to self: Don't use toString
    document.getElementById("volumeinput").value="";
}

$(document).ready(function(){
    $('#rubrik').fadeTo(2500,1,function(){ //Dackie text at top
        $('#undertext').fadeTo(2500,1,function(){ //The text underneath
            $('#funky').slideDown(1500); // Funky Button 
        });
    });
});