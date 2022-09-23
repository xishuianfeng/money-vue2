<template>
    <Layout>
      <Tabs classPrefix="type" :dataSource="recordTypeList" :value.sync="type" />
      <Tabs classPrefix="interval" :dataSource="intervalList" :value.sync="interval"/>
      <div>
        type:{{type}}
        <br/>
        interval:{{interval}}
      </div>
      <div>
        <ol>
          <li v-for="(group,index) in result" :key="index">
            <h3>{{group.title}}</h3>
            <ol>
              <li v-for="item in group" :key="item.id">
                {{item.amount}}{{item.createAt}}
              </li>
            </ol>
          </li>
        </ol>
      </div>
  </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import Tabs from "../components/Tabs.vue";
import intervalList from "@/constants/intevalList";
import recordTypeList from "@/constants/recordTypeList";

@Component({
    components: { Tabs },
})
  export default class Statistics extends Vue {
    get recordList(){      
      return (this.$store.state as RootState).recordList;
    };
    
    get result(){
      const {recordList} = this;
      type HashTableValue = {title:string,items:RecordItem[]}
      const hashTable:{[key:string]: HashTableValue } = {};
      for(let i = 0; i< recordList.length;i++){
        const [date,time] = recordList[i].createAt!.split('T');        
        hashTable[date] = hashTable[date] || {title:date,items:[]};

        console.log(recordList[i]);
        
        hashTable[date].items.push(recordList[i]);

        console.log(hashTable.items);
      
      };
      return hashTable;
    };

    beforeCreate(){
      this.$store.commit('fetchRecords');
    };

    type = '-';
    interval = 'day';
    intervalList = intervalList;
    recordTypeList = recordTypeList;
  }
</script>

<style lang="scss" scoped>
  ::v-deep{
    .type-tabs-item{
      background-color: #fff;
      &.selected{
        background: #c4c4c4;
        &::after{
          display: none;
        }
      }
    }
    .interval-tabs-item{
      height: 48px;
    }
  }
</style>