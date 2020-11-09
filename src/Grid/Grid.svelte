<script>
import Item from "./Item.svelte";

let newitem = {};
let updateitem = {};
let items = [
    {"name":"Header","column":"1/-1","row":""},
    {"name":"Navigation","column":"1","row":"10/19"},
    {"name":"Main Content","column":"2/-1","row":"2/19"},
    {"name":"Highlights","column":"1","row":"2/5"},
    {"name":"Footer","column":"1/-1","row":"20"}
]

function add(event){
    items.push(newitem);
    items = items;
    newitem = {}
}

function remove(index){
    items = [...items.filter(
        (item,i) => {
            console.log(i)
            return i !== index
        }
        )
    ];
}

</script>

<div class="form">
  <label for="name">Name</label>
  <input id="name" style="width:200px;" type="text" bind:value={newitem.name} />
  <label for="column">Column</label>
  <input id="column"type="text" bind:value={newitem.column} />
  <label for="row">Row</label>
  <input id="row" type="text" bind:value={newitem.row} />
  <button on:click={add}>Add Grid Item</button>
</div>

<div class="wrapper">
    {#each items as item,i}
        <Item bind:column={item.column} bind:row={item.row} >
            <p>{item.name} ({i})</p>
            <br/>
            <div>
            <label for="column2">Column</label>
            <input id="column2" type="text" bind:value={item.column} />
            <label for="row2">Row</label>
            <input id="row2" type="text" bind:value={item.row} />
            <button on:click={(event) => remove(i,event)}>Remove</button>
            </div>
            <hr/>
            <div>Duis bibendum, velit interdum laoreet bibendum, arcu lorem placerat ante, eget venenatis orci justo et dolor. Suspendisse risus libero, bibendum vitae hendrerit eget, vehicula eget lacus. Sed a nunc massa. Mauris enim arcu, molestie in arcu nec, vestibulum pulvinar augue. Nunc efficitur lorem ut ante luctus mattis. Integer finibus imperdiet molestie. Suspendisse viverra neque sit amet tortor dictum rhoncus. In</div>
        </Item>
    {/each}
</div>

<style>
.wrapper {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
}

.form{
    margin: 20px;
}

input{
    width:50px;
    height:30px;
}

.three {
  grid-column: 1;
  grid-row: 2 / 5;
}

@media (min-width: 600px) {
  .wrapper { grid-template-columns: 1; }
}

/*@media (min-width: 900px) {
  .wrapper { grid-template-columns: repeat(3, 1fr); }
}*/

</style>