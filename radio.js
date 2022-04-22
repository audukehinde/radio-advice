let parameters = {
  frequencyOfOperation: document.getElementById("freq"),
  heightSiteOne: document.getElementById("heightT"),
  heightSiteTwo: document.getElementById("heightR"),
  transmissionPower: document.getElementById("powerT"),
  transmissionAntGain: document.getElementById("GainT"),
  receiverAntGain: document.getElementById("GainR"),
  lineAndBranch: document.getElementById("Loss"),
  distanceBwSites: document.getElementById("dist"),
  kfactor: document.getElementById("Kf"),
  lineOfSight: document.getElementById("los"),
  clearanceAllowance: document.getElementById("CA"),
  linkBudgets: document.getElementById("link"),
  response: document.getElementById("tr"),
  show: document.getElementById("out"),
};

let validate = (el) => {
  if (
    document.getElementById(el).id == "Kf" &&
    (document.getElementById(el).value == "0" ||
      document.getElementById(el).value === "")
  ) {
    console.log((document.getElementById(el).value = 1.33));
  } else {
    var pattern = /^-?[0-9]+(.[0-9]{1,7})?$/;
    // ^([0-9]\.\d+)|([1-9]\d*\.?\d*)$
    var text = document.getElementById(el).value;
    var element = document.getElementById(el);
    if (text.match(pattern) == null) {
      // alert('the format is wrong');
      element.style.borderBottom = "1px solid red";
      element.style.color = "red";
      element.title = "please enter a valid input here";
    } else {
      element.style.borderBottom = "1px solid teal";
      element.style.color = "initial";
      element.title = "";
    }
  }
};

function lineOfSite() {
  let result =
    3.57 *
      Math.sqrt(parameters.kfactor.value * parameters.heightSiteOne.value) +
    Math.sqrt(parameters.kfactor.value * parameters.heightSiteTwo.value);
  return result;
}

let obstacleClearance = () => {
  let obstacle =
    6.56 *
    Math.sqrt(
      parameters.distanceBwSites.value / parameters.frequencyOfOperation.value
    );
  return obstacle;
};

let linkBudget = () => {
  let link =
    (parameters.transmissionPower.value +
    parameters.transmissionAntGain.value +
    parameters.receiverAntGain.value) -
    92.4 +
    ((20 * Math.log10(parameters.frequencyOfOperation.value)) +
      (20 * Math.log10(parameters.distanceBwSites.value))) - parameters.lineAndBranch.value;
  return link;
};

let btnCalculate = document.querySelector(".btnCalc");
btnCalculate.addEventListener("click", () => {
  if (
    parameters.frequencyOfOperation.value === "" ||
    parameters.clearanceAllowance.value === "" ||
    parameters.heightSiteOne.value === "" ||
    parameters.heightSiteTwo === "" ||
    parameters.distanceBwSites.value === ""
  ) {
    alert("Please,fill the required fields");
  }else {
    parameters.lineOfSight.innerHTML = `Line of Site is ${lineOfSite().toFixed(2)}`;
    // console.log(`Line of Site is ${lineOfSite()}`);
    parameters.clearanceAllowance.innerHTML = `Obstacle Clearance is ${obstacleClearance().toFixed(
      2
    )}`;
    // console.log(`Obstacle Clearance is ${obstacleClearance()}`);
    parameters.linkBudgets.innerHTML = `Link Budget is ${linkBudget().toFixed(
      2
    )}`;
    parameters.show.style.display = "block";
  }

  let displayLine0fSite = lineOfSite();

  if(displayLine0fSite > parameters.distanceBwSites.value) {
    parameters.response.style.display = "block";
    parameters.response.innerHTML = "Height is Okay";
  } else {
    parameters.response.innerHTML = "Reasses Anterna Height";
    parameters.response.style.color = "red";
  }
 
});

