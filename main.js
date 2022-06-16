/*jslint browser:true */
"use strict"

const addMonths = (el) => {
	let annualUseKw = 0;
	let dailyUseKw = 0;
	const mpc = document.getElementById(el);
	const months = mpc.getElementsByTagName("input");

	for (let i = 0; i < months.length; i++) annualUseKw += Number(months[i].value);

	dailyUseKw = annualUseKw / 365;
	return dailyUseKw;
};

function sunHours() {
	var hrs;
	var theZone = document.forms.solarForm.zone.selectedIndex;
	theZone += 1;

	switch (theZone) {
		case 1:
			hrs = 6;
			break;
		case 2:
			hrs = 5.5;
			break;
		case 3:
			hrs = 5;
			break;
		case 4:
			hrs = 4.5;
			break;
		case 5:
			hrs = 4.2;
			break;
		case 6:
			hrs = 3.5;
			break;
		default:
			hrs = 0;
	}
	return hrs;
}

const calculateSolar = () => {
	const dailyUseKw = addMonths("mpc");
	console.log(dailyUseKw);
	let sunHoursPerDay = sunHours();
	console.log(sunHoursPerDay);

	var minKwNeeds = dailyUseKw / sunHoursPerDay;
	console.log(minKwNeeds);

	var realKwNeeds = minKwNeeds * 1.25;
	console.log(realKwNeeds);

	var realWattNeeds = realKwNeeds * 1000;
	console.log(realWattNeeds);

	var panelInfo = calculatePanel();
	const [panelOutput, panelName] = panelInfo;

	var panelsNeeded = Math.ceil(realWattNeeds / panelOutput);
	console.log("panelsNeeded", panelsNeeded);

	const feedback = document.getElementById("feedback");

	let str1 = `Based on your average daily use of <strong>${Math.round(
		dailyUseKw
	)} KW</strong>, 
  you will need to purchase <strong>${panelsNeeded} ${panelName} solar panels</strong> to
  offset 100% of your electricty bill.`;

	str1 += `<br /><br />`;

	feedback.innerHTML += str1;

	const str2 = `Your average daily electricity consumption: <strong>${Math.round(
		dailyUseKw
	)} Kwh per day</strong>.<br />Average sunshine hours per day: ${sunHoursPerDay} hours.
  Realistic watts needed per hours: <strong>${Math.round(
		realWattNeeds
	)} watts/hour</strong>.<br />
  The <strong>${panelName}</strong> panel you selected generates about <strong>${panelOutput} watts per hour</strong>`;

	feedback.innerHTML += str2;
};

const calculatePanel = () => {
	var userChoice = document.forms.solarForm.panel.selectedIndex;
	var panelOptions = document.forms.solarForm.panel.options;
	var power = panelOptions[userChoice].value;
	var name = panelOptions[userChoice].text;
	var x = [power, name];
	return x;
};

document.getElementById("btn").addEventListener("click", calculateSolar);