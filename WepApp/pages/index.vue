<template>
  <div>
    <!-- TOP -->
    <div class="jumbotron">
      <div class="container header">
        <h1 class="display-4">課題一覧</h1>
        <p class="title-sub-text">
          課題の確認、追加、削除ができるページです。
          <br />このページは教師のみが閲覧できます。
        </p>
        <hr class="my-3" />
        <p>More info</p>
        <p class="lead">
          <a class="btn btn-primary btn-lg" href="#" role="button">Jumbo action name</a>
        </p>
      </div>
    </div>

    <!-- Main Container -->
    <div class="main container">
      <div v-for="(task_data_list, key_date) in getJsonData" :key="key_date">
        <div class="bg-white row p-3">
          <div class="col-md-12">
            <h2 class="px-3">{{key_date}}</h2>
            <hr>
          </div>
          <div class="col-md-4" v-for="(task_data, index) in task_data_list" :key="index">
            <task-card
              :tasks="task_data.tasks"
              :subject="task_data.subject"
              :deadline_date="task_data.deadline_date"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import TaskCard from "~/components/TaskCard.vue";

// const fse = process.server ? require("fs-extra") : null;
// const jsonData = JSON.parse(fse.readFileSync("assets/TaskDataFormat.json"));

export default {
  components: {
    TaskCard
  },
  data() {
    return {
      task_list: ["hogehoge", "piyopiyo", "fugafuga"],
    };
  },
  created() {
  },
  asyncData({ params }) {
    return {};
  },
  computed: {
    getJsonData: function() {
      if (this.$jsonData) {
        this.$store.commit('T_TaskFile/updateTaskData', this.$jsonData);
        return this.$store.getters['T_TaskFile/taskJson'];
      } else {
        return this.$store.getters['T_TaskFile/taskJson'];
      }
    }
  },
};
</script>

<style scoped>
.header h1 {
  letter-spacing: 0.1em;
}
.title-sub-text {
  letter-spacing: 0em;
  line-height: 1.8rem;
  color: #333;
  font-family: Quicksand, 游ゴシック体, "Yu Gothic", YuGothic, "ヒラギノ角ゴシック Pro", "Hiragino Kaku Gothic Pro", メイリオ, Meiryo, Osaka, "ＭＳ Ｐゴシック", "MS PGothic", sans-serif;
  font-size: 1.2rem;
}
</style>
