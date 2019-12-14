<template>
  <div class="card m-2 p-0 shadow">
    <div class="card-header bg-primary text-light">
      <h5>{{ subject }}</h5>
    </div>
    <div class="card-body">
      <p class="card-text" v-for="(task, index) in tasks" :key="index">
        {{ task }}
      </p>
    </div>
    <div class="card-footer text-muted">
      <h5 class>期限</h5>{{ deadline_date }}
      <span class="badge badge-pill badge-warning">yet</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    subject: String,
    deadline_date: String,
    tasks: Array
  }
}
</script>

<style scoped>
</style>