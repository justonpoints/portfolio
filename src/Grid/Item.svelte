<script>
export let column;
export let row ;
let stylerow="";
let stylecolumn="";

$: column, row,stylerow,stylerow;

$: if(column == false || column == undefined){
    stylecolumn = ""
}
else{
    stylecolumn = `grid-column:${column};`
}

$: if(row == false || row == undefined){
   stylerow = ""
}
else{
    stylerow = `grid-row:${row};`
}

function edit(){
    column = column;
    row = row;
}

</script>

<div style="color:#fff;{stylecolumn};{stylerow};" class="item">
    <slot></slot>
</div>


<style>
.item{
  background-color: slategrey;
  color: white;
  padding: 10px;
  min-height: 100px;
  text-align:center;
  box-shadow: 2px 3px 10px #2f4f4f;

}


.item:hover{
    z-index:100;
}


input{
        width:50px;
}

@media (max-width: 650px) {
    .item{
        grid-column: 1 !important;
        grid-row: unset !important;
    }

    
}
</style>