<template>
  <div class="main-nav">
    <h3 class="title">Odds</h3>
    <i class="pi pi-user"></i>
  </div>
</template>

<script>
export default {
  name: "Navbar",
};
</script>

<style>
.main-nav {
  background-color: orange;
  width: 100%;
  display: flex;
  font-size: 2rem;
  font-weight: bold;
  padding: 1rem;
  justify-content: space-between;
  align-items: center;
}

.title {
  margin-inline-start: 1rem;
}
.account-icon {
  margin-inline-end: 1rem;
}
</style>