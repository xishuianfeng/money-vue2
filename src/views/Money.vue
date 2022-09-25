<template>
  <div>
    <Layout class-prefix="layout">
      <NumberPad @update:value = 'onUpdateAmount' @submit="saveRecord"/>
      <!-- <Types :velue='record.type' @update:value = 'onUpdateType'/> -->
      <Tabs :dataSource="recordTypeList"
            :value.sync="record.type"/>
      <div class="notes">
        <FormItem fieldName="备注" 
                  placeholder="请在这里输入备注" 
                  :value.sync='record.notes'/>
      </div>
      <Tags @update:value = 'record.tags = $event'/>
    </Layout>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import NumberPad from '../components/Money/NumberPad.vue';
  import FormItem from '../components/Money/FormItem.vue';
  import Tags from '../components/Money/Tags.vue';
  import{ Component } from 'vue-property-decorator';
  import Tabs from '../components/Tabs.vue';
  import recordTypeList from "@/constants/recordTypeList";

  
  @Component({
    components: { NumberPad, FormItem, Tags, Tabs },
  })

  export default class Money extends Vue{
    get recordList(){
      return this.$store.state.recordList;
    };

    recordTypeList = recordTypeList;

    record:RecordItem={
      tags:[],notes:'',type:'-',amount:0
    };
    created(){
      this.$store.commit('fetchRecords');
    };
    onUpdateNotes(value:string){
      this.record.notes = value
    };
    onUpdateAmount(value:string){
      this.record.amount = parseFloat(value)
    };

    saveRecord(){
      this.$store.commit('createRecord',this.record);
      window.alert('添加成功');
      this.record.notes = '';
    };
  }


</script>

<style lang="scss" scoped>
  ::v-deep .layout-content{
    display: flex;
    flex-direction: column-reverse;
  }
  .notes{
    padding: 12px 0;
  }
</style>