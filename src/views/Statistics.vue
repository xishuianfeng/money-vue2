<template>
    <Layout>
      <Tabs classPrefix="type" :dataSource="recordTypeList" :value.sync="type" />
        <ol v-if="groupedList.length > 0">
          <li v-for="(group,index) in groupedList" :key="index">
            <h3 class="title">{{beautify(group.title)}} <span>总计: $ {{group.total}}</span></h3>
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
        <div v-else>
          <span class="noResult">现在还没有记录哦~</span>
        </div>
  </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import Tabs from "../components/Tabs.vue";
import recordTypeList from "@/constants/recordTypeList";
import dayjs from 'dayjs';
import clone from "@/lib/clone";

@Component({
    components: { Tabs },
})
  export default class Statistics extends Vue {
    tagString(tags:Tag[]){
      return tags.length === 0 ? ' ' : tags.map(t => t.name).join('，');
    }

    beautify(string:string){
      const day = dayjs(string);
      const now = dayjs();
      if(day.isSame(now,'day')){
        return '今天';
      } else if (day.isSame(now.subtract(1,'day'),'day')){
        return '昨天'
      } else if (day.isSame(now.subtract(2,'day'),'day')){
        return '前天'
      } else {
        return day.format('YYYY.MM.DD')
      }
    };

    get recordList(){      
      return (this.$store.state as RootState).recordList;
    };
    
    get groupedList(){      
      const {recordList} = this;
      console.log(recordList);

      const newList = clone(recordList).filter(r => r.type === this.type).sort((a,b)=>dayjs(b.createAt).valueOf() - dayjs(a.createAt).valueOf())
      if (newList.length === 0) { return []; }
      type Result = { title: string, total?: number, items: RecordItem[] }[]
      const result :Result= [{title: dayjs(newList[0].createAt).format('YYYY.MM.DD'),items:[newList[0]]}];
      for(let i = 1 ;i<newList.length ;i++){
        const current = newList[i];
        const last = result[result.length-1];
        if(dayjs(last.title).isSame(current.createAt,'day')){
          last.items.push(current);
        } else {
          result.push({title:dayjs(current.createAt).format('YYYY.MM.DD'),items:[current]});
        };
      };
      result.map(group => {
        group.total = group.items.reduce((sum,item) => { return sum+item.amount },0);
      });
      return result;
    };

    beforeCreate(){
      this.$store.commit('fetchRecords');
    };

    type = '-';
    recordTypeList = recordTypeList;
  }
</script>

<style lang="scss" scoped>
  .noResult{
    padding: 16px;
    text-align: center;
  }

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