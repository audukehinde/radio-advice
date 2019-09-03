        // var parameters = {
        //     frequencyOfOperation : 2.4,
        //     heightSiteOne : 1.0,
        //     heightSiteTwo : 0.52,
        //     transmissionPower:12.0,
        //     transmissionAntGain: 15,
        //     receiverAntGain: 7.0,
        //     lineAndBranch: 1.24,
        //     distanceBwSites: 10,
        //     kfactor:1.33,
        
        // }

         // function to validate

        function validate(el)
        {  
            if (document.getElementById(el).id=="Kf" && (document.getElementById(el).value=="0" || document.getElementById(el).value=="")){
                document.getElementById(el).value=1.33;
            } else {
                var pattern = /^-?[0-9]+(.[0-9]{1,7})?$/;
            // ^([0-9]\.\d+)|([1-9]\d*\.?\d*)$
                var text = document.getElementById(el).value;
                var element =document.getElementById(el);
                if (text.match(pattern)==null)
                {
                // alert('the format is wrong');
                element.style.borderBottom="1px solid red";
                element.style.color="red";
                element.title="please enter a valid input here";
                }else{
                    element.style.borderBottom="1px solid teal";
                    element.style.color="initial";
                    element.title="";
                }
            }
            
        }
        // using object in function
        function calculate(parameters){
            var outputs=[];
            var frequencyOfOperation=Number(parameters.frequencyOfOperation.value);
            var heightSiteOne = Number(parameters.heightSiteOne.value);
            var heightSiteTwo = Number(parameters.heightSiteTwo.value);
            var transmissionPower= Number(parameters.transmissionPower.value);
            var transmissionAntGain=Number(parameters.transmissionAntGain.value);
            var receiverAntGain=Number(parameters.receiverAntGain.value);
            var lineAndBranch=Number(parameters.lineAndBranch.value);
            var distanceBwSites =Number(parameters.distanceBwSites.value);
            var kfactor=Number(parameters.kfactor.value);
            if (kfactor=="" && kfactor=="0"){
                kfactor=1.33;
            }
            console.log(kfactor);
            if ((frequencyOfOperation!="" && parameters.frequencyOfOperation.style.color !="red" )&& (heightSiteOne!="" && parameters.heightSiteOne.style.color!="red") && (heightSiteTwo!="" && parameters.heightSiteTwo.style.color!="red") && (transmissionPower!="" && parameters.transmissionPower.style.color!="red") && (transmissionAntGain!="" && parameters.transmissionAntGain.style.color!="red") && (receiverAntGain!="" && parameters.receiverAntGain.style.color!="red") && (lineAndBranch!="" && parameters.lineAndBranch.style.color!="red") && (distanceBwSites!="" && parameters.distanceBwSites.style.color!="red") && parameters.kfactor.style.color!="red"){
                console.log(frequencyOfOperation, heightSiteOne,heightSiteTwo,transmissionPower,transmissionAntGain,receiverAntGain,lineAndBranch,distanceBwSites,kfactor);
                
                // solving for line of sight
                var maxLineOfSight = 3.57 * (Math.sqrt(kfactor*heightSiteOne) + Math.sqrt(kfactor*heightSiteTwo));
                console.log('maximum line of sight ' + maxLineOfSight);

                // solving for obstacle clearance
                var clearanceAllowance = 6.56* (Math.sqrt(distanceBwSites/frequencyOfOperation));
                console.log('clearance allowance is ' + clearanceAllowance);

                // solving for link budgets
                var logPart = (20*(Math.log10(frequencyOfOperation))) + 20*(Math.log10(distanceBwSites));
                console.log(logPart);
                var linkBudgets = (transmissionPower + transmissionAntGain +receiverAntGain) - (92.4+logPart) - lineAndBranch;
                console.log('linkBudgets is ' + linkBudgets)

                // alert('maxLineOfSight: ' + maxLineOfSight);
                if (maxLineOfSight>distanceBwSites){
                    parameters.response.style.color='green';
                    var response= "Antenna Height is OKAY!"
                    
                }else{
                    parameters.response.style.color='red';
                    response="Re-assess Antenna Height!"
                    
                }

                // display testing
                outputs[0]=maxLineOfSight;
                outputs[1]=clearanceAllowance;
                outputs[2]=linkBudgets;
                console.log(outputs);
                parameters.lineOfSight.innerHTML='Line of Site: ' + maxLineOfSight.toFixed(3) + ' Km';
                parameters.clearanceAllowance.innerHTML='Obstacle Clearance Allowance: ' + clearanceAllowance.toFixed(3) + ' m';
                parameters.linkBudgets.innerHTML='Link Budget: '+ linkBudgets.toFixed(3);
                parameters.response.innerHTML=response;
                parameters.response.classList.add('slide-left');
                parameters.show.style.display='block';
                // alert(response);
                return outputs;
                
            } else {
                alert("please fill all required fields with the right inputs");
            }
            
            
        }
