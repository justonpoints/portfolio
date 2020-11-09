<script>
    import Card from "./Prototypes/Card.svelte"
</script>

    <div class="columns is-primary top">
        <div class="column is-2 is-success avatar" >
            <figure class="image is-128x128" style="margin:auto">
                <img class="is-rounded" alt="Juston Points" src="/img/juston-hello.png">
            </figure>
        </div>
        <div class="column is-two-third header">
            <div class="container" style="margin:auto;text-align:center">
            <h1 class="title">
                Juston Points
            </h1>
            <div class="subtitle">
                A person
            </div>
            </div>
        </div>
    </div>

    <section class="section">
        <p>Hello, my name is Juston. I do not know what to say here, because I like letting my actions to do the talking. However, if I need to say something to get your attention, then I am awesome.</p>
        <hr/>
        <p>I enjoy projects where I can make an ineffcient task more effcient, and help the user acheive thier goal.</p>
    </section>

    <div class="section">
        <div class="columns">
            <div class="column is-10"><h2 class="title column">Sample Projects</h2></div>
            <div class="column"><a href="#/prototypes" class="button" title="go to projects">View More Projects</a></div>
        </div>
    <div class="columns is-multiline is-centered">
        <div class="column is-half is-centered">
            <a href="https://rdwkn5.axshare.com/" target="_blank" desc="Open Netflix project">
            <Card title="Netflix Surfing" img="/img/surf.png" desc="What habits can we borrow from Netflix to make watching its content more passive. In this design I expore adding a random or surf mode to Netflix." />
            </a>
        </div>
        <div class="column is-half">
            <a href="https://q23yz8.axshare.com/" target="_blank" title="open election mart project">
            <Card title="Election Mart" img="/img/votenow.jpg" desc="Voting in person and by mail is inefficient. Also, it is difficult to know what is on the ballot, and be informed about all the choices. This design explores what an election site might look like." />
            </a>
        </div>
    </div>
    </div>

    <section class="section skill">
        <div class="container">
        <h3>Quality Assurance</h3>
        <div class="skills">
                <span class="tag">Test Cases</span>
                <span class="tag">Selenium</span>
                <span class="tag">Puppeteer</span>
                <span class="tag">Cucumber</span>
                <span class="tag">Jira</span>
        </div>
        <h3 >User Experience</h3>
         <div class="skills">
                <span class="tag">Cognitive Psychology</span>
                <span class="tag">Axure</span>
                <span class="tag">Wireframes</span>
                <span class="tag">Mockups</span>
                <span class="tag">Research Methods</span>
        </div>
        <h3>User Interface</h3>
        <div class="skills">
                <span class="tag">HTML</span>
                <span class="tag">CSS</span>
                <span class="tag">Javascript</span>
                <span class="tag">Svelete</span>
                <span class="tag">Feathers</span>
                <span class="tag">A-Frame</span>
        </div>
            <h3>Backend</h3>
            <div class="skills">
                    <span class="tag"> Node JS</span>
                    <span class="tag">Loopback</span>
                    <span class="tag">Sails</span>
                    <span class="tag">Loopback</span>
                    <span class="tag">Feathers</span>
            </div>
    </div>
    </section>
     



<style>
    .top {
        padding-top:10px
    }

    .button{
        background-color: #b45032;
        color:#fff;
        height: 50px;
        width: 100%;
        font-size:18px;
    }

    .tag{
        background-color: #b45032;
        color:#fff;
        font-size: 16px;
        margin: 5px;
    }

    section.skill{
        background-color: #dc8264
    }

    .skill{
        margin: 5px;
    }

    .skills{
        padding:10px;
    }

    .item{
        width:150px;
    }

    h3{
        font-size:18px;
        font-weight: bold;
    }

    .section{
        background-color:#c8e6e6;
        margin: 20px;
        padding: 10px;
    }

    .section-title{
        text-align:center;
        font-size: 22px;
        width:100%
    }

    .avatar{
        background-color: darkslategrey;
    }

    .header{
        background-color:#c8e6e6;
    }

</style>