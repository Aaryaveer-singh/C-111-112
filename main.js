Webcam.set({
    width: 350,
    height: 300,
    image_format:"png",
    png_quality:90
});

Webcam.attach("#camera");

emotion_model=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/-kNw2bCFz/model.json",model_loaded)
function capture_img(){
    Webcam.snap(function(pic){
        document.getElementById("result").innerHTML="<img id='img_result'src='"+pic+"'>";
    });
}


function model_loaded(){
    console.log("model loaded successfully");
}

prediction1="";

function speak(){
    speak_text1="The prediction 1 is "+prediction1;
    speak_text2="and the prediction 2 is "+prediction2;
    speak_to_audio=new SpeechSynthesisUtterance(speak_text1+speak_text2);
    window.speechSynthesis.speak(speak_to_audio);
}

function identify_img(){
    pic= document.getElementById("img_result");
    emotion_model.classify(pic, get_results);
}

function get_results(e,r){
    if(e){
        console.error(e);
    }
    else{
        console.log(r);
        prediction1=r[0].label;
        prediction2=r[1].label;
        document.getElementById("emotion1").innerHTML=prediction1;
        document.getElementById("emotion2").innerHTML=prediction2;

        
    }
}