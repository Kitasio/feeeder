<script>
	import '../app.scss';
</script>

<div id="app" class="text-white font-rale">
	<slot />
</div>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Raleway:wght@100..900&display=swap');
	@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500&display=swap');
	@tailwind base;
	@tailwind components;
	@tailwind utilities;

	@font-face {
		font-family: Subjectivity;
		src: url('../fonts/subj/Subjectivity-Regular.otf') format("opentype");
	}
	@font-face {
		font-family: Subjectivity;
		src: url('../fonts/subj/Subjectivity-Bold.otf') format("opentype");
		font-weight: bold;
	}
</style>
