//gets the local data, and sets them to empty if they didnt exist
var ListsData = localStorage.getItem('ListData');
if(!ListsData){

    var EmptyJsonData = []
    for (let i = 0; i < 21; i++) {
        EmptyJsonData.push({id:i+1,states:[]})
    }

    localStorage.setItem('ListData',JSON.stringify(EmptyJsonData))

}
ListsData = JSON.parse(localStorage.getItem('ListData'))


//defining state code and names:
const StateData = {
	"MA": "Massachusetts",
	"MN": "Minnesota",
	"MT": "Montana",
	"ND": "North Dakota",
	"HI": "Hawaii",
	"ID": "Idaho",
	"WA": "Washington",
	"AZ": "Arizona",
	"CA": "California",
	"CO": "Colorado",
	"NV": "Nevada",
	"NM": "New Mexico",
	"OR": "Oregon",
	"UT": "Utah",
	"WY": "Wyoming",
	"AR": "Arkansas",
	"IA": "Iowa",
	"KS": "Kansas",
	"MO": "Missouri",
	"NE": "Nebraska",
	"OK": "Oklahoma",
	"SD": "South Dakota",
	"LA": "Louisiana",
	"TX": "Texas",
	"CT": "Connecticut",
	"NH": "New Hampshire",
	"RI": "Rhode Island",
	"VT": "Vermont",
	"AL": "Alabama",
	"FL": "Florida",
	"GA": "Georgia",
	"MS": "Mississippi",
	"SC": "South Carolina",
	"IL": "Illinois",
	"IN": "Indiana",
	"KY": "Kentucky",
	"NC": "North Carolina",
	"OH": "Ohio",
	"TN": "Tennessee",
	"VA": "Virginia",
	"WI": "Wisconsin",
	"WV": "West Virginia",
	"DE": "Delaware",
	"DC": "District of Columbia",
	"MD": "Maryland",
	"NJ": "New Jersey",
	"NY": "New York",
	"PA": "Pennsylvania",
	"ME": "Maine",
	"MI": "Michigan",
	"AK": "Alaska"
}


//showing all the names of the states

var UlAllTag = document.getElementById('stateNamesUL');

for (const stateCode in StateData) {
    const stateName = StateData[stateCode];
    const li = document.createElement("li");
    li.textContent = stateName;
    UlAllTag.appendChild(li);
}


//handeling side button clicks
var showingColors = []
function SideButtonsClickHanlder(n){
    var clickedButton = document.getElementById('sidebtn-'+n)
    var ListItems = ListsData[n-1]['states'][0];
    if(ListItems == undefined){
        document.getElementById('ErrorShowerHeader').textContent = "List With id of " + n + " doesnt have any states in it"
        return
    }
    var btnStyles = getComputedStyle(clickedButton);
    var BGcolor = btnStyles.backgroundColor;

    document.getElementById('ErrorShowerHeader').textContent = ''

    if(showingColors.includes(n))
    {
        ListItems.forEach(state => {
            document.getElementById(state).style.fill='white'
        });

        clickedButton.style.border = "2px black solid"

        
        let indexShowing = showingColors.indexOf(n);
        if (indexShowing > -1) {
            showingColors.splice(indexShowing, 1);
        }
    }
    else
    {
        ListItems.forEach(state => {
            document.getElementById(state).style.fill=BGcolor
        });

        clickedButton.style.border = "3px lime solid"

        showingColors.push(n)
    }
}

//update the list:
function AddStatesToList(){
    var listID = document.getElementById('ListIdInput').value;
    var StateNames = document.getElementById('StatesToAddInput').value;
    var StateNamesArray = StateNames.split(/\s*,\s*/);
    var StateCodesArray = []

    var nonFoundStates = []

    for (const stateName of StateNamesArray) {
        let found = false;
        for (const [stateCode, codeName] of Object.entries(StateData)) {
          if (stateName === codeName) {
            StateCodesArray.push(stateCode);
            found = true;
            break;
          }
        }
        if (!found) {
            nonFoundStates.push(stateName)
        }
      }

    if(nonFoundStates.length != 0)
    {
        document.getElementById('AddStateErrorShower').textContent = "error. these states not found : " + nonFoundStates
    }else{
        if(!ListsData[listID-1]){
            document.getElementById('AddStateErrorShower').textContent = "wrong list id . please enter a value between 1 and 21"
        }else{



            let FoundDup = false;
            var errorText = ""
            for (const item of StateCodesArray) {
                for (const obj of ListsData) {
                  for (const stateArr of obj.states) {
                    if (stateArr.includes(item)) {
                        if(listID != obj.id){
                            FoundDup = true;
                            errorText = errorText + `"${StateData[item]}" already exists in list with id ${obj.id} --- `;
                        }
                      }
                  }
                }
              }

            if(FoundDup){
                console.log(errorText)
                document.getElementById('AddStateErrorShower').textContent = errorText
            }else{
                //everything went okay and we are updating the data :
                document.getElementById('AddStateErrorShower').textContent = ''
                ListsData[listID-1]['states'].length = 0
                ListsData[listID-1]['states'].push(StateCodesArray)
                localStorage.setItem('ListData',JSON.stringify(ListsData))
                location.reload()
            }
            



        }
    }

}


