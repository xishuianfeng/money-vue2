<template>
  <div>
    <Layout class-prefix="layout">
      <NumberPad @update:value = 'onUpdateAmount' @submit="saveRecord"/>
      <!-- <Types :velue='record.type' @update:value = 'onUpdateType'/> -->
      <Types :value.sync='record.type'/>
      <Notes @update:value = 'onUpdateNotes'/>
      <Tags :dataSource.sync="tags" @update:value = 'onUpdateTags'/>
    </Layout>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import NumberPad from '../components/Money/NumberPad.vue';
  import Types from '../components/Money/Types.vue';
  import Notes from '../components/Money/Notes.vue';
  import Tags from '../components/Money/Tags.vue';
  import{ Component, Watch } from 'vue-property-decorator';
  import model from '@/model';

  const recordList = JSON.parse(window.localStorage.getItem('recordList') || '[]') 
  
  @Component({
    components: { NumberPad, Types, Notes, Tags }
  })

  export default class Money extends Vue{
        tags = ['衣','食','住','行'];
        recordList:RecordItem[] =recordList;
        record:RecordItem={
          tags:[],notes:'',type:'-',amount:0
        };

        onUpdateTags(value:string[]){
          this.record.tags = value
        };
        onUpdateNotes(value:string){
          this.record.notes = value
        };
        onUpdateAmount(value:string){
          this.record.amount = parseFloat(value)
        };
        saveRecord(){
          const record2 : RecordItem = model.clone(this.record);
          record2.createAt = new Date();
          this.recordList.push(this.record);
        };
        @Watch('recordList')
        onRecordListChange(){
          model.save(this.recordList);
        };
    }


</script>

<style>
  .layout-content{
    display: flex;
    flex-direction: column-reverse;
  }
</style>