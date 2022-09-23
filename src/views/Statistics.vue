<template>
    <Layout>
      <Tabs classPrefix="type" :dataSource="recordTypeList" :value.sync="type" />
      <Tabs classPrefix="interval" :dataSource="intervalList" :value.sync="interval"/>
        <ol>
          <li v-for="(group,index) in result" :key="index">
            <h3 class="title">{{group.title}}</h3>
            <ol>
              <li v-for="(item,index) in group.items" :key="index"
                  class="record">
                  <span>{{tagString(item.tags)}}</span>
                  <span class="notes" :style="{marginRight: 'auto'}">{{item.notes}}</span>
                  <span>$ {{item.amount}}</span>
              </li>
            </ol>
          </li>
        </ol>
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
    tagString(tags:Tag[]){
      return tags.length === 0 ? '无' : tags.join(',');
    }

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
        hashTable[date].items.push(recordList[i]);
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
  %item{
    @import '@/assets/style/help.scss'; 
    padding: 8px 16px;
    display: flex;
    justify-content: space-between;
    font-family: $font-hei;
    line-height: 24px;
  }
  .title{
    @extend %item;
  }
  .record{
    @extend %item;
    background: white;
  }
  .notes{
    margin-right: auto;
    margin-left: 16px;
    color: #999;
  }

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