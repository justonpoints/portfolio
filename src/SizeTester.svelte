<script>
	let width = 370
	let width2 = width + 30
	let height = 720
	let height2 = height + 210
	let type = "portrait";
	let url = "/plain/media.html"
	  
	function set_desktop(){
		width = 1510
		width2 = width
		height = 850;
		height2 = height
		type = "desktop"
	}

	function set_portrait(){
		width = 370
		width2 = width + 30
		height = 720
		height2 = height + 210
		type = "portrait";
	}

	function set_landscape(){
		width = 730
		width2 = 730 + 220
		height = 360
		height2 = 360 + 25
		type = "landscape"
	}

	function set_tablet(){
		width = 768
		width2 = width
		height = 850;
		height2 = height;
		type = "tablet"
	}

	function ass1(){
		url = "/"
	}

	function ass2(){
		url = "/plain/media.html"
	}

	function ass3(){
		url = "/email.html"
	}

	function ass4(){
		url = "/#/grid"
	}
</script>

	<div>
		
		<div class="field">
			<input id="page" class="input" type="text" bind:value="{url}">
			<button type="submit" on:click={ass1} class="button is-info is-long" >Landing Page</button>
			<button type="submit" on:click={ass2} class="button is-info is-long" >Responsive Styling</button>
			<button type="submit" on:click={ass3} class="button is-info is-long" >Email</button>
			<button type="submit" on:click={ass4} class="button is-info is-long" >Grid</button>
		</div>
		<div class='buttons'>
			<button type="submit" on:click={set_portrait} class="button is-info is-long" >Mobile - Portrait</button>
			<button type="submit" on:click={set_tablet} class="button is-info is-long" >Tablet</button>
			<button type="submit" on:click={set_desktop} class="button is-info is-long" >Desktop</button>
		</div>
		<div class="tester">
			<div class="{type}" style="margin:auto;width:{width2}px;height:{height2}px;">
			<iframe src='{url}' class="frame" title="desktop" style="width:{width}px;height:{height}px;"></iframe>
			</div>
		</div>
	</div>
	
<style>
	#page{
		margin:5px 10px;
		width:50%;
		display: inline;
	}

	.field{
		padding:10px;
	}

	.buttons{
		margin:10px;
	}

	.tester{
		background-color: #b45032;
		padding:10px
	}

	.portrait {
		background-size: 100% 100%;
		 background-image: url(/img/phone2.png);
		 padding-top:100px
	}
	
	.landscape {
		background-size: 100% 100%;
		background-image: url(/img/phone2-land.png);
		padding-top:15px;
	}

	.tablet {
		box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
	}
	
	.desktop{
		 box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
	}


	.frame{
		background-repeat: no-repeat;
		margin:auto;
		display:block;
	}

	

</style>