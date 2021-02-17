<template>
  <div class="q-navbar">
    <div class="q-nav-brand">
      <span class="s1">JS</span> <span class="s2">Questions</span>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>
  .q-navbar{
    height: 60px;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background: #f5f6fa;
    display: flex;
    align-items: center;
    padding: 0 16px;
    z-index: 100;
  }

  .s1{
    color: #15276c;
    font-size: 24px;
    font-weight: 900;
  }

  .s2{color: #7e88af;
    font-size: 22px;
  }
</style>