//shows the name of the clicked state on the screen and copies it to the clipboard
var svg = document.getElementById('svg');
svg.addEventListener('click',handlePathClick)
function handlePathClick(event) {
    var target = event.target;
    if (target.tagName === 'path') {
      var stateName = target.getAttribute('data-name');
      // copy stateName to clipboard
      navigator.clipboard.writeText(stateName)
      //show state name on screen :
      document.getElementById('ShowStateName').style.display = 'flex'
      document.getElementById('ShowStateName').innerHTML = 'state name copied to clipboard : ' + stateName + `
      <svg onclick="HideStateNameShower()" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z"/></svg>
      `
    }
}
  
//remvoes the state name thats being shown on the screen
function HideStateNameShower()
{
document.getElementById('ShowStateName').style.display = 'none'
document.getElementById('ShowStateName').innerHTML=''
}


//pop up functions
var MSGnumber = 0;
function POPUP_MSG(text,type,tm)
{
    MSGnumber++;
    var html = `
        <span> ${text} </span>
    `
    var div = document.createElement('div')
    var style = document.createElement('style')
    style.innerHTML = `
    .popup_msg_MSG{
        padding:60px;
        padding-top:30px;
        padding-bottom:30px;
        z-index: 100;
        position: fixed;
        bottom: 20px;
        right: 30px;
        font-size: 25px;
        animation: MSG_BOX_APEAR 0.3s forwards ease-in-out;
        border-radius: 5px;
        background-color: white;
        color: black;
      }
      @keyframes MSG_BOX_APEAR {
        0%{right: -260px;}
        100%{right: 20px;}
      }
      
      @keyframes MSG_BOX_DISAPEAR {
        0%{right: 20px;}
        100%{right: -260px;}
      }
      
      .popup_msg_MSG_error{
        background-color: #ff5a5f;
        color: black;
        box-shadow: 0 0 10px red;
      }
      
      .popup_msg_MSG_good{
        background-color: rgb(85, 255, 79);
        color: black;
        box-shadow: 0 0 10px lime;
      }
      
      .popup_msg_MSG_normal{
        background-color: white;
        color: black;
        box-shadow: 0 0 10px gray;
      }
    `
    document.querySelector('head').appendChild(style)
    div.className = `popup_msg_MSG popup_msg_MSG_${type}`
    div.id = `MSG_BOX_${MSGnumber}`
    div.innerHTML = html
    document.body.appendChild(div)
    POPUP_MSG_REMOVE(MSGnumber,tm)
}
function POPUP_MSG_REMOVE(n,tm)
{
    setTimeout(() => {
        document.getElementById(`MSG_BOX_${n}`).style.animation = "MSG_BOX_DISAPEAR 0.3s forwards ease-in-out"
    }, tm - 300);
    setTimeout(() => {
        document.getElementById(`MSG_BOX_${n}`).remove()
    }, tm);
}


//show all the lists and items in them:
ShowAllLists()
function ShowAllLists()
{
    var container = document.getElementById('AllListsContainer');

    var i = 1;
    ListsData.forEach(list=>{
        let div = document.createElement('div');
        var html = `
            <h5>list ${i} : </h5> 
        `

        var currentListdata = ListsData[i-1]['states'][0]
        if(currentListdata == undefined){
            html = html + " this list is empty"
        }
        else{
            var k = 0;
            currentListdata.forEach(state=>{
                html = html + `
                    <span>${StateData[state]} , </span>
                `
                k++;
            })

            html = html +`<button onclick="ClearList(${i-1})">clear this list(${i})</button>`
        }

        div.innerHTML = html;
        container.appendChild(div)
        
        i++;
    })
}

function ClearList(n)
{
    ListsData[n]['states'].length = 0;
    localStorage.setItem('ListData',JSON.stringify(ListsData))
    location.reload()
}