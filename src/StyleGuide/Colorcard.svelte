<script>
let color = $$props.color || "grey";
let textcolor = $$props.text === "light" ? "light" : "dark";
let title = $$props.title || "";

function hexToRGB(h) {
    let r = 0, g = 0, b = 0;

    // 3 digits
    if (h.length == 4) {
        r = "0x" + h[1] + h[1];
        g = "0x" + h[2] + h[2];
        b = "0x" + h[3] + h[3];

    // 6 digits
    } else if (h.length == 7) {
        r = "0x" + h[1] + h[2];
        g = "0x" + h[3] + h[4];
        b = "0x" + h[5] + h[6];
    }
    
    return "rgb("+ +r + "," + +g + "," + +b + ")";
}
</script>

<div class="color {textcolor}" style="background-color:{color};">
        {title}
        <br/>
        HEX : {color}
        <br/>
        {hexToRGB(color)}
</div>

<style>
    .color{
        height:120px;
        color:white;
        justify-content: center;
        align-items: center;
        display: flex;
        box-shadow: 2px 3px 10px #2f4f4f;
    }

    .dark{
        color:#000
    }

    .light{
        color: #fff;
    }
</style>