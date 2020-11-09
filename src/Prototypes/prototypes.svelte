<script>
    import Card from "./Card.svelte"
</script>

<h1 class="title">Projects</h1>

<div class="section">
<div class="columns is-multiline is-centered">
    <div class="column is-one-third is-centered">
        <a href="https://rdwkn5.axshare.com/" target="_blank" desc="Open Netflix project">
        <Card title="Netflix Surfing" img="/img/surf.png" desc="What habits can we borrow from Netflix to make watching its content more passive. In this design I expore adding a random or surf mode to Netflix." />
        </a>
    </div>
     <div class="column is-one-third">
        <a href="https://q23yz8.axshare.com/" target="_blank" title="open election mart project">
        <Card title="Election Mart" img="/img/votenow.jpg" desc="Voting in person and by mail is inefficient. Also, it is difficult to know what is on the ballot, and be informed about all the choices. This design explores what an election site might look like." />
        </a>
    </div>
     <div class="column is-one-third">
        <a href="https://ahiwt4.axshare.com/#id=8bnb1m&p=home" target="_blank" title="open cook order tab">
            <Card title="Cook Order" img="/img/cook.jpg" desc="What if a user could search for recipes, and order the ingredients at the touch of a button." />
        </a>
    </div>
</div>
</div>

<style>
.title{
    text-align: center;
}
</style>