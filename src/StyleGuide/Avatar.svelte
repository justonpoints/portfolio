<script>
    let type = $$props.type || "round";
    let rounded = type === "round" ? "is-rounded" : null
</script>

 <div class="column is-2 is-success avatar dark" style="{$$props.style}">
    <figure class="image" style="margin:auto">
        <img class="{rounded}" alt="Juston Points" src="/img/juston-hello.png">
    </figure>
</div>


<style>
    .avatar{
        background-color:#325050;
        color:#fff;
        padding:10px;
        box-shadow: 2px 3px 10px #2f4f4f;
        width: 200px
    }
    
</style>