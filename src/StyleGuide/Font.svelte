<script>
    let type = $$props.type || "dark";
</script>

<div class="{type}">
    the quick brown fox jumps over the lazy dog
    THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG
    1234567890 !@#$%^&*
</div>

<style>
    .dark{
        background-color:#c8e6e6;
        color:#000;
        padding:10px;
        box-shadow: 2px 3px 10px #2f4f4f;
        margin:20px;
    }

    .light{
        background-color:#dc8264;
        color:#000;
        padding:10px;
        box-shadow: 2px 3px 10px #2f4f4f;
        margin:20px;
    }
</style>