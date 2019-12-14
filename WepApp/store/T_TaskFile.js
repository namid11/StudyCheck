export const state = () => ({
  task_json_file: {}
});


export const mutations = {
  updateTaskData: function(state, payload) {
    if (payload) {
      state.task_json_file = payload; 
    }
  }
}


export const getters = {
  taskJson: function(state) {
    return state.task_json_file;
  }
}

