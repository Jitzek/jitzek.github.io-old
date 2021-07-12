<script lang="ts">
	import { Router, Link, Route, navigate } from "svelte-navigator";

	import Home from "@routes/Home.svelte";

	let path: string = localStorage.getItem("path");
	if (path) {
		localStorage.removeItem('path');
		navigate(path);
	}
</script>

<Router>
	<nav>
		<Link to="home">Home</Link>
	</nav>
	<div>
		<Route path="home" component="{Home}" />
	</div>
</Router>