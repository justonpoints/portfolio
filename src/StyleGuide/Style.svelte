<script>
    import ColorCard from "./Colorcard.svelte"
    import Logo from "./Logo.svelte"
    import Avatar from "./Avatar.svelte"
    import Font from "./Font.svelte"
</script>

  <section class="section">
  <h1 class="title">Style Guide</h1>

<h2 class="title">Logo</h2>
<div class="columns is-vcentered is-multiline">
    <div class="column is-full">
        <Logo/>
    </div>
    <div class="column is-full">
        <Logo type="light"/>
    </div>
</div>

<h2 class="title">Primary Color Palette</h2>

<div class="columns is-multiline">
    <div class="column is-one-third">
        <ColorCard class="column" color="#325050" text="light" title="Dark Slate"></ColorCard>
    </div>
    <div class="column is-one-third">
        <ColorCard class="column" color="#c8e6e6" text="dark" title="Slate"></ColorCard>
    </div>
     <div class="column is-one-third">
        <ColorCard class="column" color="#f5ffff" text="dark" title="Light Slate"></ColorCard>
    </div>
    <div class="column is-one-third">
        <ColorCard class="column" color="#b45032" text="light" title="Dark Orange"></ColorCard>
    </div>
    <div class="column is-one-third">
        <ColorCard class="column" color="#dc8264" text="dark" title="Medium Orange"></ColorCard>
    </div>
     <div class="column is-one-third">
        <ColorCard class="column" color="#fffafa" text="dark" title="Light Orange"></ColorCard>
    </div>
</div>

<h2 class="title">Brand Guide</h2>
<h3 class="title">Avatar</h3>
    <div class="columns is-multiline">
    <div class="column">
        <Avatar/>
    </div>
    <div class="column">
        <Avatar type="square"/>
    </div>
</div>


    <h2 class="title">Font: Verdana, Geneva, sans-serif</h2>
    <div class="container">
        <Font/>
        <Font type="light"/>
    </div>





</section>


<style>
    h1.title{
       text-align: center; 
    }
</style>