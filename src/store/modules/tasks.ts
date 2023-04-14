import {defineStore} from 'pinia'
import Task from "../../service/Task";

export const useTasksStore = defineStore('task', {
    state: () => ({
        tasks: [] as Task[],
        id: 0
    }),
    getters: {
        getTasks: (state) => state.tasks,
    },
    actions: {
        addTask (task: Task) {
            task.id = this.id++
            this.tasks.push(task)
        },
        removeTask (task: Task){
          this.tasks = this.tasks.filter(t => t.id !== task.id )
        }
    },
    persist: true
})