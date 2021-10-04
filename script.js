(() => {
    function getRandomArbitrary(min,max){
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max-min)) + min;
    }

    function chooseWord(){
        let array=["bateau","voiture","fromage","ceinture","chien","histoire","anatomie","becode","ordinateur","maison","orientation","navire","ville","village","avion","javascript","septembre","novembre","pluie","soleil","physique"];
        let max=(array.length)-1;
        let index= getRandomArbitrary(0,max);
        let word=array[index];

        return word;

    }
    document.getElementById("play").addEventListener("click", function(){
        document.getElementById("play").style.visibility="hidden";
        document.getElementById("container").style.visibility="visible";
        document.getElementById("h1").style.visibility="hidden";
        


        });

        let turn=0;
        let keyword =chooseWord();
        
        console.log(keyword);
        let data=document.getElementById("keyword");
        data.setAttribute("key-data",keyword);
        let key = document.getElementsByTagName("span")[3].getAttribute("key-data");
        
        console.log(key);
        let answer =document.getElementById("name").value;
        let isThere = key.split("");
        let hide="";
        for (let elem of isThere){
            hide=hide+"-";
        }
        document.getElementById("keyword").innerHTML = hide;
        console.log(isThere);

        let shots=5;
        let memoire=[];
        
    

    // button : add the previous (if there is) to the new reveled letters
    document.getElementById("run").addEventListener("click",function(){
        console.log(shots);

        
        let key = document.getElementsByTagName("span")[3].getAttribute("key-data");
        console.log(key);
        let answer =document.getElementById("name").value;
        let isThere = key.split("");
        console.log(isThere);
        let guess=false;
        let good="";
        hide="";
        
        
        
        // verify if a selected letter belongs to the word
        for(let i=0;i<isThere.length;i=i+1){
            if (isThere[i]===answer){
                document.getElementById("name").style.borderColor ="green";
                console.log("green");
                console.log(isThere[i]);
                guess=true;
                good=isThere[i];
                let hideSplit=hide.split();
                hide=hide+good;
               
               
            }
            else{
                hide=hide+"-";
                
            }
            
        }
        if (guess===false){
            document.getElementById("name").style.borderColor ="red";
        }
        memoire.push(hide);
        document.getElementById("keyword").innerHTML=hide;
        // count the number of failures 
        console.log(shots);
        if (guess===false){
            shots=shots-1;
            shots=shots.toString();
            document.getElementById("shots").innerHTML = shots;
        }
        console.log(shots);

        console.log(memoire);
        let previousHide="";
        
        // add the memory of the previous letters to the new one
        console.log(memoire);
        console.log(hide);
        if (turn>0){
            for(i=0;i<isThere.length;i=i+1){
                if((memoire[turn-1][i]!="-") && (memoire[turn][i]==="-")){
                    previousHide=previousHide+memoire[turn-1][i];
                }
                else if((memoire[turn-1][i]==="-") && (memoire[turn][i]!="-")){
                    previousHide=previousHide+memoire[turn][i];
                }
                else if(memoire[turn-1][i]===memoire[turn][i]){
                    previousHide=previousHide+memoire[turn-1][i];
                }
                else{
                    previousHide=previousHide+"-";
                    
                }

            }
        }
        console.log(previousHide);
        if (turn>0){

            memoire.pop();
            memoire.push(previousHide);
            document.getElementById("keyword").innerHTML=previousHide;
        }
        turn=turn+1;
        // check if it's a game over
        if (shots<1){
            alert("You lose. Retry !");
            location.reload();
        }
        console.log(keyword);
        console.log(previousHide);
        console.log(key);
        // check if the word as been found
        if (previousHide===key){
            alert("You win!");
            location.reload();
        }
    });



})();