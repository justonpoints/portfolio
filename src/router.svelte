<script>
  import Routes from "svelte-spa-router";
  import SizeTester from "./SizeTester.svelte";
  import Landing from "./Landing.svelte";
  import Style from "./StyleGuide/Style.svelte";
  import StyleScape from "./stylescape/StyleScape.svelte";
  import Settings from "./Settings/Settings.svelte";
  import Skills from "./Skills/Skills.svelte";
  import Prototypes from "./Prototypes/Prototypes.svelte";
  import Grid from "./Grid/Grid.svelte";












    const routes = {
    '/sizetester':SizeTester,
    '/landing':Landing,
    '/styles':Style,
    '/stylescape':StyleScape,
    '/settings':Settings,
    '/skills':Skills,
    '/prototypes':Prototypes,
    '/grid':Grid,
		'*': Landing
	}

</script>

<Routes {routes} />