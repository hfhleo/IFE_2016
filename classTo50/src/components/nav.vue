<template>
    <nav class="navbar navbar-inverse">
      <div class="navbar-header">
          <a class="navbar-brand" href="javascript:;">{{user.name}}</a>
        </div>
    </nav>
</template>


<script>
    export default{
        props:['user'] 
    }
</script>