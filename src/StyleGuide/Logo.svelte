<script>
    let type = $$props.type || "dark";
</script>

<div class="{type}">
    JUSTON
</div>

<style>
    .dark{
        background-color:#325050;
        color:#fff;
        padding:10px;
        box-shadow: 2px 3px 10px #2f4f4f;
    }

    .light{
        background-color:#faffff;
        color:#000;
        padding:10px;
        box-shadow: 2px 3px 10px #2f4f4f;
    }
</style>