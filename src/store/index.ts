import Vue from 'vue'
import Vuex from 'vuex'
import clone from '@/lib/clone';

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    recordList: [] as RecordItem[]
  },
  mutations: {
    fetchRecords(state){
      state.recordList = JSON.parse(window.localStorage.getItem('recordList') || '[]') as RecordItem[];
    },
    createRecord(state,record:RecordItem){
      const record2 : RecordItem = clone(record);
      record2.createAt = new Date();
      state.recordList.push(record2);
      console.log(state.recordList);
      
      // 可选链语法
      store.commit('saveRecords');
      // recordStore.saveRecords()
    },
    saveRecords(state){
      window.localStorage.setItem('recordList', JSON.stringify(state.recordList))
    },
  },
});

export default store;
