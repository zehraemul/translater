const from_lang = document.querySelector("#from-lang");
const to_lang = document.querySelector("#to-lang");
const translate_btn = document.getElementById("translate_btn");
const from_text = document.querySelector("#from-text");
const to_text = document.querySelector("#to-text");
const exchange = document.querySelector(".exchange");
const icons = document.querySelectorAll(".icons");

for(let lang in languages) {
    let option = `<option value="${lang}">${languages[lang]}</option>`;
    from_lang.insertAdjacentHTML("beforeend", option);
    to_lang.insertAdjacentHTML("beforeend", option);
    //from_lang.innerHTML+=option;
    //to_lang.innerHTML+=option; 
    from_lang.value = "en-GB";
    to_lang.value = "tr-TR";

};


translate_btn.addEventListener("click",(()=>{
    let txt = from_text.value;
    //console.log(txt);
    const url = `https://api.mymemory.translated.net/get?q=${txt}!&langpair=${from_lang.value}|${to_lang.value}"`

    fetch(url)
        .then(res => res.json())
            .then(data=> {
                to_text.value=data.responseData.translatedText;
            });
}));

exchange.addEventListener("click",(()=>{
    let txt = from_text.value;
    from_text.value = to_text.value;
    to_text.value = txt;

    let lang = from_lang.value;
    from_lang.value = to_lang.value;
    to_lang.value = lang;
}));

for(let icon of icons){
   //console.log(icon);
   icon.addEventListener("click",((element)=>{
    if(element.target.classList.contains("fa-copy")){
            if(element.target.id=="from"){
                    navigator.clipboard.writeText(from_text.value);
            }else{
                    navigator.clipboard.writeText(to_text.value)
            }
    }else{
        let utterance;
            if(element.target.id=="from"){
                utterance = new SpeechSynthesisUtterance(from_text.value)
                utterance.lang = from_lang.value;
            }else{
                utterance = new SpeechSynthesisUtterance(to_text.value);
            }
            speechSynthesis.speak(utterance);
            utterance.lang= to_lang.value;
    }
   }));
}
