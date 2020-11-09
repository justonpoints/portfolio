<script>
    import Logo from "../StyleGuide/Logo.svelte"
    import Avatar from "../StyleGuide/Avatar.svelte"
</script>

<h1 class="title">Style Scape</h1>
<div  class="stylescape">
<div class="columns is-mobile is-gapless content">
    <div class="column">
        <div class="section" style="background-color:#c8e6e6">
            <figure style="width:500px;margin:auto;box-shadow: 15px 18px 10px #2f4f4f;" class="image">
                <img src="/img/debugsession.png" alt="code" />
            </figure>
        </div>
        <div class="section" style="background-color:#dc8264">
        <Logo/>
        <br/>
        <Logo type="light"/>
        </div>
    </div>
    <div class="column">
        <div class="section" style="background-color:#b45032;color:#fff">
            <div style="background-color:#fffafa;color:#000;margin-top:20px;padding:10px;width:100%">
            Nulla facilisi. Donec laoreet aliquet gravida. Quisque mauris quam, lacinia nec convallis in, egestas et arcu. Fusce at nisl ac odio porta viverra. Etiam quis lacinia ex, sed placerat velit. Phasellus ullamcorper nisl a magna scelerisque, ut fringilla ligula posuere. Morbi convallis enim eu dignissim tempus. Pellentesque a faucibus velit, suscipit gravida metus. Sed pharetra sit amet magna luctus mollis. Ut eleifend facilisis posuere. Nulla tristique fringilla elit, nec aliquet mauris consequat sit amet. Vivamus elementum luctus arcu eu semper. Pellentesque imperdiet, ex sed vestibulum ornare, sapien mi pretium odio, a convallis nisi metus ut erat.
            </div>
        </div>
        <div class="section" style="background-color:#f5ffff">
         <div class="columns is-mobile is-gapless is-multiline">
                <div class="column">
                    <figure style="width:100px;margin:20px;" class="image">
                        <img src="/img/octocat.png" alt="github" />
                    </figure>
                </div>
                <div class="column">
                    <figure style="width:100px;margin:20px;" class="image">
                        <img src="/img/svelte.png" alt="svelte" />
                    </figure>
                </div>
                 <div class="column">
                    <figure style="width:100px;margin:20px;" class="image">
                        <img src="/img/html.png" alt="html" />
                    </figure>
                </div>
                <div class="column">
                    <figure style="width:100px;margin:20px;" class="image">
                        <img src="/img/node.png" alt="node" />
                    </figure>
                </div>
                <div class="column">
                    <figure style="width:100px;margin:20px;" class="image">
                        <img src="/img/react.png" alt="node" />
                    </figure>
                </div>
                 <div class="column">
                    <figure style="width:100px;margin:20px;" class="image">
                        <img src="/img/axure.png" alt="node" />
                    </figure>
                </div>
            </div>
           </div>
    </div>
    <div class="column">
        <div class="section" style="background-color:#fffafa">
           <Avatar style="margin:auto"/>
        </div>
        <div class="section" style="background-color:#325050;color:#fff">
         <figure style="width:600px;margin:auto;box-shadow: 2px 3px 12px #000;" class="image">
                <img src="/img/screenshot.jpg" alt="old tools" />
            </figure>
        </div>
    </div>
</div>
</div>


<style>
    .stylescape{
        overflow-x: scroll;
        display: block;
        height:700px;
        background-color: black;
        box-shadow: -5px -8px 10px #2f4f4f;
        margin-left:20px;
    }

    .section{
        width:1000px;
        height:340px;
        padding:5px;
    }
</style>