$(()=>{
	const serchbox = $('#state');
	const searchState = async (serch)=>{
		const  res = await fetch('src/india.json');
		const states = await res.json();
		var result = states.filter(state=>{
			let reg =  new RegExp(`^${serch}`,'gi');
			return state.name.match(reg) || state.code.match(reg) ;
		})
		if(serch==='')
			$('.result').html('');
		else{
		console.log(result);
		let dis = result.map(data=>{
			return data.districts.map(data=>data.name);
		});
		let output = result.map(data=>`
			<div class="card mt-3">
			  <h5 class="card-header d-flex justify-content-between text-warning"><b>${data.name}</b><span>Code: <b>${data.code}</b></span></h5>
			  <div class="card-body">
			    <h5 class="card-title">Capital : ${data.capital}</h5>
			    <h5 class="card-title">Type : ${data.type}</h5>
			    <p class="card-text"></p>
			    <button class="btn btn-outline-success" type="button" data-toggle="collapse" data-target="#z${data.id}" aria-expanded="false">
		   		 Show Districts
		  		</button>
		  		<div class="collapse p-3 m-3" id="z${data.id}">
			    	<div class="d-flex flex-wrap justify-content-around">
			    		${data.districts.map(data=>`<h5 class='col-4 mydis'>${data.id} ) ${data.name}</h5>`).join('')}
			    	</div>
			    </div>
			  </div>
			</div>
			`).join('');
		$('.result').html(output);
	}
	}
	serchbox.keyup(()=>{
		searchState(serchbox.val());
	})
})
