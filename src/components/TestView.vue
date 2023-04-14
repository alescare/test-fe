<script setup lang="ts">
import {computed, ref} from 'vue'
import BaseButton from "./BaseButton.vue"
import BaseInput from "./BaseInput.vue"
import BaseCheckBox from "./BaseCheckBox.vue"
import {useTasksStore} from "../store/modules/tasks";


const descrizione = ref("")
const filtro = ref("Tutti")
const filtri = ["Tutti", "Completati", "Attivi"]
const tasksStore = useTasksStore()

const disabled = computed(() => {
  return descrizione.value == ""
})

const contatoreAttivi = computed(() => {
  let attivi = 0;
  tasksStore.getTasks.forEach(task => {
    if (!task.completato) {
      attivi++
    }
  })
  return attivi;
})

const listaFiltrata = computed(() => {
  switch (filtro.value) {
    case "Tutti":
      return tasksStore.getTasks;
      break;
    case "Completati":
      return tasksStore.getTasks.filter(task => task.completato);
      break;
    case "Attivi":
      return tasksStore.getTasks.filter(task => !task.completato);
  }
})


function aggiungiTask() {
  tasksStore.addTask({id: 0, descrizione: descrizione.value, completato: false});
  descrizione.value = "";
}

function cambiaFiltro(nuovoFiltro: string) {
  filtro.value = nuovoFiltro
}

function annulla() {
  descrizione.value = "";
}

</script>

<template>
  <div class="grid grid-cols-1 xl:grid-cols-4 gap-4 content-start">

    <div class="col xl:col-span-1 space-y-3 flex flex-col mt-0 xl:mt-9">
      <div class="w-full bg-slate-100 p-2 rounded-md">
        <h3>Inserisci un nuovo task</h3>
        <BaseInput v-model="descrizione" placeholder="Inserisci una desrizione"/>
        <div>
          <BaseButton type="outline" class="me-2 px-1" :disabled="disabled" @click="annulla">Annulla</BaseButton>
          <BaseButton type="outline" class="px-1" :disabled="disabled" @click="aggiungiTask">Aggiungi</BaseButton>
        </div>
      </div>
    </div>

    <div class="col xl:col-span-3 space-y-3 max-h-90">
      <div class="flex justify-end">
        <span>Filtra lista: </span>
        <BaseButton v-for="nomeFiltro in filtri" type="text" @click="cambiaFiltro(nomeFiltro)"
                    :class="{'bg-slate-500': filtro===nomeFiltro}">
          {{ nomeFiltro }}
        </BaseButton>
      </div>
      <ul class="rounded-md bg-slate-100 py-1" v-if="listaFiltrata.length > 0">
        <li v-for="task in listaFiltrata" :key="task.id" class="grid grid-cols-7 gap-4 my-3 flex">
          <BaseCheckBox class="col-span-1 self-start mt-2 h-4" v-model="task.completato"/>
          <p :class="{ 'line-through': task.completato }" class="col-span-4 sm:col-span-5 text-justify"
             style="overflow-wrap: break-word">{{ task.descrizione }}</p>
          <BaseButton type="solid" @click="tasksStore.removeTask(task)">Rimuovi</BaseButton>
        </li>
      </ul>
      <span v-else class="block text-center" style="font-size: 24px">Nessun task da mostrare.</span>
      <span class="block text-end">
        Attivi: {{ contatoreAttivi }}/{{ tasksStore.getTasks.length }}
      </span>
    </div>

  </div>
</template>

<style scoped>

</style>
