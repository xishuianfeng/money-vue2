<template>
  <div>
    <Layout class-prefix="layout">
      {{record}}
      <NumberPad @update:value = 'onUpdateAmount' @submit="saveRecord"/>
      <!-- <Types :velue='record.type' @update:value = 'onUpdateType'/> -->
      <Types :value.sync='record.type'/>
      <div class="notes">
        <FormItem fieldName="备注" placeholder="清在这里输入备注" @update:value = 'onUpdateNotes'/>
      </div>
      <Tags/>
    </Layout>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import NumberPad from '../components/Money/NumberPad.vue';
  import Types from '../components/Money/Types.vue';
  import FormItem from '../components/Money/FormItem.vue';
  import Tags from '../components/Money/Tags.vue';
  import{ Component } from 'vue-property-decorator';
  
  @Component({
    components: { NumberPad, Types, FormItem, Tags },
    computed:{
      recordList(){
        return this.$store.state.recordList;
      }
    },
  })

  export default class Money extends Vue{
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
    };
  }


</script>

<style>
  .layout-content{
    display: flex;
    flex-direction: column-reverse;
  }
  .notes{
    padding: 12px 0;
  }
</style>