const spinner = document.getElementById('spinner');
spinner.style.display = 'none';
const errorMessage = document.getElementById('error-message');
    errorMessage.style.display = 'none';

const singleTeam = document.getElementById('single-team');
const allTeam = document.getElementById('all-team');

const searchTeams = ()=>{
    const inputField = document.getElementById('input-field');   
    const inputText = inputField.value;
    spinner.style.display = 'block';

    if(inputText.length == 0){
        errorMessage.style.display = 'block';
        spinner.style.display = 'none';
        singleTeam.textContent='';
        allTeam.textContent ='';

    }
    
    else{
        singleTeam.textContent='';
        errorMessage.style.display = 'none';
        // spinner.style.display = 'none';
        const url = `https://www.thesportsdb.com/api/v1/json/1/searchteams.php?t=${inputText}`;
        fetch(url)
            .then(response => response.json())
            .then(data => displayTeams(data.teams))
        
        inputField.value='';
        
    }
    

}

const displayTeams = teams => {
    spinner.style.display = 'none';
    allTeam.textContent ='';
    
    teams.forEach(team => {
        const div = document.createElement('div');
        div.className = 'col';
        div.innerHTML = `
            <div class="card" onclick="selectTeam(${team.idTeam})" >
                <img src="${team.strTeamBadge}" class="card-img-top" alt="">
                <div class="card-body">
                    <h5 class="card-title">${team.strTeam}</h5>
                    <p class="card-text">${team.strDescriptionEN.slice(0,150)}</p>
                </div>
            </div>`;
        allTeam.appendChild(div);
    });
    
}

const selectTeam = (teamId) =>{
    
    const url = `https://www.thesportsdb.com/api/v1/json/1/lookupteam.php?id=${teamId}`;
    fetch(url)
        .then(response => response.json())
        .then(data => displaySelectedTeam(data.teams[0]))
        spinner.style.display = 'block';   
}
const displaySelectedTeam = selectedTeam => {
    spinner.style.display = 'none';
    const singleTeam = document.getElementById('single-team');
    singleTeam.textContent='';
    const div = document.createElement('div');
    div.className="single-team";
    div.innerHTML=`
        <img src="${selectedTeam.strTeamBadge}" class="card-img-top " style="width:300px;" alt="...">
        <div class="card-body">
            <h5 class="card-title">${selectedTeam.strTeam}</h5>
            <p class="card-text">${selectedTeam.strDescriptionEN.slice(0,500)}</p>
            
        </div>`;
    singleTeam.appendChild(div);
    
    
}
